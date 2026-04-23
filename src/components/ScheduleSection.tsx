import type { WeeklyItem } from '../types'

type ScheduleSectionProps = {
  weeklySchedule: WeeklyItem[]
  selectedDay: WeeklyItem | null
  onSelectDay: (item: WeeklyItem) => void
  onCloseDay: () => void
}

export default function ScheduleSection({
  weeklySchedule,
  selectedDay,
  onSelectDay,
  onCloseDay,
}: ScheduleSectionProps) {
  return (
    <section className="page-card schedule-card">
      <h2>Thời khóa biểu tập luyện</h2>
      <p className="page-description">Lịch tập 5-7 bài/buổi, mỗi buổi ~60 phút theo phong cách PT xịn để tối ưu mông, eo và săn chắc.</p>
      <div className="schedule-grid">
        {weeklySchedule.map((item) => (
          <article
            key={item.day}
            className={`schedule-item ${selectedDay?.day === item.day ? 'active' : ''}`}
            onClick={() => onSelectDay(item)}
          >
            <div className="schedule-top">
              <span className="schedule-day">{item.day}</span>
              <span className="schedule-focus">{item.focus}</span>
            </div>
            <p className="schedule-workout">{item.workout}</p>
            <p className="schedule-meal">Bữa ăn gợi ý: {item.meal}</p>
            <p className="schedule-notes">Ghi chú: {item.notes}</p>
          </article>
        ))}
      </div>

      {selectedDay && (
        <div className="schedule-modal-backdrop" onClick={onCloseDay}>
          <div className="schedule-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={onCloseDay} aria-label="Đóng chi tiết">
              ×
            </button>
            <h3>Hướng dẫn chi tiết cho {selectedDay.day}</h3>
            <p className="schedule-detail-intro">
              Hôm nay tập chủ yếu {selectedDay.focus}. Các bài dưới đây giúp bạn thực hiện đúng kỹ thuật và tăng hiệu quả.
            </p>
            <div className="exercise-list">
              {selectedDay.exercises.map((exercise) => (
                <article key={exercise.name} className="exercise-item">
                  <h4>{exercise.name}</h4>
                  <p><strong>Sets/Reps:</strong> {exercise.sets} / {exercise.reps}</p>
                  <p><strong>Hướng dẫn:</strong> {exercise.notes}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
