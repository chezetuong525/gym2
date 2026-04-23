import type { WeeklyItem } from '../types'
import { sampleVideoUrl } from './profile'

export const weeklySchedule: WeeklyItem[] = [
  {
    day: 'Thứ 2',
    focus: 'Mông (Nặng – Quan trọng nhất)',
    workout: 'Hip thrust, Romanian deadlift, Bulgarian split squat, Cable kickback, Hip abduction machine, Glute bridge hold',
    meal: 'Ức gà, khoai lang, rau xanh',
    notes: 'Ưu tiên cảm nhận cơ (Mind-muscle connection). Nghỉ 60-90s giữa các bài nặng.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Hip thrust',
        sets: '4 hiệp',
        reps: '8-10 lần',
        notes: 'Mức tạ: 15-20kg (tổng). Cằm luôn gập về phía ngực, lưng trên tựa ghế, gồng bụng chắc, đẩy hông lên đến khi đùi song song sàn rồi siết mông 2 giây.',
      },
      {
        name: 'Romanian deadlift',
        sets: '3 hiệp',
        reps: '10 lần',
        notes: 'Mức tạ: 2 quả tạ đơn 6-8kg. Giữ thanh đòn/tạ sát chân, đẩy mông ra sau hết mức đến khi thấy đùi sau căng, lưng phải thẳng tuyệt đối.',
      },
      {
        name: 'Bulgarian split squat',
        sets: '3 hiệp mỗi bên',
        reps: '8 lần',
        notes: 'Mức tạ: 2 quả tạ đơn 4kg. Đứng cách ghế 2 bước chân, đặt 1 chân lên ghế. Khi xuống, hơi đổ người về trước để tác động sâu vào mông.',
      },
      {
        name: 'Cable kickback',
        sets: '3 hiệp',
        reps: '12 lần',
        notes: 'Mức tạ: 5-10kg trên máy cable. Hơi gập thân người, đá chân ra sau và chéo nhẹ ra ngoài, không để lưng dưới bị võng khi đá.',
      },
      {
        name: 'Hip abduction machine',
        sets: '3 hiệp',
        reps: '15 lần',
        notes: 'Mức tạ: 20-25kg. Ngồi hơi nhổm mông khỏi ghế hoặc đổ người về trước, mở rộng gối chậm và kiểm soát lúc khép lại.',
      },
    ],
  },
  {
    day: 'Thứ 3',
    focus: 'Lưng + Tay (Gọn người)',
    workout: 'Lat pulldown, Seated row, Face pull, Lateral raise, Tricep pushdown, Dumbbell curl',
    meal: 'Cá hồi, salad, quinoa',
    notes: 'Tập trung vào chuyển động bả vai để không bị mỏi tay trước lưng.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Lat pulldown',
        sets: '3 hiệp',
        reps: '12 lần',
        notes: 'Mức tạ: 15-20kg. Ưỡn ngực, kéo thanh xà về phía ngực trên, không dùng lực cổ tay, tưởng tượng đang kéo cùi chỏ xuống sườn.',
      },
      {
        name: 'Seated row',
        sets: '3 hiệp',
        reps: '12 lần',
        notes: 'Mức tạ: 15kg. Giữ lưng thẳng, khi kéo tay về thì ép chặt hai bả vai vào nhau, không nhún vai về phía tai.',
      },
      {
        name: 'Lateral raise',
        sets: '3 hiệp',
        reps: '12-15 lần',
        notes: 'Mức tạ: 2kg/bên. Cánh tay hơi cong, nâng tạ lên ngang vai (không cao hơn), lòng bàn tay hướng xuống sàn.',
      },
      {
        name: 'Tricep pushdown',
        sets: '3 hiệp',
        reps: '12 lần',
        notes: 'Mức tạ: 5-10kg. Giữ cùi chỏ cố định sát sườn, chỉ di chuyển cẳng tay từ trên xuống dưới đến khi thẳng tay.',
      },
    ],
  },
  {
    day: 'Thứ 4',
    focus: 'Eo + Bụng',
    workout: 'Plank, Leg raise, Cable crunch, Dead bug, Stomach vacuum',
    meal: 'Salad trứng, yến mạch, trái cây',
    notes: 'Bí quyết eo thon là gồng core (bracing) trong mọi bài tập.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Stomach vacuum',
        sets: '5 hiệp',
        reps: '20 giây',
        notes: 'Thực hiện lúc bụng đói. Thở hết sạch hơi, hóp bụng sâu nhất có thể như muốn rốn chạm cột sống và giữ yên.',
      },
      {
        name: 'Plank',
        sets: '3 hiệp',
        reps: '45 giây',
        notes: 'Cơ thể là một đường thẳng. Siết mông và bụng thật chặt, không để hông bị thấp xuống gây đau lưng.',
      },
      {
        name: 'Dead bug',
        sets: '3 hiệp',
        reps: '12 lần mỗi bên',
        notes: 'Ép chặt lưng dưới xuống sàn sao cho không đút lọt bàn tay qua. Chuyển động chân và tay thật chậm.',
      },
    ],
  },
  {
    day: 'Thứ 5',
    focus: 'Mông + Đùi',
    workout: 'Squat, Leg press, Walking lunges, Leg extension, Hip thrust',
    meal: 'Tôm, bông cải xanh, gạo lứt',
    notes: 'Ngày tập mệt nhất, cần hít thở đúng: xuống hít vào, lên thở ra.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Goblet Squat',
        sets: '4 hiệp',
        reps: '10 lần',
        notes: 'Mức tạ: 8-10kg. Giữ tạ trước ngực, mở gối theo hướng mũi chân, xuống sâu nhất có thể mà lưng vẫn thẳng.',
      },
      {
        name: 'Leg press',
        sets: '3 hiệp',
        reps: '12 lần',
        notes: 'Mức tạ: 40-50kg (tính cả bàn đạp). Đặt chân cao trên bàn đạp để ăn vào mông nhiều hơn. Lưu ý: Không khóa thẳng khớp gối ở đỉnh.',
      },
      {
        name: 'Walking lunges',
        sets: '3 hiệp',
        reps: '12 bước mỗi chân',
        notes: 'Mức tạ: 4kg/bên. Bước dài ra phía trước, giữ thân người đứng thẳng, gối chân sau gần chạm sàn.',
      },
    ],
  },
  {
    day: 'Thứ 6',
    focus: 'Cardio + Mông nhẹ (Phục hồi năng động)',
    workout: 'Đi bộ dốc, Glute bridge, Donkey kicks, Fire hydrant',
    meal: 'Sinh tố protein, hạt chia, rau củ',
    notes: 'Mục tiêu là làm nóng cơ thể và tăng lưu thông máu. Không cần tập đến mức kiệt sức.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Đi bộ dốc (Incline Walk)',
        sets: '1 phiên',
        reps: '20-25 phút',
        notes: 'Mức độ: Độ dốc 5-8%, tốc độ 4.5-5.5 km/h. Không nắm tay vào thành máy để đốt calo tốt hơn và kích hoạt cơ mông.',
      },
      {
        name: 'Glute bridge (Không tạ hoặc tạ nhẹ)',
        sets: '3 hiệp',
        reps: '20 lần',
        notes: 'Mức tạ: 0-5kg. Nằm ngửa, co gối, đẩy hông lên cao và siết chặt mông trong 3 giây ở đỉnh trước khi hạ xuống.',
      },
      {
        name: 'Donkey kicks',
        sets: '3 hiệp',
        reps: '15 lần/bên',
        notes: 'Form: Quỳ 4 chân, giữ lưng thẳng không võng. Đá chân lên trời như đang muốn dùng gót chân chạm trần nhà.',
      },
      {
        name: 'Fire hydrant',
        sets: '3 hiệp',
        reps: '15 lần/bên',
        notes: 'Form: Giữ nguyên tư thế quỳ, mở rộng chân sang ngang như chú chó đang vươn chân. Giúp làm thon gọn phần hông bên.',
      },
    ],
  },
  {
    day: 'Thứ 7',
    focus: 'Phục hồi & Giãn cơ (Stretch)',
    workout: 'Yoga nhẹ, Full body stretching',
    meal: 'Súp rau, cá trắng, trái cây',
    notes: 'Giãn cơ giúp cơ bắp dài ra, thanh mảnh hơn và không bị thô cứng.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Child’s Pose (Tư thế em bé)',
        sets: '3 hiệp',
        reps: '45 giây',
        notes: 'Thư giãn toàn bộ vùng lưng dưới và mông sau một tuần tập nặng.',
      },
      {
        name: 'Pigeon Pose (Tư thế bồ câu)',
        sets: '2 hiệp/bên',
        reps: '30 giây',
        notes: 'Đây là bài giãn cơ mông "thần thánh", giúp giảm đau mỏi cực tốt sau các buổi Squat/Hip Thrust.',
      },
      {
        name: 'Cobra Stretch (Tư thế con hổ)',
        sets: '3 hiệp',
        reps: '30 giây',
        notes: 'Nằm sấp, chống tay nâng người để giãn toàn bộ vùng cơ bụng.',
      },
    ],
  },
  {
    day: 'Chủ nhật',
    focus: 'Nghỉ ngơi hoàn toàn',
    workout: 'Đi bộ thư giãn hoặc nghỉ ngơi',
    meal: 'Ăn uống thoải mái hơn một chút (Cheat meal nhẹ)',
    notes: 'Để cơ thể tự phục hồi hoàn toàn cho chu kỳ Thứ 2 tuần tới.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Đi bộ nhẹ nhàng',
        sets: '1 phiên',
        reps: '15-20 phút',
        notes: 'Đi dạo ngoài trời hoặc trong trung tâm thương mại để tinh thần thoải mái.',
      },
    ],
  },
]
