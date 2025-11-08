'use client'

import { FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ComplianceCanvasProps {
  content: string
  fileName?: string
}

export function ComplianceCanvas({ content, fileName }: ComplianceCanvasProps) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName || 'compliance-report'}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Simple markdown-like rendering for demo
  const renderContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-slate-900 mt-6 mb-4">{line.slice(2)}</h1>
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold text-slate-900 mt-5 mb-3">{line.slice(3)}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold text-slate-800 mt-4 mb-2">{line.slice(4)}</h3>
      }
      
      // Bold text
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold text-slate-900 my-2">{line.slice(2, -2)}</p>
      }
      
      // List items
      if (line.trim().startsWith('- ')) {
        return <li key={index} className="text-slate-700 ml-4 my-1">{line.trim().slice(2)}</li>
      }
      
      // Numbered lists
      if (/^\d+\./.test(line.trim())) {
        return <li key={index} className="text-slate-700 ml-4 my-1">{line.trim().replace(/^\d+\.\s*/, '')}</li>
      }
      
      // Horizontal rule
      if (line.trim() === '---') {
        return <hr key={index} className="my-6 border-slate-200" />
      }
      
      // Table rows (simple detection)
      if (line.includes('|')) {
        const cells = line.split('|').filter(cell => cell.trim())
        return (
          <div key={index} className="flex gap-2 border-b border-slate-200 py-2">
            {cells.map((cell, i) => (
              <div key={i} className="flex-1 text-sm text-slate-700">{cell.trim()}</div>
            ))}
          </div>
        )
      }
      
      // Empty lines
      if (!line.trim()) {
        return <div key={index} className="h-2" />
      }
      
      // Regular paragraphs
      return <p key={index} className="text-slate-700 my-2 leading-relaxed">{line}</p>
    })
  }

  return (
    <div className="flex h-full flex-col border-l border-slate-200 bg-white">
      {/* Canvas Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-900">
            Compliance Report
          </h3>
        </div>
        <Button
          onClick={handleDownload}
          variant="outline"
          size="sm"
          className="h-8 gap-2"
        >
          <Download className="h-4 w-4" />
          <span className="text-xs">Download</span>
        </Button>
      </div>

      {/* Canvas Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-none space-y-1">
          {renderContent(content)}
        </div>
      </div>
    </div>
  )
}
