import React, { useState } from 'react'
import { useEditData } from '../context/EditContext'

const COMMENT_TYPES = ['Comment', 'Suggestion', 'Issue', 'Recommendation']

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

function CommentBubble({ nodeId, comment, depth = 0 }) {
  const { comments, addComment, editComment, deleteComment } = useEditData()
  const [replying, setReplying] = useState(false)
  const [editing, setEditing] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replyAuthor, setReplyAuthor] = useState('Auditor')
  const [replyType, setReplyType] = useState('Comment')
  const [editText, setEditText] = useState(comment.text)

  const replies = (comments[nodeId] || []).filter(c => c.parentId === comment.id)

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
    <div className={`cmt-bubble ${depth > 0 ? 'cmt-reply' : ''}`}>
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
  const { comments, addComment, getCommentCount } = useEditData()
  const [open, setOpen] = useState(false)
  const [author, setAuthor] = useState('Auditor')
  const [text, setText] = useState('')
  const [type, setType] = useState('Comment')

  const rootComments = (comments[nodeId] || []).filter(c => !c.parentId)
  const count = getCommentCount(nodeId)

  function submit() {
    if (!text.trim()) return
    addComment(nodeId, author, text, type)
    setText('')
  }

  return (
    <div className="cmt-log">
      <button
        className="cmt-toggle-btn"
        onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
      >
        💬 {count > 0 ? count : ''} {label || 'Comments'}
        {count > 0 && <span className="cmt-count-badge">{count}</span>}
      </button>

      {open && (
        <div className="cmt-panel" onClick={e => e.stopPropagation()}>
          <div className="cmt-panel-header">
            <span>{label || 'Comment Log'}</span>
            <button className="cmt-panel-close" onClick={() => setOpen(false)}>✕</button>
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
              placeholder="Add a comment, suggestion, issue or recommendation..."
              value={text}
              onChange={e => setText(e.target.value)}
              rows={2}
            />
            <button className="cmt-submit-btn" onClick={submit}>Post</button>
          </div>

          <div className="cmt-list">
            {rootComments.length === 0 && (
              <p className="cmt-empty">No comments yet.</p>
            )}
            {rootComments.map(c => (
              <CommentBubble key={c.id} nodeId={nodeId} comment={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentLog

// Made with Bob
