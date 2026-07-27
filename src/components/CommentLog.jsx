import React, { useState } from 'react'
import { useEditData } from '../context/EditContext'

const COMMENT_TYPES = ['Comment', 'Suggestion', 'Issue', 'Recommendation']

const STATUSES = ['Open', 'In Progress', 'Resolved']

const STATUS_COLORS = {
  'Open':        { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' },
  'In Progress': { bg: '#fef9c3', text: '#92400e', border: '#fde68a' },
  'Resolved':    { bg: '#dcfce7', text: '#15803d', border: '#86efac' },
}

const TYPE_COLORS = {
  Comment:        '#4f7ecf',
  Suggestion:     '#10b981',
  Issue:          '#ef4444',
  Recommendation: '#f59e0b',
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function fmtDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function StatusPill({ status, onChange }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS['Open']
  const [open, setOpen] = useState(false)

  return (
    <div className="cmt-status-wrap">
      <button
        className="cmt-status-pill"
        style={{ background: s.bg, color: s.text, borderColor: s.border }}
        onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
        title="Change status"
      >
        {status}
        <span className="cmt-status-chevron">▾</span>
      </button>
      {open && (
        <div className="cmt-status-dropdown" onClick={e => e.stopPropagation()}>
          {STATUSES.map(st => {
            const sc = STATUS_COLORS[st]
            return (
              <button
                key={st}
                className="cmt-status-option"
                style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}
                onClick={() => { onChange(st); setOpen(false) }}
              >
                {st}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CommentBubble({ nodeId, comment, depth = 0 }) {
  const { comments, addComment, editComment, deleteComment, updateCommentStatus } = useEditData()
  const [replying, setReplying] = useState(false)
  const [editing, setEditing] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replyAuthor, setReplyAuthor] = useState('Auditor')
  const [replyType, setReplyType] = useState('Comment')
  const [editText, setEditText] = useState(comment.text)

  const replies = (comments[nodeId] || []).filter(c => c.parentId === comment.id)
  const status = comment.status || 'Open'

  function submitReply() {
    if (!replyText.trim()) return
    addComment(nodeId, replyAuthor, replyText, replyType, comment.id)
    setReplyText('')
    setReplying(false)
  }

  function submitEdit() {
    if (!editText.trim()) return
    editComment(nodeId, comment.id, editText)
    setEditing(false)
  }

  return (
    <div
      className={`cmt-bubble ${depth > 0 ? 'cmt-reply' : ''}`}
      style={{ borderLeftColor: depth === 0 ? STATUS_COLORS[status]?.border : undefined }}
    >
      <div className="cmt-header">
        <div className="cmt-avatar" style={{ background: TYPE_COLORS[comment.type] }}>
          {initials(comment.author)}
        </div>
        <div className="cmt-meta">
          <span className="cmt-author">{comment.author}</span>
          <span className="cmt-type-badge" style={{ background: TYPE_COLORS[comment.type] }}>
            {comment.type}
          </span>
          <span className="cmt-time">{fmtDate(comment.at)}{comment.edited ? ' · edited' : ''}</span>
        </div>
      </div>

      {/* Status pill — only on root comments */}
      {depth === 0 && (
        <div className="cmt-status-row">
          <StatusPill
            status={status}
            onChange={st => updateCommentStatus(nodeId, comment.id, st)}
          />
        </div>
      )}

      {editing ? (
        <div className="cmt-edit-form">
          <textarea
            className="cmt-textarea"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            rows={2}
          />
          <div className="cmt-edit-actions">
            <button className="cmt-btn-save" onClick={submitEdit}>Save</button>
            <button className="cmt-btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <p className="cmt-text">{comment.text}</p>
      )}

      <div className="cmt-actions">
        {depth === 0 && (
          <button className="cmt-action-btn" onClick={() => setReplying(r => !r)}>
            ↩ Reply
          </button>
        )}
        <button className="cmt-action-btn" onClick={() => { setEditing(e => !e); setEditText(comment.text) }}>
          Edit
        </button>
        <button className="cmt-action-btn danger" onClick={() => deleteComment(nodeId, comment.id)}>
          Delete
        </button>
      </div>

      {replying && (
        <div className="cmt-reply-form">
          <input
            className="cmt-input"
            placeholder="Your name"
            value={replyAuthor}
            onChange={e => setReplyAuthor(e.target.value)}
          />
          <select className="cmt-select" value={replyType} onChange={e => setReplyType(e.target.value)}>
            {COMMENT_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <textarea
            className="cmt-textarea"
            placeholder="Write a reply..."
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            rows={2}
          />
          <div className="cmt-edit-actions">
            <button className="cmt-btn-save" onClick={submitReply}>Post Reply</button>
            <button className="cmt-btn-cancel" onClick={() => setReplying(false)}>Cancel</button>
          </div>
        </div>
      )}

      {replies.map(r => (
        <CommentBubble key={r.id} nodeId={nodeId} comment={r} depth={depth + 1} />
      ))}
    </div>
  )
}

function CommentLog({ nodeId, label }) {
  const { comments, addComment, getCommentCount, getOpenIssueCount } = useEditData()
  const [open, setOpen] = useState(false)
  const [author, setAuthor] = useState('Auditor')
  const [text, setText] = useState('')
  const [type, setType] = useState('Comment')
  const [statusFilter, setStatusFilter] = useState('All')

  const allRootComments = (comments[nodeId] || []).filter(c => !c.parentId)
  const rootComments = statusFilter === 'All'
    ? allRootComments
    : allRootComments.filter(c => (c.status || 'Open') === statusFilter)

  const count = getCommentCount(nodeId)
  const openCount = getOpenIssueCount(nodeId)

  // Status summary counts
  const statusCounts = {
    Open:        allRootComments.filter(c => (c.status || 'Open') === 'Open').length,
    'In Progress': allRootComments.filter(c => (c.status || 'Open') === 'In Progress').length,
    Resolved:    allRootComments.filter(c => (c.status || 'Open') === 'Resolved').length,
  }

  function submit() {
    if (!text.trim()) return
    addComment(nodeId, author, text, type)
    setText('')
  }

  return (
    <div className="cmt-log" onClick={e => e.stopPropagation()}>
      <div className="cmt-toggle-row">
        <span className="cmt-toggle-label">
          Comments
          {count > 0 && <span className="cmt-count-badge">{count}</span>}
          {openCount > 0 && <span className="cmt-open-badge">{openCount} open</span>}
        </span>
        <button
          className={`cmt-toggle-plus ${open ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
          title={open ? 'Collapse comments' : 'Expand comments'}
        >{open ? '−' : '+'}</button>
      </div>

      {open && (
        <div className="cmt-panel">
          {/* Status filter bar */}
          {allRootComments.length > 0 && (
            <div className="cmt-status-bar">
              {['All', ...STATUSES].map(st => {
                const sc = st !== 'All' ? STATUS_COLORS[st] : null
                const cnt = st === 'All' ? allRootComments.length : statusCounts[st]
                return (
                  <button
                    key={st}
                    className={`cmt-status-filter-btn${statusFilter === st ? ' active' : ''}`}
                    style={sc && statusFilter === st ? { background: sc.bg, color: sc.text, borderColor: sc.border } : {}}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st} <span className="cmt-status-filter-count">{cnt}</span>
                  </button>
                )
              })}
            </div>
          )}

          <div className="cmt-list">
            {rootComments.length === 0 && (
              <p className="cmt-empty">
                {statusFilter !== 'All' ? `No ${statusFilter.toLowerCase()} comments.` : 'No comments yet.'}
              </p>
            )}
            {rootComments.map(c => (
              <CommentBubble key={c.id} nodeId={nodeId} comment={c} />
            ))}
          </div>

          <div className="cmt-new-form">
            <div className="cmt-new-row">
              <input
                className="cmt-input"
                placeholder="Your name"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
              <select className="cmt-select" value={type} onChange={e => setType(e.target.value)}>
                {COMMENT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <textarea
              className="cmt-textarea"
              placeholder="Add a comment..."
              value={text}
              onChange={e => setText(e.target.value)}
              rows={2}
            />
            <button className="cmt-submit-btn" onClick={submit}>Post</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentLog

// Made with Bob
