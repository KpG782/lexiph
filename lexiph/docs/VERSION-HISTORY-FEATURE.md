# Compliance Report Version History Feature

## Overview

The compliance canvas now includes a local version history system that allows users to track changes to compliance reports over time, similar to Claude's Artifacts feature.

## Features

### 1. Two Viewing Modes

#### Edit Mode (Raw Markdown)
- Editable textarea with monospace font
- Direct markdown editing
- Syntax highlighting-ready
- Auto-save capability
- Changes tracked in real-time

#### Preview Mode (Formatted View)
- Read-only formatted display
- Rendered markdown with proper styling
- Scrollable content
- Professional document appearance

### 2. Version History

#### Automatic Versioning
- Each save creates a new version
- Versions stored locally in browser (Zustand + localStorage)
- Timestamps for each version
- Automatic labeling (Version 1, Version 2, etc.)

#### Version Management
- View all versions in sidebar
- Switch between versions instantly
- Delete old versions (with confirmation)
- Latest version highlighted
- Current version indicator

### 3. User Interface

#### Header Controls
- **History Button**: Toggle version history sidebar
- **Edit/Preview Button**: Switch between modes
- **Save Button**: Save changes as new version (edit mode only)
- **Download Button**: Export current version as .md file

#### Version History Sidebar
- Collapsible sidebar (264px width)
- List of all versions with timestamps
- Click to switch versions
- Delete button (hover to reveal)
- Visual indicator for active version

## Usage

### Creating a New Version

1. Click **Edit** button to enter edit mode
2. Make changes to the markdown content
3. Click **Save** button
4. New version is created automatically

### Viewing Version History

1. Click **History** button
2. Sidebar appears showing all versions
3. Click any version to view it
4. Current version is highlighted

### Switching Between Modes

- **Edit Mode**: Click "Edit" button - shows raw markdown editor
- **Preview Mode**: Click "Preview" button - shows formatted view

### Downloading Reports

1. Select the version you want to download
2. Click **Download** button
3. File saves as `compliance-report.md`

## Technical Implementation

### State Management

```typescript
// Zustand store with persistence
interface ComplianceStore {
  versions: ComplianceVersion[]
  currentVersionId: string | null
  isEditMode: boolean
  
  addVersion: (content: string, label?: string) => void
  updateCurrentVersion: (content: string) => void
  setCurrentVersion: (versionId: string) => void
  toggleEditMode: () => void
}
```

### Data Structure

```typescript
interface ComplianceVersion {
  id: string              // Unique identifier
  content: string         // Markdown content
  timestamp: Date         // Creation time
  label: string          // Display name
}
```

### Storage

- **Location**: Browser localStorage
- **Key**: `compliance-storage`
- **Persistence**: Automatic via Zustand persist middleware
- **Capacity**: ~5-10MB (browser dependent)

## Accessibility

### Keyboard Navigation
- All buttons keyboard accessible
- Tab order: History → Edit/Preview → Save → Download
- Enter/Space to activate buttons
- Focus indicators on all controls

### Screen Reader Support
- ARIA labels on all buttons
- Live region announcements for saves
- Semantic HTML structure
- Version list properly labeled

### Visual Indicators
- Active version highlighted
- Latest version badge
- Edit mode visual distinction
- Focus rings on interactive elements

## Best Practices

### For Users

1. **Save Frequently**: Create versions at logical checkpoints
2. **Meaningful Labels**: Consider custom labels for important versions
3. **Review History**: Use version history to track changes over time
4. **Clean Up**: Delete unnecessary versions to keep list manageable

### For Developers

1. **Version Limits**: Consider implementing max version limit (e.g., 50)
2. **Export/Import**: Add ability to export/import version history
3. **Diff View**: Consider adding diff view between versions
4. **Auto-save**: Implement auto-save for edit mode
5. **Conflict Resolution**: Handle concurrent edits if multi-user

## Future Enhancements

### Planned Features
- [ ] Custom version labels
- [ ] Version comparison (diff view)
- [ ] Export all versions
- [ ] Import version history
- [ ] Auto-save in edit mode
- [ ] Undo/Redo in editor
- [ ] Search within versions
- [ ] Version tags/categories

### Potential Improvements
- [ ] Syntax highlighting in edit mode
- [ ] Markdown toolbar
- [ ] Split-screen edit/preview
- [ ] Version branching
- [ ] Collaborative editing
- [ ] Cloud sync option

## Troubleshooting

### Versions Not Saving
- Check browser localStorage is enabled
- Verify storage quota not exceeded
- Clear browser cache and try again

### Version History Not Showing
- Ensure at least one version exists
- Check console for errors
- Verify Zustand store is initialized

### Edit Mode Not Working
- Refresh the page
- Check if textarea is focused
- Verify no JavaScript errors

## API Integration

When integrating with backend API:

```typescript
// Example API call structure
const saveVersionToAPI = async (version: ComplianceVersion) => {
  const response = await fetch('/api/compliance/versions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(version)
  })
  return response.json()
}
```

## Performance Considerations

- **Local Storage**: ~5-10MB limit per domain
- **Version Count**: Recommend max 50 versions
- **Content Size**: Each version ~10-50KB typical
- **Render Performance**: Optimized for 100+ versions

## Security Notes

- All data stored locally in browser
- No server-side storage by default
- Consider encryption for sensitive data
- Implement data sanitization for markdown content

---

**Last Updated**: ${new Date().toLocaleDateString()}
**Version**: 1.0.0
