'use client'

import { useState, useEffect } from 'react'
import { FileText, Download, Edit3, Eye, History, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useComplianceStore } from '@/lib/store/compliance-store'
import { VersionHistorySidebar } from './version-history-sidebar'
import { cn } from '@/lib/utils'

interface ComplianceCanvasProps {
  content: string
  fileName?: string
}

export function ComplianceCanvas({ content, fileName }: ComplianceCanvasProps) {
  const { 
    isEditMode, 
    toggleEditMode, 
    getCurrentVersion, 
    updateCurrentVersion,
    addVersion 
  } = useComplianceStore()
  
  const [editContent, setEditContent] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const currentVersion = getCurrentVersion()

  // Initialize with current version or new content
  useEffect(() => {
    if (currentVersion) {
      setEditContent(currentVersion.content)
    } else if (content) {
      setEditContent(content)
      // Add initial version
      addVersion(content, 'Initial Report')
    }
  }, [content, currentVersion, addVersion])

  // Update edit content when version changes
  useEffect(() => {
    if (currentVersion) {
      setEditContent(currentVersion.content)
    }
  }, [currentVersion])
  const handleDownload = () => {
    const contentToDownload = currentVersion?.content || content
    const blob = new Blob([contentToDownload], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName || 'compliance-report'}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSave = () => {
    if (editContent !== currentVersion?.content) {
      const versionLabel = `Version ${useComplianceStore.getState().versions.length + 1}`
      addVersion(editContent, versionLabel)
      
      // Announce to screen readers
      const announcement = 'Changes saved as new version'
      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('role', 'status')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.className = 'sr-only'
      liveRegion.textContent = announcement
      document.body.appendChild(liveRegion)
      setTimeout(() => document.body.removeChild(liveRegion), 1000)
    }
  }

  const displayContent = currentVersion?.content || content

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
    <div 
      className="flex h-full border-l border-slate-200 bg-white"
      role="region"
      aria-label="Compliance report viewer"
    >
      {/* Version History Sidebar */}
      {showHistory && (
        <div className="w-64 border-r border-slate-200 bg-slate-50">
          <VersionHistorySidebar />
        </div>
      )}

      {/* Main Canvas */}
      <div className="flex flex-1 flex-col">
        {/* Canvas Header */}
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-600" aria-hidden="true" />
            <h2 className="text-base font-semibold text-slate-900 truncate">
              Compliance Report
            </h2>
            {currentVersion && (
              <span className="text-xs text-slate-500 truncate max-w-[120px]">
                ({currentVersion.label})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* History Toggle */}
            <Button
              onClick={() => setShowHistory(!showHistory)}
              variant="outline"
              size="sm"
              className={cn(
                'h-9 gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                showHistory && 'bg-slate-100'
              )}
              aria-label={showHistory ? 'Hide version history' : 'Show version history'}
              aria-pressed={showHistory}
            >
              <History className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">History</span>
            </Button>

            {/* Edit/Preview Toggle */}
            <Button
              onClick={toggleEditMode}
              variant="outline"
              size="sm"
              className={cn(
                'h-9 gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isEditMode && 'bg-iris-100 text-iris-700 border-iris-300'
              )}
              aria-label={isEditMode ? 'Switch to preview mode' : 'Switch to edit mode'}
              aria-pressed={isEditMode}
            >
              {isEditMode ? (
                <>
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm">Preview</span>
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm">Edit</span>
                </>
              )}
            </Button>

            {/* Save Button (Edit Mode Only) */}
            {isEditMode && (
              <Button
                onClick={handleSave}
                variant="default"
                size="sm"
                className="h-9 gap-2 bg-primary hover:bg-iris-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Save changes as new version"
                disabled={editContent === currentVersion?.content}
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm">Save</span>
              </Button>
            )}

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="h-9 gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Download compliance report as ${fileName || 'compliance-report'}.md`}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">Download</span>
            </Button>
          </div>
        </header>

        {/* Canvas Content */}
        {isEditMode ? (
          /* Edit Mode - Raw Markdown Editor */
          <div className="flex-1 overflow-hidden p-4">
            <label htmlFor="markdown-editor" className="sr-only">
              Edit compliance report markdown
            </label>
            <textarea
              id="markdown-editor"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="h-full w-full resize-none rounded-lg border-2 border-slate-200 bg-white p-4 font-mono text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              placeholder="Enter markdown content..."
              aria-label="Markdown editor"
              spellCheck="false"
            />
          </div>
        ) : (
          /* Preview Mode - Formatted View */
          <article 
            className="flex-1 overflow-y-auto p-6 focus:outline-none"
            tabIndex={0}
            aria-label="Compliance report content"
          >
            <div className="max-w-none space-y-1">
              {renderContent(displayContent)}
            </div>
          </article>
        )}
      </div>
    </div>
  )
}
