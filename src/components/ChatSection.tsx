import type { ChangeEvent, FormEvent } from 'react'
import type { ChatMessage } from '../types'

type ChatSectionProps = {
  chatMessages: ChatMessage[]
  chatInput: string
  onChatInputChange: (value: string) => void
  onSendMessage: (event: FormEvent<HTMLFormElement>) => Promise<void>
  loading: boolean
  error: string
}

export default function ChatSection({
  chatMessages,
  chatInput,
  onChatInputChange,
  onSendMessage,
  loading,
  error,
}: ChatSectionProps) {
  return (
    <section className="page-card chat-card">
      <div className="chat-header">
        <div>
          <h2>Chat trực tiếp với Chesse</h2>
          <p className="page-description">Gói Super - 1999k / 1 tháng</p>
        </div>
        <span className="chat-status-badge">Pro</span>
      </div>

      <div className="chat-window">
        {chatMessages.length === 0 ? (
          <div className="chat-empty">Nhận gói Super miễn phí tại đây</div>
        ) : (
          chatMessages.map((message, index) => (
            <div key={`${message.sender}-${index}`} className={`chat-bubble ${message.sender}`}>
              <div className="bubble-meta">
                <span className="bubble-role">{message.sender === 'user' ? 'Con nợn Mei' : 'Chesse'}</span>
                <span>{message.createdAt}</span>
              </div>
              <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
            </div>
          ))
        )}
      </div>

      <form className="chat-form" onSubmit={onSendMessage}>
        <textarea
          value={chatInput}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChatInputChange(event.target.value)}
          placeholder="Hỏi nhanh đi con nợn...."
          rows={4}
        />
        <div className="chat-action-row">
          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
          </button>
        </div>
      </form>

      <div className="chat-hint">Mua gói super nhanh đi nào</div>
      {error && <div className="error-box">{error}</div>}
    </section>
  )
}
