import { useMemo, useState } from 'react'
import './App.css'

type Page = 'schedule' | 'diet' | 'advice' | 'analysis'
type ChatMessage = {
  sender: 'user' | 'assistant'
  text: string
  createdAt: string
}

type ExerciseDetail = {
  name: string
  sets: string
  reps: string
  notes: string
}

type WeeklyItem = {
  day: string
  focus: string
  workout: string
  meal: string
  notes: string
  exercises: ExerciseDetail[]
}

type NutritionInfo = {
  calories: string
  protein: string
  carbs: string
  fat: string
}

type MealDetail = {
  name: string
  description: string
  preparation: string
  alternatives: string[]
  nutrition: NutritionInfo
}

type DietItem = {
  day: string
  meals: MealDetail[]
}

type AdviceSection = {
  title: string
  points: string[]
}

const profile = {
  age: 22,
  weight: 60,
  height: 1.63,
  goal: 'Eo thon, mông săn chắc, cơ thể săn chắc hơn',
}

const weeklySchedule: WeeklyItem[] = [
  {
    day: 'Thứ 2',
    focus: 'Mông + Đùi',
    workout: 'Hip thrust, goblet squat, glute bridge',
    meal: 'Ức gà, khoai lang, rau xanh',
    notes: 'Tăng dần tạ nếu kỹ thuật đã ổn, chú trọng siết cơ mông ở mỗi rep.',
    exercises: [
      {
        name: 'Hip thrust',
        sets: '4 hiệp',
        reps: '12-15 lần',
        notes: 'Đặt vai lên băng, nâng hông cao, siết mông ở đỉnh động tác, giữ gối không quá rộng.',
      },
      {
        name: 'Goblet squat',
        sets: '3 hiệp',
        reps: '10-12 lần',
        notes: 'Giữ lưng thẳng, đẩy hông ra sau, xuống thấp đến khi đùi song song với sàn.',
      },
      {
        name: 'Glute bridge',
        sets: '3 hiệp',
        reps: '15 lần',
        notes: 'Kẹp cơ mông, đẩy hông lên đến khi thân thẳng, không ưỡn lưng quá nhiều.',
      },
    ],
  },
  {
    day: 'Thứ 3',
    focus: 'Lưng + Tay',
    workout: 'Lat pulldown, dumbbell row, bicep curl',
    meal: 'Cá hồi, salad, quinoa',
    notes: 'Duy trì lưng thẳng, thở đều và kiểm soát chuyển động.',
    exercises: [
      {
        name: 'Lat pulldown',
        sets: '4 hiệp',
        reps: '10-12 lần',
        notes: 'Kéo xà xuống trước ngực, giữ cùi chỏ gần thân và ép xương bả vai lại.',
      },
      {
        name: 'Dumbbell row',
        sets: '3 hiệp mỗi bên',
        reps: '10-12 lần',
        notes: 'Giữ lưng thẳng, kéo tạ lên sát sườn và hạ từ từ.',
      },
      {
        name: 'Bicep curl',
        sets: '3 hiệp',
        reps: '12-15 lần',
        notes: 'Giữ khuỷu tay cố định, nghiêng thân nhẹ nếu cần để hoàn thành chuỗi.',
      },
    ],
  },
  {
    day: 'Thứ 4',
    focus: 'Eo + Bụng',
    workout: 'Plank, leg raise, russian twist',
    meal: 'Salad trứng, yến mạch, trái cây',
    notes: 'Giữ cột sống trung tính và tập bài core trước khi tập chính.',
    exercises: [
      {
        name: 'Plank',
        sets: '3 hiệp',
        reps: '30-45 giây',
        notes: 'Giữ thân thẳng, không để hông quá cao hoặc thấp, siết cơ bụng.',
      },
      {
        name: 'Leg raise',
        sets: '3 hiệp',
        reps: '12 lần',
        notes: 'Nâng chân thẳng, không xoay hông, hạ chậm để giữ áp lực vào cơ bụng.',
      },
      {
        name: 'Russian twist',
        sets: '3 hiệp',
        reps: '16 lần',
        notes: 'Ngồi hơi ngả ra sau, xoay thân với tạ nhẹ hoặc không tạ.',
      },
    ],
  },
  {
    day: 'Thứ 5',
    focus: 'Mông + Core',
    workout: 'Bulgarian split squat, deadlift nhẹ, cable kickback',
    meal: 'Tôm, bông cải xanh, gạo lứt',
    notes: 'Chú ý giữ thăng bằng và siết cơ mông ở cuối mỗi hiệp.',
    exercises: [
      {
        name: 'Bulgarian split squat',
        sets: '3 hiệp mỗi chân',
        reps: '10-12 lần',
        notes: 'Đặt một chân lên ghế, hạ gối xuống tạo góc 90 độ, giữ thân thẳng.',
      },
      {
        name: 'Deadlift nhẹ',
        sets: '3 hiệp',
        reps: '10 lần',
        notes: 'Giữ lưng thẳng, kéo tạ bằng cơ mông và cơ đùi sau, không dùng lưng dưới.',
      },
      {
        name: 'Cable kickback',
        sets: '3 hiệp mỗi chân',
        reps: '15 lần',
        notes: 'Kéo chân ra sau, giữ mông siết chặt, không cong lưng.',
      },
    ],
  },
  {
    day: 'Thứ 6',
    focus: 'Cardio',
    workout: 'Đi bộ nhanh hoặc elliptical 25 phút',
    meal: 'Sinh tố protein, hạt chia, rau củ',
    notes: 'Tập cardio ở vùng nhịp tim vừa phải, không quá đuối.',
    exercises: [
      {
        name: 'Đi bộ nhanh',
        sets: '1 phiên',
        reps: '25 phút',
        notes: 'Giữ bước nhanh, thở tự nhiên, không nên quá gắng sức.',
      },
      {
        name: 'Elliptical',
        sets: '1 phiên',
        reps: '25 phút',
        notes: 'Giữ tư thế thẳng, chuyển động đều và ổn định, nếu được.',
      },
    ],
  },
  {
    day: 'Thứ 7',
    focus: 'Giãn cơ + phục hồi',
    workout: 'Yoga nhẹ, pilates, stretch',
    meal: 'Súp rau, cá trắng, trái cây',
    notes: 'Tập trung vào thư giãn cơ và lưu thông máu.',
    exercises: [
      {
        name: 'Yoga nhẹ',
        sets: '1 phiên',
        reps: '20 phút',
        notes: 'Thực hiện các động tác mở hông, giãn lưng và thở sâu.',
      },
      {
        name: 'Pilates',
        sets: '1 phiên',
        reps: '20 phút',
        notes: 'Tập trung vào cơ lõi và điều hòa nhịp thở.',
      },
      {
        name: 'Stretch',
        sets: '1 phiên',
        reps: '15 phút',
        notes: 'Giãn nhẹ từng nhóm cơ, giữ mỗi vị trí 20-30 giây.',
      },
    ],
  },
  {
    day: 'Chủ nhật',
    focus: 'Nghỉ phục hồi',
    workout: 'Đi bộ nhẹ, kéo dãn cơ',
    meal: 'Salad nhẹ, nước lọc, trái cây',
    notes: 'Nghỉ ngơi chủ động, vẫn giữ cơ thể năng động nhẹ nhàng.',
    exercises: [
      {
        name: 'Đi bộ nhẹ',
        sets: '1 phiên',
        reps: '20-30 phút',
        notes: 'Giữ nhịp thở thoải mái, thư giãn toàn thân.',
      },
      {
        name: 'Kéo dãn cơ',
        sets: '1 phiên',
        reps: '10 phút',
        notes: 'Kéo duỗi nhẹ nhàng các nhóm cơ, tập trung vùng chân và lưng.',
      },
    ],
  },
]

