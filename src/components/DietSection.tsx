import type { DietItem } from '../types'

type DietSectionProps = {
  dietPlan: DietItem[]
  selectedDiet: DietItem | null
  onSelectDiet: (item: DietItem) => void
  onCloseDiet: () => void
}

export default function DietSection({
  dietPlan,
  selectedDiet,
  onSelectDiet,
  onCloseDiet,
}: DietSectionProps) {
  return (
    <section className="page-card diet-card">
      <h2>Chế độ dinh dưỡng theo ngày</h2>
      <p className="page-description">Lịch ăn chi tiết mỗi ngày trong tuần: T2 ăn gì, T3 ăn gì...</p>
      <div className="diet-grid">
        {dietPlan.map((item) => (
          <article key={item.day} className="diet-item" onClick={() => onSelectDiet(item)}>
            <h3>{item.day}</h3>
            {item.meals.map((meal) => (
              <p key={meal.name}><strong>{meal.name}:</strong> {meal.description}</p>
            ))}
            <p className="diet-card-hint">Nhấn để xem chi tiết công thức, thay thế và dinh dưỡng.</p>
          </article>
        ))}
      </div>

      {selectedDiet && (
        <div className="schedule-modal-backdrop" onClick={onCloseDiet}>
          <div className="schedule-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={onCloseDiet} aria-label="Đóng chi tiết">
              ×
            </button>
            <h3>Chi tiết chế độ dinh dưỡng {selectedDiet.day}</h3>
            <p className="schedule-detail-intro">
              Xem cách chế biến, lựa chọn thay thế khi không có nguyên liệu và giá trị dinh dưỡng cho từng món.
            </p>
            <div className="meal-detail-list">
              {selectedDiet.meals.map((meal) => (
                <article key={meal.name} className="meal-detail-item">
                  <h4>{meal.name}</h4>
                  <p><strong>Mô tả:</strong> {meal.description}</p>
                  <p><strong>Cách chế biến:</strong> {meal.preparation}</p>
                  <p><strong>Thay thế:</strong></p>
                  <ul>
                    {meal.alternatives.map((alt) => (
                      <li key={alt}>{alt}</li>
                    ))}
                  </ul>
                  <p><strong>Giá trị dinh dưỡng:</strong></p>
                  <div className="nutrition-grid">
                    <span>Calories: {meal.nutrition.calories}</span>
                    <span>Protein: {meal.nutrition.protein}</span>
                    <span>Carbs: {meal.nutrition.carbs}</span>
                    <span>Fat: {meal.nutrition.fat}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="diet-note">
        <h3>Lời khuyên dinh dưỡng</h3>
        <ul>
          <li>Ăn nhiều rau xanh, ưu tiên thực phẩm nguyên chất.</li>
          <li>Giảm tinh bột tinh chế vào bữa tối để hỗ trợ giảm mỡ.</li>
          <li>Lựa chọn protein nạc, chất béo tốt và hydrat hóa đủ 2-2.5 lít nước.</li>
        </ul>
      </div>
    </section>
  )
}
