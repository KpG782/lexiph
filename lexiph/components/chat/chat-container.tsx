'use client'

import { useState } from 'react'
import { ChatHeader } from '@/components/layout/chat-header'
import { ChatMessages } from './chat-messages'
import { ChatInput } from './chat-input'
import { ComplianceCanvas } from './compliance-canvas'
import { useChatModeStore } from '@/lib/store/chat-mode-store'
import { Message } from '@/types'

interface ChatContainerProps {
  messages: Message[]
}

// Sample compliance report for demo
const sampleComplianceReport = `# Compliance Analysis Report

## Document Summary
**File:** sample-document.pdf  
**Analysis Date:** ${new Date().toLocaleDateString()}  
**Status:** ✅ Compliant

## Key Findings

### 1. Data Privacy Compliance
- **Status:** Compliant with Data Privacy Act of 2012
- **Requirements Met:**
  - Personal data collection procedures documented
  - Consent mechanisms in place
  - Data retention policies defined

### 2. Labor Code Requirements
- **Status:** Partially Compliant
- **Action Items:**
  - Update employee handbook to include remote work policies
  - Review overtime compensation structure
  - Implement mandatory rest day tracking

### 3. Tax Compliance
- **Status:** Compliant
- **Requirements Met:**
  - BIR registration current
  - Withholding tax procedures documented
  - VAT compliance verified

## Recommendations

1. **Immediate Actions**
   - Update employee handbook within 30 days
   - Schedule labor compliance training for HR team

2. **Long-term Improvements**
   - Implement automated compliance monitoring system
   - Quarterly compliance audits recommended

## Risk Assessment

| Area | Risk Level | Priority |
|------|-----------|----------|
| Data Privacy | Low | Medium |
| Labor Code | Medium | High |
| Tax Compliance | Low | Low |

## Next Steps

1. Review and implement recommended changes
2. Schedule follow-up compliance check in 90 days
3. Maintain documentation of all compliance activities

---
*This is a sample compliance report generated for demonstration purposes.*
`

export function ChatContainer({ messages }: ChatContainerProps) {
  const { mode } = useChatModeStore()
  const [showCanvas, setShowCanvas] = useState(false)
  const [canvasContent, setCanvasContent] = useState(sampleComplianceReport)

  // In compliance mode with canvas, show split view
  const isComplianceWithCanvas = mode === 'compliance' && showCanvas

  // Simulate showing canvas after compliance query (for demo)
  // In production, this would be triggered by actual API response
  useState(() => {
    if (mode === 'compliance') {
      // Auto-show canvas for demo purposes
      setTimeout(() => setShowCanvas(true), 500)
    } else {
      setShowCanvas(false)
    }
  })

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <ChatHeader />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area - 40% width in compliance mode with canvas, full width otherwise */}
        <div 
          className={`flex flex-col ${
            isComplianceWithCanvas ? 'w-full lg:w-[40%]' : 'w-full'
          } transition-all duration-300`}
        >
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden px-2 sm:px-4">
            <ChatMessages messages={messages} />
          </div>
          <ChatInput />
        </div>

        {/* Compliance Canvas - 60% width, only shown in compliance mode */}
        {isComplianceWithCanvas && (
          <div className="hidden lg:block lg:w-[60%]">
            <ComplianceCanvas 
              content={canvasContent}
              fileName="compliance-report"
            />
          </div>
        )}
      </div>
    </div>
  )
}