const dietPlan: DietItem[] = [
  {
    day: 'Thứ 2',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Yến mạch nóng với trứng luộc và táo tươi.',
        preparation: 'Nấu yến mạch với nước hoặc sữa hạnh nhân, thêm mật ong nhẹ; ăn kèm trứng luộc và táo thái lát.',
        alternatives: ['Ngũ cốc nguyên hạt + sữa chua Hy Lạp', 'Bánh mì nguyên cám + trứng chiên ít dầu'],
        nutrition: { calories: '420 kcal', protein: '22g', carbs: '50g', fat: '14g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Ức gà nướng, khoai lang, rau xanh.',
        preparation: 'Ướp ức gà với tiêu, tỏi, mật ong nhẹ và nướng; ăn cùng khoai lang luộc và salad rau củ.',
        alternatives: ['Cá hồi nướng + gạo lứt', 'Đậu hũ áp chảo + rau củ hấp'],
        nutrition: { calories: '520 kcal', protein: '38g', carbs: '45g', fat: '16g' },
      },
      {
        name: 'Bữa tối',
        description: 'Cá hồi áp chảo với salad rau củ và quinoa.',
        preparation: 'Áp chảo cá hồi với ít dầu ô liu, trộn salad với giấm táo và olive; nấu quinoa với nước.',
        alternatives: ['Cá basa hấp + rau luộc', 'Tôm nướng + salad đậu'],
        nutrition: { calories: '480 kcal', protein: '34g', carbs: '38g', fat: '18g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Sữa chua Hy Lạp với hạt chia.',
        preparation: 'Trộn sữa chua với hạt chia và một chút mật ong, dùng kèm trái cây nhỏ.',
        alternatives: ['Trái cây + hạt điều', 'Sinh tố protein'],
        nutrition: { calories: '190 kcal', protein: '14g', carbs: '18g', fat: '8g' },
      },
    ],
  },
  {
    day: 'Thứ 3',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Sinh tố xanh với chuối và bánh mì nguyên cám.',
        preparation: 'Xay chuối, rau bina, sữa hạnh nhân và một thìa bơ hạt; ăn kèm 1 lát bánh mì nguyên cám.',
        alternatives: ['Cháo yến mạch + trái cây', 'Sữa chua + granola ít đường'],
        nutrition: { calories: '390 kcal', protein: '12g', carbs: '55g', fat: '11g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Tôm rim với bông cải xanh và gạo lứt.',
        preparation: 'Xào tôm với tỏi, hạt tiêu; hấp bông cải xanh và dùng cùng gạo lứt.',
        alternatives: ['Ức gà xào rau củ', 'Cá nhám hấp + rau luộc'],
        nutrition: { calories: '500 kcal', protein: '36g', carbs: '48g', fat: '14g' },
      },
      {
        name: 'Bữa tối',
        description: 'Đậu hũ chiên nhẹ với salad cà chua và rau củ hấp.',
        preparation: 'Chiên đậu hũ với một ít dầu, tạo salad cà chua và hấp thêm rau củ.',
        alternatives: ['Tempeh nướng + salad', 'Cá trắng hấp + cải bó xôi'],
        nutrition: { calories: '430 kcal', protein: '24g', carbs: '30g', fat: '18g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Hạt óc chó và một quả lê.',
        preparation: 'Ăn trực tiếp hạt óc chó cùng lê thái lát.',
        alternatives: ['Hạt điều + táo', 'Thanh hạt dinh dưỡng'],
        nutrition: { calories: '210 kcal', protein: '6g', carbs: '20g', fat: '14g' },
      },
    ],
  },
  {
    day: 'Thứ 4',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Bánh mì nguyên cám với trứng ốp la và cà chua.',
        preparation: 'Nướng bánh mì, chiên trứng nhẹ và phục vụ với cà chua tươi.',
        alternatives: ['Bánh mì bơ đậu phộng ít đường', 'Yến mạch + trứng luộc'],
        nutrition: { calories: '410 kcal', protein: '20g', carbs: '44g', fat: '15g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Cá basa nướng với măng tây và khoai lang.',
        preparation: 'Nướng cá basa với chanh, hấp măng tây và nướng khoai lang.',
        alternatives: ['Cá tuyết hấp + salad', 'Gà nướng + rau củ'],
        nutrition: { calories: '510 kcal', protein: '38g', carbs: '46g', fat: '14g' },
      },
      {
        name: 'Bữa tối',
        description: 'Canh bí đỏ với ức gà xé và rau trộn.',
        preparation: 'Ninh bí đỏ mềm, xé ức gà luộc và trộn rau xanh với dầu ô liu.',
        alternatives: ['Súp lơ xanh + cá nướng', 'Trứng hấp + salad'],
        nutrition: { calories: '450 kcal', protein: '32g', carbs: '40g', fat: '16g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Sinh tố protein với dâu tây.',
        preparation: 'Xay whey protein với sữa hạnh nhân và dâu tây.',
        alternatives: ['Sữa chua trái cây', 'Hạt năng lượng tự làm'],
        nutrition: { calories: '210 kcal', protein: '20g', carbs: '18g', fat: '8g' },
      },
    ],
  },
  {
    day: 'Thứ 5',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Yến mạch lạnh với sữa hạnh nhân và chuối lát.',
        preparation: 'Ngâm yến mạch trong sữa hạnh nhân, thêm chuối và hạt chia.',
        alternatives: ['Smoothie bơ + yến mạch', 'Bánh mì nguyên cám + trứng luộc'],
        nutrition: { calories: '400 kcal', protein: '14g', carbs: '50g', fat: '13g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Gà áp chảo với salad bơ và gạo lứt.',
        preparation: 'Áp chảo ức gà, cắt bơ và trộn salad, dùng với gạo lứt.',
        alternatives: ['Cá hồi áp chảo + rau củ', 'Đậu hũ xào rau củ'],
        nutrition: { calories: '530 kcal', protein: '38g', carbs: '42g', fat: '18g' },
      },
      {
        name: 'Bữa tối',
        description: 'Súp lơ xanh luộc với cá hồi nướng và trứng luộc.',
        preparation: 'Luộc súp lơ, nướng cá hồi đơn giản và phục vụ cùng trứng luộc.',
        alternatives: ['Cá thu hấp + salad', 'Gà luộc + rau xanh'],
        nutrition: { calories: '470 kcal', protein: '36g', carbs: '30g', fat: '20g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Sữa chua ít béo với hạt hạnh nhân.',
        preparation: 'Trộn sữa chua với hạt hạnh nhân và ít mật ong.',
        alternatives: ['Phô mai tươi + táo', 'Hạt điều + chuối'],
        nutrition: { calories: '200 kcal', protein: '12g', carbs: '14g', fat: '12g' },
      },
    ],
  },
  {
    day: 'Thứ 6',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Phở cuốn gà với rau thơm.',
        preparation: 'Cuốn gà luộc với rau thơm và bánh phở, dùng với nước chấm nhẹ.',
        alternatives: ['Bánh cuốn + thịt gà', 'Bún gà luộc'],
        nutrition: { calories: '420 kcal', protein: '26g', carbs: '48g', fat: '12g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Thịt bò xào rau củ với cơm lứt.',
        preparation: 'Xào thịt bò với cà rốt, bông cải và hành tây; ăn cùng cơm lứt.',
        alternatives: ['Ức gà xào rau củ', 'Cá hồi nướng + gạo lứt'],
        nutrition: { calories: '520 kcal', protein: '34g', carbs: '50g', fat: '18g' },
      },
      {
        name: 'Bữa tối',
        description: 'Cá trắng hấp với bông cải xanh và cải bó xôi.',
        preparation: 'Hấp cá trắng cùng gừng, dùng với bông cải xanh và cải bó xôi luộc.',
        alternatives: ['Cá basa hấp + rau luộc', 'Đậu hũ hấp + salad'],
        nutrition: { calories: '440 kcal', protein: '34g', carbs: '28g', fat: '16g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Trái cây tươi với hạt điều.',
        preparation: 'Ăn mix trái cây tươi với hạt điều rang nhẹ.',
        alternatives: ['Hạt mắc ca + táo', 'Thanh yến mạch tự nhiên'],
        nutrition: { calories: '200 kcal', protein: '6g', carbs: '24g', fat: '10g' },
      },
    ],
  },
  {
    day: 'Thứ 7',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Smoothie bơ với yến mạch và sữa hạnh nhân.',
        preparation: 'Xay bơ, yến mạch và sữa hạnh nhân thành smoothie mịn.',
        alternatives: ['Sinh tố chuối + bơ đậu phộng', 'Yến mạch lạnh + trái cây'],
        nutrition: { calories: '430 kcal', protein: '12g', carbs: '48g', fat: '18g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Salad quinoa với ức gà và rau mix.',
        preparation: 'Trộn quinoa chín với ức gà xé và rau xanh, thêm dầu ô liu.',
        alternatives: ['Salad đậu gà + rau củ', 'Bún gạo lứt trộn gà'],
        nutrition: { calories: '500 kcal', protein: '36g', carbs: '42g', fat: '18g' },
      },
      {
        name: 'Bữa tối',
        description: 'Canh nấm đông cô với ức gà chiên không dầu và rau củ.',
        preparation: 'Nấu canh nấm đông cô; chiên ức gà bằng nồi không dầu và ăn kèm rau củ hấp.',
        alternatives: ['Cá kho + canh rau', 'Thịt gà luộc + salad'],
        nutrition: { calories: '460 kcal', protein: '34g', carbs: '30g', fat: '18g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Cà rốt với hummus.',
        preparation: 'Cắt cà rốt thanh và chấm hummus.',
        alternatives: ['Dưa chuột + hummus', 'Ớt chuông + phô mai ít béo'],
        nutrition: { calories: '180 kcal', protein: '6g', carbs: '22g', fat: '10g' },
      },
    ],
  },
  {
    day: 'Chủ nhật',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Bánh mì nguyên cám với trứng và rau xà lách.',
        preparation: 'Nướng bánh mì, phục vụ với trứng ốp và rau xà lách tươi.',
        alternatives: ['Bánh mì bơ + chuối', 'Yến mạch + sữa chua'],
        nutrition: { calories: '400 kcal', protein: '18g', carbs: '44g', fat: '14g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Cá tầm quay với bông cải trắng và khoai lang.',
        preparation: 'Quay cá tầm cùng gia vị nhẹ, ăn kèm bông cải và khoai lang nướng.',
        alternatives: ['Cá hồi nướng + salad', 'Gà nướng + khoai lang'],
        nutrition: { calories: '520 kcal', protein: '38g', carbs: '42g', fat: '16g' },
      },
      {
        name: 'Bữa tối',
        description: 'Súp rau củ với salad trộn nhẹ.',
        preparation: 'Nấu súp rau củ đa dạng, trộn salad xanh với dầu oliu và giấm táo.',
        alternatives: ['Canh bí đỏ + salad', 'Súp gà + rau củ'],
        nutrition: { calories: '360 kcal', protein: '14g', carbs: '34g', fat: '16g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Trái cây và một quả chuối.',
        preparation: 'Ăn trực tiếp trái cây tươi và chuối.',
        alternatives: ['Táo + hạt điều', 'Sữa chua trái cây'],
        nutrition: { calories: '210 kcal', protein: '4g', carbs: '46g', fat: '2g' },
      },
    ],
  },
]

