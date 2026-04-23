import type { WeeklyItem } from '../types'
import { sampleVideoUrl } from './profile'

export const weeklyScheduleHome: WeeklyItem[] = [
  {
    day: 'Thứ 2',
    focus: 'Mông & Đùi (Lower Body)',
    workout: 'Banded Squat, Glute Bridge, Lateral Walk, Donkey Kicks, Stiff-Legged Deadlift, Fire Hydrant, Clamshells',
    meal: 'Ức gà, khoai lang, rau xanh',
    notes: 'Tập trung vào cảm nhận cơ mông và đùi. Sử dụng dây kháng lực. Ưu tiên kỹ thuật tốt hơn trọng lượng.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Banded Squat',
        sets: '3 hiệp',
        reps: '15 lần',
        notes: 'Mini Band 13-18kg. Đứng chân rộng ngang vai, dây quanh gối. Squat xuống như ngồi trên ghế, mông ra sau, giữ gối mở theo hướng ngón chân. Chi tiết xem ghi chú bài tập.',
      },
      {
        name: 'Glute Bridge',
        sets: '3 hiệp',
        reps: '20 lần',
        notes: 'Mini Band 18-25kg. Nằm ngửa, gối cúp, dây quanh gối. Đẩy hông lên tạo đường thẳng từ vai đến gối. Siết mông chặt ở đỉnh trong 2 giây.',
      },
      {
        name: 'Lateral Walk',
        sets: '3 hiệp',
        reps: '20 bước mỗi bên',
        notes: 'Mini Band 9-13kg. Tư thế nửa squat, dây quanh cắp chân. Bước ngang giữ căng dây.',
      },
      {
        name: 'Donkey Kicks',
        sets: '3 hiệp',
        reps: '15 lần/bên',
        notes: 'Mini Band 5-9kg. Tư thế quỳ bốn, dây quanh gối. Đá chân lên giữ góc gối, siết mông mạnh ở đỉnh.',
      },

    ],
  },
  {
    day: 'Thứ 3',
    focus: 'Lưng, Vai & Tay (Upper Body)',
    workout: 'Band Over Row, Lat Pulldown, Overhead Press, Band Pull-Apart',
    meal: 'Cá hồi, salad, quinoa',
    notes: 'Tập trung vào chuyển động bả vai và khoảng cách. Sử dụng dây kháng lực, tránh sử dụng tay quá nhiều.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Band Over Row',
        sets: '3 hiệp',
        reps: '15 lần',
        notes: 'Long Band 10-15kg. Đứng trên dây, hinge về phía trước 45 độ, kéo dây về hai bên ép bả vai vào nhau.',
      },
      {
        name: 'Lat Pulldown',
        sets: '3 hiệp',
        reps: '15 lần',
        notes: 'Long Band 7-12kg. Dây buộc ở điểm cao, ngồi kéo dây xuống ngực sử dụng lat không phải tay.',
      },
      {
        name: 'Overhead Press',
        sets: '3 hiệp',
        reps: '12 lần',
        notes: 'Long Band 3-6kg. Đứng trên dây, đẩy tay trên đầu.',
      },
   
    ],
  },
  {
    day: 'Thứ 4',
    focus: 'Nghỉ ngơi hoặc đi bộ nhẹ',
    workout: 'Light walking hoặc recovery exercise',
    meal: 'Salad, nước ép trái cây, thực phẩm nhẹ',
    notes: 'Ngày recovery. Đi bộ nhẹ, yoga hoặc thể dục nhẹ nhàng để cơ phục hồi.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Đi bộ nhẹ',
        sets: '1',
        reps: '20-30 phút',
        notes: 'Đi bộ ở tốc độ nhẹ nhàng, không quá mệt mỏi.',
      },
    ],
  },
  {
    day: 'Thứ 5',
    focus: 'Mông & Đùi (Lower Body) - Lặp lại Thứ 2',
    workout: 'Banded Squat, Glute Bridge, Lateral Walk, Donkey Kicks, Stiff-Legged Deadlift, Fire Hydrant, Clamshells',
    meal: 'Ức gà, khoai lang, rau xanh',
    notes: 'Lặp lại bài tập Thứ 2 với cùng cường độ và technique.',
    videoUrl: sampleVideoUrl,
    exercises: [
  {
        name: 'Monster Walk',
        sets: '3 hiệp',
        reps: '15-20 bước/chiều',
        notes: 'Mini Band quanh cổ chân hoặc trên gối. Hạ thấp trọng tâm (half-squat), bước chéo hoặc bước ngang, giữ dây luôn căng và không để hai đầu gối chụm vào nhau.',
      },
      {
        name: 'Donkey Kicks',
        sets: '3 hiệp',
        reps: '15 lần/bên',
        notes: 'Mini Band 5-9kg. Tư thế quỳ bốn, dây quanh gối. Đá chân lên giữ góc gối, siết mông mạnh ở đỉnh.',
      },
      {
        name: 'Stiff-Legged Deadlift',
        sets: '3 hiệp',
        reps: '15 lần',
        notes: 'Long Band 15-22kg. Đứng trên dây, gối hơi cúp, hinge tại hông đẩy mông ra sau.',
      },
      {
        name: 'Fire Hydrant',
        sets: '3 hiệp',
        reps: '15 lần/bên',
        notes: 'Mini Band 5-9kg. Tư thế quỳ bốn, dây quanh gối. Mở chân ngang như chó tưới nước.',
      },
      {
        name: 'Clamshells',
        sets: '3 hiệp',
        reps: '15 lần/bên',
        notes: 'Mini Band 13-18kg. Nằm sườn, gối cúp chồng lên nhau, dây quanh gối. Mở gối trên lên.',
      },
    ],
  },
  {
    day: 'Thứ 6',
    focus: 'Thân trên & Bụng (Upper & Abs)',
    workout: 'Band Pull-Apart, Bicycle Crunches, Plank Tap',
    meal: 'Cá trắng, rau bông cải, gạo lứt',
    notes: 'Tập trung vào bụng và thân trên. Giữ core căng trong tất cả bài tập.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Band Pull-Apart',
        sets: '3 hiệp',
        reps: '20 lần',
        notes: 'Long Band 3-5kg. Cầm dây phía trước ngực, kéo rộng sử dụng vai sau.',
      },
      {
        name: 'Bicycle Crunches',
        sets: '3 hiệp',
        reps: '20 lần',
        notes: 'Mini Band 3-5kg quanh chân. Nằm ngửa, chuyển động chân như đạp xe, ôm gối vào ngực luân phiên.',
      },
      {
        name: 'Plank Tap',
        sets: '3 hiệp',
        reps: '15 lần',
        notes: 'Mini Band 5-9kg quanh cổ tay. Tư thế plank, chạm lần lượt tay xuống đất giữ hông cân bằng và core căng.',
      },
    ],
  },
  {
    day: 'Thứ 7',
    focus: 'Full Body Cardio',
    workout: 'Jumping Jacks with band, Squat Thrusts, Mountain Climbers',
    meal: 'Gà nướng, khoai tây, salad',
    notes: '3 vòng, 45 giây mỗi bài, 30 giây nghỉ giữa các vòng. Dây kháng lực quanh cắp chân cho Jumping Jacks.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Jumping Jacks with band on ankles',
        sets: '3 vòng',
        reps: '45 giây',
        notes: 'Dây quanh cắp chân. Nhảy tách chân rộng trong 45 giây, 30 giây nghỉ.',
      },
      {
        name: 'Squat Thrusts',
        sets: '3 vòng',
        reps: '45 giây',
        notes: 'Từ đứng squat xuống đặt tay, nhảy chân về phía sau tạo plank, nhảy chân về phía trước đứng lên. 45 giây, 30 giây nghỉ.',
      },
      {
        name: 'Mountain Climbers',
        sets: '3 vòng',
        reps: '45 giây',
        notes: 'Tư thế plank, thay phiên kéo gối lên hướng ngực tạo chuyển động như leo núi nhanh. 45 giây, 30 giây nghỉ.',
      },
    ],
  },
  {
    day: 'Chủ Nhật',
    focus: 'Nghỉ ngơi toàn bộ',
    workout: 'Relaxation và recovery',
    meal: 'Bất kỳ, tập trung vào hydration',
    notes: 'Ngày nghỉ hoàn toàn. Tập trung vào phục hồi, kéo giãn, và hydration. Chuẩn bị cho tuần mới.',
    videoUrl: sampleVideoUrl,
    exercises: [
      {
        name: 'Rest Day',
        sets: '1',
        reps: 'Cả ngày',
        notes: 'Ngày nghỉ. Có thể tập yoga nhẹ, thiền, hoặc kéo giãn cơ nếu muốn.',
      },
    ],
  },
]
