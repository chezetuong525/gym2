import type { AdviceItem } from '../types'

type AdviceSectionProps = {
  adviceByDay: AdviceItem[]
  selectedAdvice: AdviceItem | null
  onSelectAdvice: (item: AdviceItem) => void
  onCloseAdvice: () => void
}

export default function AdviceSection({
  adviceByDay,
  selectedAdvice,
  onSelectAdvice,
  onCloseAdvice,
}: AdviceSectionProps) {
  return (
    <section className="page-card advice-card">
      <h2>Hướng dẫn khởi động theo ngày</h2>
      <p className="page-description">Mỗi ngày có một bài khởi động chính, nhấn xem chi tiết để mở phần khởi động và giãn cơ phù hợp.</p>
      <div className="advice-grid">
        {adviceByDay.map((item) => (
          <article key={item.day} className="advice-item">
            <div className="schedule-top">
              <span className="schedule-day">{item.day}</span>
              <span className="schedule-focus">Khởi động</span>
            </div>
            <p className="schedule-workout">{item.summary}</p>
            <button className="link-schedule-button" onClick={() => onSelectAdvice(item)}>
              Xem chi tiết
            </button>
          </article>
        ))}
      </div>

      {selectedAdvice && (
        <div className="schedule-modal-backdrop" onClick={onCloseAdvice}>
          <div className="schedule-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={onCloseAdvice} aria-label="Đóng chi tiết">
              ×
            </button>
            <h3>Khởi động chi tiết cho {selectedAdvice.day}</h3>
            <p className="schedule-detail-intro">{selectedAdvice.summary}</p>
            <div className="exercise-list">
              {selectedAdvice.details.map((detail, index) => (
                <article key={index} className="exercise-item">
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