const adviceSections: AdviceSection[] = [
  {
    title: 'Luyện tập',
    points: [
      'Tập 3-4 buổi/tuần, mỗi buổi 45-60 phút.',
      'Ưu tiên bài tập compound và bài tập mông/đùi.',
      'Nghỉ giữa hiệp 60-90 giây để duy trì cường độ.',
    ],
  },
  {
    title: 'Dinh dưỡng',
    points: [
      'Chia 4-5 bữa/ngày để giữ năng lượng ổn định.',
      'Ưu tiên protein nạc, rau xanh, carb phức hợp và chất béo tốt.',
      'Kiểm soát lượng đường và tinh bột vào bữa tối.',
    ],
  },
  {
    title: 'Phục hồi',
    points: [
      'Ngủ đủ 7-8 tiếng để cơ bắp tái tạo.',
      'Giữ co giãn nhẹ sau tập để giảm đau cơ.',
      'Uống nước đủ và cân bằng điện giải.',
    ],
  },
  {
    title: 'Tâm lý',
    points: [
      'Giữ tinh thần tích cực, đừng quá áp lực.',
      'Xác định mục tiêu nhỏ theo tuần để dễ duy trì.',
      'Ghi lại tiến độ giúp bạn theo dõi kết quả rõ ràng.',
    ],
  },
]

