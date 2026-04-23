import { useState } from 'react'
import type { VideoGuideDay, WeeklyItem } from '../types'
import type { ExerciseGuideDetail } from '../data/exerciseGuides'
import { getAssetUrl, isImageAsset } from '../utils/assets'

type VideosSectionProps = {
  videoGuideByDay: VideoGuideDay[]
  weeklySchedule: WeeklyItem[]
  expandedVideoDay: string | null
  toggleVideoDay: (day: string) => void
  exerciseGuides: ExerciseGuideDetail[]
}

export default function VideosSection({
  videoGuideByDay,
  weeklySchedule,
  expandedVideoDay,
  toggleVideoDay,
  exerciseGuides,
}: VideosSectionProps) {
  const [selectedGuides, setSelectedGuides] = useState<ExerciseGuideDetail[]>([])

  const openGuideModal = (day: string) => {
    const dayData = videoGuideByDay.find(d => d.day === day)
    if (!dayData) return

    const guides = dayData.videos
      .map(video => exerciseGuides.find(
        g => g.name.toLowerCase() === video.title.toLowerCase() ||
             video.title.toLowerCase().includes(g.name.toLowerCase())
      ))
      .filter(Boolean) as ExerciseGuideDetail[]

    setSelectedGuides(guides)
  }

  return (
    <section className="page-card videos-card">
      <h2>Video hướng dẫn tập luyện</h2>
      <p className="page-description">Nhấn vào từng ngày để mở danh sách video cần tập. Sau đó bạn có thể xem hướng dẫn chi tiết hoặc ẩn lại.</p>
      <div className="videos-grid">
        {videoGuideByDay.map((day) => {
          const schedule = weeklySchedule.find((item) => item.day === day.day)
          const expanded = expandedVideoDay === day.day
          return (
            <section key={day.day} className={`video-day-section ${expanded ? 'expanded' : ''}`}>
              <div className="video-day-summary" onClick={() => toggleVideoDay(day.day)}>
                <div>
                  <h3>{day.day}</h3>
                  <p>{schedule?.focus ?? 'Video hướng dẫn'} · {day.videos.length} video</p>
                  <span className="video-summary-action">
                    {expanded ? 'Đang hiển thị danh sách' : 'Nhấn để xem video'}
                  </span>
                </div>
              </div>

              {expanded && (
                <div className="video-day-body" onClick={(event) => event.stopPropagation()}>
                  <div className="video-list">
                    {day.videos.map((video) => (
                      <article key={video.title} className="video-card">
                        <h4>{video.title}</h4>
                        <p>{video.description}</p>
                        {isImageAsset(video.assetSrc) ? (
                          <img src={getAssetUrl(video.assetSrc)} alt={video.title} className="media-preview" />
                        ) : (
                          <video
                            src={getAssetUrl(video.assetSrc)}
                            controls
                            playsInline
                            preload="metadata"
                            className="media-preview"
                          />
                        )}
                      </article>
                    ))}
                  </div>
                  <div className="video-actions">
                    <button className="link-schedule-button" onClick={() => openGuideModal(day.day)}>
                      Xem hướng dẫn chi tiết
                    </button>
                    <button className="hide-button" onClick={() => toggleVideoDay(day.day)}>
                      Ẩn
                    </button>
                  </div>
                </div>
              )}
            </section>
          )
        })}
      </div>

      {selectedGuides.length > 0 && (
        <div className="schedule-modal-backdrop" onClick={() => setSelectedGuides([])}>
          <div className="schedule-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedGuides([])} aria-label="Đóng">
              ×
            </button>
            <h3>Hướng dẫn chi tiết</h3>
            <p className="schedule-detail-intro">Các bài tập dưới đây với hướng dẫn chi tiết để thực hiện đúng kỹ thuật.</p>
            
            {selectedGuides.map((guide) => (
              <div key={guide.name} className="guide-section">
                <h4>{guide.name}</h4>
                <p className="exercise-summary">{guide.summary}</p>
                
                <div className="guide-subsection">
                  <h5>Cách thực hiện:</h5>
                  <div className="exercise-list">
                    {guide.instructions.map((instruction, index) => (
                      <article key={index} className="exercise-item">
                        <p>
                          <strong>{index + 1}.</strong> {instruction}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="guide-subsection">
                  <h5>Lưu ý quan trọng:</h5>
                  <div className="exercise-list">
                    {guide.tips.map((tip, index) => (
                      <article key={index} className="exercise-item">
                        <p>{tip}</p>
                      </article>
                    ))}
                  </div>
                </div>

                {guide.bandType && (
                  <div className="guide-subsection">
                    <h5>Dây kháng lực:</h5>
                    <p className="band-info">
                      Loại: <strong>{guide.bandType}</strong>
                      {guide.bandWeight && <> | Lực: <strong>{guide.bandWeight}</strong></>}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