const openAIHeaders = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  return {
    'Content-Type': 'application/json',
    Authorization: apiKey ? `Bearer ${apiKey}` : '',
  }
}

function generateLocalAIReply(message: string): string {
  const prompt = message.toLowerCase()
  if (prompt.includes('mông') || prompt.includes('đùi') || prompt.includes('squat') || prompt.includes('hip')) {
    return 'Nếu bạn muốn mông săn chắc, tập trung vào hip thrust, Bulgarian split squat và glute bridge. Chú ý siết mông ở cuối mỗi lần đẩy, giữ cột sống thẳng và tăng dần tạ khi đã quen.'
  }
  if (prompt.includes('eo') || prompt.includes('bụng') || prompt.includes('gập bụng') || prompt.includes('plank')) {
    return 'Để eo thon và bụng săn chắc, làm plank, leg raise và russian twist. Kết hợp với chế độ ăn ít tinh bột và nhiều rau xanh để phần bụng rõ hơn.'
  }
  if (prompt.includes('ăn') || prompt.includes('dinh dưỡng') || prompt.includes('calo')) {
    return 'Ưu tiên protein nạc, rau xanh, carb phức hợp và chất béo tốt. Chia bữa ăn thành 4-5 bữa nhỏ để giữ năng lượng ổn định và hạn chế đồ ngọt, nước ngọt.'
  }
  if (prompt.includes('ngủ') || prompt.includes('phục hồi') || prompt.includes('mệt')) {
    return 'Ngủ đủ 7-8 tiếng, uống nước đều và giãn cơ nhẹ sau buổi tập. Nếu cảm thấy mệt, giảm cường độ và ưu tiên phục hồi trước khi tập nặng trở lại.'
  }
  if (prompt.includes('cardio') || prompt.includes('tim') || prompt.includes('mỡ')) {
    return 'Cardio nhẹ 20-25 phút như đi bộ nhanh hoặc elliptical giúp đốt mỡ. Kết hợp với tạ để không chỉ giảm mỡ mà vẫn giữ cơ săn chắc.'
  }
  return 'Tôi đề xuất duy trì lịch tập hiện tại, ăn đủ protein và rau xanh. Nếu cần, bạn có thể hỏi chi tiết hơn về mông, eo, chế độ ăn hoặc phục hồi.'
}

async function fetchChatbotReply(chatHistory: ChatMessage[], message: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) {
    return generateLocalAIReply(message)
  }

  const systemPrompt = `Bạn là trợ lý tập luyện và dinh dưỡng cho nữ 22 tuổi, 60kg, 1m63. Hãy trả lời thân thiện, cụ thể và dễ hiểu.`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.map((message) => ({
      role: message.sender === 'user' ? 'user' : 'assistant',
      content: message.text,
    })),
    { role: 'user', content: message },
  ]

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: openAIHeaders(),
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.75,
        max_tokens: 550,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.warn('OpenAI API lỗi, dùng AI nội bộ:', errorBody)
      return generateLocalAIReply(message)
    }

    const data = await response.json()
    return data?.choices?.[0]?.message?.content?.trim() ?? 'Chatbot không trả lời.'
  } catch (err) {
    console.warn('Lỗi gọi OpenAI, dùng AI nội bộ:', err)
    return generateLocalAIReply(message)
  }
}

function PageButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button className={`page-button ${active ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  )
}

function App() {
  const [page, setPage] = useState<Page>('schedule')
  const [selectedDay, setSelectedDay] = useState<WeeklyItem | null>(null)
  const [selectedDiet, setSelectedDiet] = useState<DietItem | null>(null)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const bmi = useMemo(() => {
    return (profile.weight / (profile.height * profile.height)).toFixed(1)
  }, [])

  const calorieTarget = useMemo(() => 1650, [])

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = chatInput.trim()
    if (!trimmed) return

    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    const userMessage: ChatMessage = {
      sender: 'user',
      text: trimmed,
      createdAt: now,
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput('')
    setLoading(true)
    setError('')

    try {
      const reply = await fetchChatbotReply([...chatMessages, userMessage], trimmed)
      const botMessage: ChatMessage = {
        sender: 'assistant',
        text: reply,
        createdAt: now,
      }
      setChatMessages((prev) => [...prev, botMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="hero-head">
          <div className="hero-copy">
            <p className="hero-tag">Dashboard Tập Luyện & Dinh Dưỡng</p>
            <h1>Chăm sóc Nữ 22 tuổi 60kg 1m63</h1>
            <p className="hero-text">Điều hướng lịch tập, thực đơn và chat trực tiếp với trợ lý AI.</p>
          </div>
          <div className="profile-summary">
            <div>
              <span>Tuổi</span>
              <strong>{profile.age}</strong>
            </div>
            <div>
              <span>Cân nặng</span>
              <strong>{profile.weight} kg</strong>
            </div>
            <div>
              <span>Chiều cao</span>
              <strong>{profile.height} m</strong>
            </div>
            <div>
              <span>BMI</span>
              <strong>{bmi}</strong>
            </div>
            <div>
              <span>Calo mục tiêu</span>
              <strong>{calorieTarget} kcal</strong>
            </div>
          </div>
        </header>

        <nav className="page-nav">
          <PageButton label="Thời khóa biểu" active={page === 'schedule'} onClick={() => setPage('schedule')} />
          <PageButton label="Chế độ ăn" active={page === 'diet'} onClick={() => setPage('diet')} />
          <PageButton label="Lời khuyên" active={page === 'advice'} onClick={() => setPage('advice')} />
          <PageButton label="Chat với AI" active={page === 'analysis'} onClick={() => setPage('analysis')} />
        </nav>

        <main className="page-content">
          {page === 'schedule' && (
            <section className="page-card schedule-card">
              <h2>Thời khóa biểu tập luyện</h2>
              <p className="page-description">Lịch tập kết hợp mông, eo, core và phục hồi, thiết kế cho nữ 22 tuổi.</p>
              <div className="schedule-grid">
                {weeklySchedule.map((item) => (
                  <article
                    key={item.day}
                    className={`schedule-item ${selectedDay?.day === item.day ? 'active' : ''}`}
                    onClick={() => setSelectedDay(item)}
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
                <div className="schedule-modal-backdrop" onClick={() => setSelectedDay(null)}>
                  <div className="schedule-modal" onClick={(event) => event.stopPropagation()}>
                    <button className="modal-close" onClick={() => setSelectedDay(null)} aria-label="Đóng chi tiết">
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
          )}

          {page === 'diet' && (
            <section className="page-card diet-card">
              <h2>Chế độ dinh dưỡng theo ngày</h2>
              <p className="page-description">Lịch ăn chi tiết mỗi ngày trong tuần: T2 ăn gì, T3 ăn gì...</p>
              <div className="diet-grid">
                {dietPlan.map((item) => (
                  <article key={item.day} className="diet-item" onClick={() => setSelectedDiet(item)}>
                    <h3>{item.day}</h3>
                    {item.meals.map((meal) => (
                      <p key={meal.name}><strong>{meal.name}:</strong> {meal.description}</p>
                    ))}
                    <p className="diet-card-hint">Nhấn để xem chi tiết công thức, thay thế và dinh dưỡng.</p>
                  </article>
                ))}
              </div>

              {selectedDiet && (
                <div className="schedule-modal-backdrop" onClick={() => setSelectedDiet(null)}>
                  <div className="schedule-modal" onClick={(event) => event.stopPropagation()}>
                    <button className="modal-close" onClick={() => setSelectedDiet(null)} aria-label="Đóng chi tiết">
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
          )}

          {page === 'advice' && (
            <section className="page-card advice-card">
              <h2>Lời khuyên chuyên sâu</h2>
              <p className="page-description">Hệ thống hóa những điều cần nhớ để thân hình chuyển biến rõ rệt hơn.</p>
              <div className="advice-sections">
                {adviceSections.map((section) => (
                  <article key={section.title} className="advice-section">
                    <h3>{section.title}</h3>
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}

          {page === 'analysis' && (
            <section className="page-card chat-card">
              <h2>Chat trực tiếp với chatbot</h2>
              <p className="page-description">Trò chuyện ngay để nhận phân tích, điều chỉnh lịch và lời khuyên cá nhân hóa.</p>

              <form className="chat-form" onSubmit={handleSendMessage}>
                <textarea
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Hỏi về buổi tập, chế độ ăn hoặc cách phục hồi..."
                  rows={4}
                />
                <button type="submit" className="cta-button" disabled={loading}>
                  {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                </button>
              </form>

              {error && <div className="error-box">{error}</div>}

              <div className="chat-history">
                {chatMessages.length === 0 ? (
                  <div className="chat-empty">Bắt đầu chat với trợ lý AI để nhận lời khuyên ngay.</div>
                ) : (
                  chatMessages.map((message, index) => (
                    <div key={`${message.sender}-${index}`} className={`chat-bubble ${message.sender}`}>
                      <div className="bubble-meta">
                        <span>{message.sender === 'user' ? 'Bạn' : 'Bot'}</span>
                        <span>{message.createdAt}</span>
                      </div>
                      <p>{message.text}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
