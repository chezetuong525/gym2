import { useMemo, useState } from 'react'
import './App.css'

type Page = 'schedule' | 'diet' | 'videos' | 'advice' | 'analysis'
type ChatMessage = {
  sender: 'user' | 'assistant'
  text: string
  createdAt: string
}

type ChatbotReply = {
  text: string
  fallback: boolean
  error?: string
}

const CHAT_SERVICE_URL = (import.meta.env.VITE_CHAT_BACKEND_URL ?? 'https://api-gym-1-l2ip.onrender.com')
  .replace(/\/+$/g, '')

const CHAT_SERVICE_PATH = import.meta.env.VITE_CHAT_BACKEND_PATH ?? '/api/hf'

const CHAT_SERVICE_ENDPOINT = `${CHAT_SERVICE_URL}${
  CHAT_SERVICE_PATH.startsWith('/') ? CHAT_SERVICE_PATH : `/${CHAT_SERVICE_PATH}`
}`

// ✅ Define type rõ ràng
type AIResponse = {
  choices?: {
    message?: { content?: string }
    text?: string
  }[]
  generated_text?: string
  output?: string
  text?: string
  outputs?: {
    generated_text?: string
    data?: { text?: string }[]
  }[]
}

// ✅ Không còn any
async function parseAIResponseData(data: AIResponse): Promise<string> {
  return (
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    data?.generated_text ??
    data?.output ??
    data?.text ??
    data?.outputs?.[0]?.generated_text ??
    data?.outputs?.[0]?.data?.[0]?.text ??
    ''
  )
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
  videoUrl?: string
  exercises: ExerciseDetail[]
}

type VideoGuideItem = {
  title: string
  description: string
  assetSrc: string
}

type VideoGuideDay = {
  day: string
  videos: VideoGuideItem[]
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

type AdviceItem = {
  day: string
  summary: string
  details: string[]
}

const profile = {
  age: 22,
  weight: 62,
  height: 1.63,
  goal: 'Eo thon, mông săn chắc và cơ thể săn chắc hơn',
}

const sampleVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4'

const weeklySchedule: WeeklyItem[] = [
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
  },{
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
  }
];

const videoGuideByDay: VideoGuideDay[] = [
  {
    day: 'Thứ 2',
    videos: [
      {
        title: 'Hip Thrust',
        description: 'Kỹ thuật hip thrust để kích hoạt tối đa cơ mông và hông.',
        assetSrc: '/videos/Thu2/HipThurst.mp4',
      },
      {
        title: 'Romanian Deadlift',
        description: 'Giữ lưng thẳng và tập trung vào đùi sau khi kéo.',
        assetSrc: '/videos/Thu2/Romanian deadlift.mp4',
      },
      {
        title: 'Bulgarian Split Squat',
        description: 'Tư thế chuẩn để tập trung vào mông và đùi trước.',
        assetSrc: '/videos/Thu2/Bulgarian split squat.mp4',
      },
      {
        title: 'Cable Kickback',
        description: 'Kéo chân ra sau, siết mông ở đỉnh động tác.',
        assetSrc: '/videos/Thu2/cable kickback.mp4',
      },
      {
        title: 'Hip Abduction Machine',
        description: 'Tập mở hông và mông với máy đẩy chân ngang.',
        assetSrc: '/videos/Thu2/Hip abduction machine.mp4',
      },
    ],
  },
  {
    day: 'Thứ 3',
    videos: [
      {
        title: 'Lat Pulldown',
        description: 'Kéo xà đúng tư thế, giữ ngực hướng lên và bả vai xuống.',
        assetSrc: '/videos/Thu3/LatPullDown.mp4',
      },
      {
        title: 'Seated Row',
        description: 'Kéo tay về, ép hai bả vai vào nhau và giữ lưng thẳng.',
        assetSrc: '/videos/Thu3/Seated row.mp4',
      },
      {
        title: 'Lateral Raise',
        description: 'Nâng tay ngang vai, giữ khuỷu tay hơi cong.',
        assetSrc: '/videos/Thu3/Lateral raise.mp4',
      },
      {
        title: 'Tricep Pushdown',
        description: 'Giữ cùi chỏ cố định để tập trung vào cơ tam đầu.',
        assetSrc: '/videos/Thu3/Tricep pushdown.mp4',
      },
    ],
  },
  {
    day: 'Thứ 4',
    videos: [
      {
        title: 'Stomach Vacuum',
        description: 'Hóp bụng sâu và giữ hơi để siết cơ bụng trong.',
        assetSrc: '/videos/Thu4/Stomach vacuum.mp4',
      },
      {
        title: 'Dead Bug',
        description: 'Giữ lưng dưới bám sàn và thực hiện động tác chậm.',
        assetSrc: '/videos/Thu4/Dead bug.mp4',
      },
    ],
  },
  {
    day: 'Thứ 5',
    videos: [
      {
        title: 'Goblet Squat',
        description: 'Giữ tạ trước ngực và hạ thấp người với lưng thẳng.',
        assetSrc: '/videos/Thu5/Goblet Squat.mp4',
      },
      {
        title: 'Leg Press',
        description: 'Đặt chân đúng vị trí và không khoá gối ở đỉnh.',
        assetSrc: '/videos/Thu5/Leg press.mp4',
      },
      {
        title: 'Walking Lunges',
        description: 'Bước dài và giữ thân người thẳng, gối sau gần chạm sàn.',
        assetSrc: '/videos/Thu5/Walking lunges.mp4',
      },
    ],
  },
  {
    day: 'Thứ 6',
    videos: [
      {
        title: 'Glute Bridge',
        description: 'Đẩy hông lên cao và siết mông kỹ ở đỉnh.',
        assetSrc: '/videos/Thu6/Glute bridge.mp4',
      },
      {
        title: 'Donkey Kicks',
        description: 'Giữ lưng thẳng, đá chân lên và siết mông mỗi lần.',
        assetSrc: '/videos/Thu6/Donkey kicks.mp4',
      },
      {
        title: 'Fire Hydrant',
        description: 'Mở chân sang ngang để tập cơ mông nhánh ngoài.',
        assetSrc: '/videos/Thu6/Fire hydrant.mp4',
      },
    ],
  },
  {
    day: 'Thứ 7',
    videos: [
      {
        title: 'Child’s Pose',
        description: 'Thư giãn lưng dưới và mông sau một tuần tập nặng.',
        assetSrc: '/videos/Thu7/Child’s Pose.png',
      },
      {
        title: 'Cobra Stretch',
        description: 'Mở rộng lưng, căng cơ bụng và hông nhẹ nhàng.',
        assetSrc: '/videos/Thu7/Cobra Stretch.png',
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
        description: '2 quả trứng ốp la, 1/2 ổ bánh mì đen và dưa leo.',
        preparation: 'Chiên trứng với ít dầu, nướng bánh mì đen và thêm dưa leo tươi.',
        alternatives: ['Bánh mì nguyên cám + trứng luộc', 'Yến mạch + chuối'],
        nutrition: { calories: '410 kcal', protein: '22g', carbs: '38g', fat: '18g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Ức gà kho tiêu, cơm gạo lứt và canh rau muống.',
        preparation: 'Ướp ức gà với tỏi, tiêu và nước mắm nhẹ, kho chín; phục vụ với cơm gạo lứt và canh rau muống.',
        alternatives: ['Thịt gà luộc + rau luộc', 'Cá basa kho + khoai lang luộc'],
        nutrition: { calories: '520 kcal', protein: '36g', carbs: '50g', fat: '15g' },
      },
      {
        name: 'Bữa tối',
        description: 'Cá basa kho tộ, rau cải xào tỏi và khoai lang luộc.',
        preparation: 'Kho cá basa với hành, tỏi, nước dừa; xào rau cải và luộc khoai lang.',
        alternatives: ['Thịt lợn xào rau cải + cơm', 'Đậu hũ kho + rau luộc'],
        nutrition: { calories: '470 kcal', protein: '32g', carbs: '42g', fat: '16g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Sữa chua không đường và 1 quả chuối.',
        preparation: 'Ăn sữa chua với chuối cắt lát.',
        alternatives: ['Táo + hạt hướng dương', 'Trái cây tươi'],
        nutrition: { calories: '180 kcal', protein: '8g', carbs: '30g', fat: '4g' },
      },
    ],
  },
  {
    day: 'Thứ 3',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Bánh mì đen với trứng luộc và cà chua.',
        preparation: 'Nướng bánh mì, luộc trứng và thêm cà chua thái lát.',
        alternatives: ['Cháo yến mạch + trái cây', 'Sữa chua + hạt ngũ cốc'],
        nutrition: { calories: '390 kcal', protein: '20g', carbs: '36g', fat: '14g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Thịt lợn nạc xào rau cải và cơm gạo lứt.',
        preparation: 'Xào thịt lợn nạc với rau cải, cà rốt và hành; dùng với cơm gạo lứt.',
        alternatives: ['Ức gà xào rau củ', 'Cá basa nướng + rau luộc'],
        nutrition: { calories: '520 kcal', protein: '34g', carbs: '50g', fat: '16g' },
      },
      {
        name: 'Bữa tối',
        description: 'Canh bí đỏ với đậu phụ và rau muống luộc.',
        preparation: 'Nấu canh bí đỏ, thêm đậu phụ và phục vụ cùng rau muống luộc.',
        alternatives: ['Cá cơm kho + rau luộc', 'Gà luộc + cải bó xôi'],
        nutrition: { calories: '430 kcal', protein: '24g', carbs: '40g', fat: '14g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Hạt hướng dương và 1 quả lê.',
        preparation: 'Ăn hạt hướng dương rang nhẹ cùng lê tươi.',
        alternatives: ['Hạt điều + táo', 'Sữa đậu nành'],
        nutrition: { calories: '190 kcal', protein: '6g', carbs: '22g', fat: '10g' },
      },
    ],
  },
  {
    day: 'Thứ 4',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Yến mạch với trứng luộc và rau xà lách.',
        preparation: 'Pha yến mạch với nước nóng, ăn kèm trứng luộc và xà lách.',
        alternatives: ['Bánh mì nguyên cám + bơ đậu phộng', 'Cháo yến mạch + chuối'],
        nutrition: { calories: '400 kcal', protein: '22g', carbs: '45g', fat: '12g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Thịt lợn quay nhẹ, canh rau muống và cơm gạo lứt.',
        preparation: 'Quay thịt lợn nạc nhẹ nhàng, nấu canh rau muống và dùng cơm gạo lứt.',
        alternatives: ['Cá basa kho + rau luộc', 'Gà luộc + khoai lang'],
        nutrition: { calories: '520 kcal', protein: '34g', carbs: '48g', fat: '16g' },
      },
      {
        name: 'Bữa tối',
        description: 'Canh cải chua nấu cá, salad dưa leo và ít khoai lang luộc.',
        preparation: 'Nấu canh cải chua với cá, trộn salad dưa leo và luộc khoai lang.',
        alternatives: ['Đậu hũ hấp + rau luộc', 'Gà xào rau củ'],
        nutrition: { calories: '430 kcal', protein: '30g', carbs: '42g', fat: '14g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Sữa chua không đường với hạt điều.',
        preparation: 'Trộn sữa chua với hạt điều và chút mật ong.',
        alternatives: ['Dưa leo + hummus', 'Quả táo'],
        nutrition: { calories: '200 kcal', protein: '12g', carbs: '16g', fat: '10g' },
      },
    ],
  },
  {
    day: 'Thứ 5',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Bánh mì nguyên cám với ức gà nướng và cà chua.',
        preparation: 'Nướng ức gà, kẹp cùng bánh mì nguyên cám và cà chua.',
        alternatives: ['Yến mạch + trứng luộc', 'Smoothie chuối + sữa hạt'],
        nutrition: { calories: '430 kcal', protein: '28g', carbs: '38g', fat: '16g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Gà chiên ít dầu cùng khoai lang và rau cải xào.',
        preparation: 'Chiên gà trong nồi không dầu, luộc khoai lang và xào rau cải.',
        alternatives: ['Cá basa nướng + rau luộc', 'Thịt lợn luộc + salad'],
        nutrition: { calories: '520 kcal', protein: '36g', carbs: '48g', fat: '16g' },
      },
      {
        name: 'Bữa tối',
        description: 'Canh rau cải với thịt bằm và cơm gạo lứt.',
        preparation: 'Nấu canh rau cải với thịt lợn bằm, dùng với cơm gạo lứt vừa đủ.',
        alternatives: ['Cá kho + canh chua', 'Gà luộc + rau luộc'],
        nutrition: { calories: '450 kcal', protein: '32g', carbs: '40g', fat: '16g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Chuối và hạt hướng dương.',
        preparation: 'Ăn chuối và hạt hướng dương rang nhẹ.',
        alternatives: ['Táo + hạt điều', 'Sữa chua nhẹ'],
        nutrition: { calories: '190 kcal', protein: '6g', carbs: '38g', fat: '8g' },
      },
    ],
  },
  {
    day: 'Thứ 6',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Phở gà nhẹ với nhiều rau thơm.',
        preparation: 'Nấu phở gà với nước dùng thanh, nhiều rau thơm và ít bánh phở.',
        alternatives: ['Bún gà luộc', 'Bánh mì ốp la'],
        nutrition: { calories: '420 kcal', protein: '26g', carbs: '45g', fat: '12g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Thịt lợn nạc xào rau cải và cơm gạo lứt.',
        preparation: 'Xào thịt lợn với rau cải, nước mắm và tiêu; ăn với cơm gạo lứt.',
        alternatives: ['Gà xào nấm + rau luộc', 'Cá basa hấp + rau cải'],
        nutrition: { calories: '520 kcal', protein: '34g', carbs: '50g', fat: '16g' },
      },
      {
        name: 'Bữa tối',
        description: 'Cá trắng hấp với cải bó xôi và khoai lang nướng.',
        preparation: 'Hấp cá trắng với gừng, nướng khoai lang và luộc cải bó xôi.',
        alternatives: ['Cá basa hấp + rau muống luộc', 'Đậu hũ hấp + salad'],
        nutrition: { calories: '450 kcal', protein: '34g', carbs: '38g', fat: '14g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Cam và sữa đậu nành.',
        preparation: 'Ăn cam và uống sữa đậu nành ít đường.',
        alternatives: ['Táo + hạt hạnh nhân', 'Sữa chua nhẹ'],
        nutrition: { calories: '190 kcal', protein: '8g', carbs: '30g', fat: '6g' },
      },
    ],
  },
  {
    day: 'Thứ 7',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Yến mạch với sữa và trái cây nhẹ.',
        preparation: 'Pha yến mạch với sữa, thêm chuối hoặc táo cắt lát.',
        alternatives: ['Sinh tố chuối + bơ đậu phộng', 'Bánh mì nguyên cám + trứng'],
        nutrition: { calories: '420 kcal', protein: '16g', carbs: '48g', fat: '14g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Thịt lợn hấp, rau muống xào tỏi và cơm gạo lứt.',
        preparation: 'Hấp thịt lợn nạc, xào rau muống với tỏi và dùng cơm gạo lứt.',
        alternatives: ['Gà luộc + rau luộc', 'Cá basa nướng + salad'],
        nutrition: { calories: '520 kcal', protein: '34g', carbs: '48g', fat: '16g' },
      },
      {
        name: 'Bữa tối',
        description: 'Cá basa hấp với canh bí đỏ và rau cải luộc.',
        preparation: 'Hấp cá basa, nấu canh bí đỏ và luộc rau cải.',
        alternatives: ['Canh rau muống + đậu phụ', 'Gà xào cực ít dầu + rau củ'],
        nutrition: { calories: '450 kcal', protein: '32g', carbs: '36g', fat: '16g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Trái cây tươi theo mùa.',
        preparation: 'Ăn trực tiếp trái cây tươi như táo, cam, xoài chua.',
        alternatives: ['Chuối + hạt hướng dương', 'Sữa chua nhẹ'],
        nutrition: { calories: '180 kcal', protein: '4g', carbs: '38g', fat: '2g' },
      },
    ],
  },
  {
    day: 'Chủ nhật',
    meals: [
      {
        name: 'Bữa sáng',
        description: 'Bánh mì nguyên cám với trứng ốp la và rau sống.',
        preparation: 'Nướng bánh mì, ốp la trứng và ăn kèm rau sống.',
        alternatives: ['Yến mạch + trứng luộc', 'Bánh mì bơ + chuối'],
        nutrition: { calories: '400 kcal', protein: '18g', carbs: '42g', fat: '14g' },
      },
      {
        name: 'Bữa trưa',
        description: 'Gà luộc, khoai lang luộc và rau cải luộc.',
        preparation: 'Luộc gà với gừng, luộc khoai lang và rau cải.',
        alternatives: ['Thịt lợn nạc hấp + rau luộc', 'Cá basa hấp + rau muống'],
        nutrition: { calories: '510 kcal', protein: '36g', carbs: '52g', fat: '12g' },
      },
      {
        name: 'Bữa tối',
        description: 'Canh rau muống, đậu phụ và salad rau.' ,
        preparation: 'Nấu canh rau muống, hấp đậu phụ và trộn salad nhẹ.',
        alternatives: ['Canh cải + gà xé', 'Súp rau củ + cá hấp'],
        nutrition: { calories: '360 kcal', protein: '18g', carbs: '32g', fat: '12g' },
      },
      {
        name: 'Bữa phụ',
        description: 'Trái cây tươi và 1 quả chuối.',
        preparation: 'Ăn trái cây theo mùa cùng chuối.',
        alternatives: ['Táo + hạt ngũ cốc', 'Sữa chua nhẹ'],
        nutrition: { calories: '200 kcal', protein: '5g', carbs: '42g', fat: '4g' },
      },
    ],
  },
]

const adviceByDay: AdviceItem[] = [
  {
    day: 'Thứ 2',
    summary: 'Khởi động và giãn cơ cho bài tập mông, hông và đùi trước khi vào buổi tập nặng.',
    details: [
      'Xoay hông: Đứng thẳng, hai tay chống hông, xoay hông theo vòng tròn rộng từ trái sang phải 10 lần rồi đổi chiều để làm trơn khớp hông.',
      'Đá chân lăng: Đứng cạnh tường làm điểm tựa, đá chân ra trước và sau như con lắc đồng hồ. Thực hiện 15 lần mỗi bên để làm nóng đùi sau.',
      'Squat không tạ: Đứng hai chân rộng bằng vai, hạ mông xuống như sắp ngồi vào ghế rồi đứng lên. Làm 15 lần để đánh thức cơ mông.',
      'Đẩy mông sang ngang: Đứng rộng chân, từ từ hạ trọng tâm sang chân trái rồi sang chân phải để giãn nhẹ đùi trong.',
    ],
  },
  {
    day: 'Thứ 3',
    summary: 'Lời khuyên khởi động cho lưng và vai, giúp bạn vào bài lưng tay chuẩn và an toàn hơn.',
    details: [
      'Xoay cánh tay: Dang hai tay ngang vai, xoay thành các vòng tròn nhỏ từ trong ra ngoài và ngược lại, mỗi chiều 20 vòng.',
      'Ép bả vai: Đứng thẳng, tưởng tượng bạn đang kẹp một cây bút giữa hai bả vai. Giữ 2 giây rồi thả ra, làm 10 lần.',
      'Vặn mình nhẹ nhàng: Đứng thẳng, xoay thân người trên sang trái rồi sang phải để làm nóng cột sống.',
      'Đẩy vai không tạ: Giơ tay lên cao qua đầu, sau đó kéo xuống sao cho khuỷu tay sát sườn.',
    ],
  },
  {
    day: 'Thứ 4',
    summary: 'Kích hoạt vùng core và eo trước khi bắt đầu các bài tập bụng và eo.',
    details: [
      'Tư thế Con Mèo - Con Bò: Quỳ 4 chân, hít vào thì võng lưng, thở ra thì cong lưng lên trời. Làm 10 lần để giãn lưng.',
      'Gồng bụng lấy hơi: Nằm ngửa, hít sâu bằng mũi, hóp bụng sâu và giữ 5 giây.',
      'Co chân chạm tay: Nằm ngửa, lần lượt co từng đầu gối về phía ngực, hai tay ôm và kéo sát gần người.',
      'Giữ lưng dưới dính sàn khi tập core để bảo vệ cột sống.',
    ],
  },
  {
    day: 'Thứ 5',
    summary: 'Đánh thức mông và đùi trước buổi tập nặng bằng các động tác bật nhịp và mở hông.',
    details: [
      'Bước dài (lunge): Bước một chân lên trước một bước rộng, hạ đầu gối chân sau xuống gần chạm sàn rồi đứng lên. Mỗi chân 10 lần.',
      'Cầu mông nằm ngửa: Nằm ngửa, co gối, đẩy hông lên cao và siết chặt mông ở đỉnh.',
      'Mở rộng hông: Quỳ 4 chân, nhấc một chân sang ngang như tư thế chó, giữ 1 giây rồi hạ xuống.',
      'Tập trung cảm nhận cơ mông chứ không chỉ di chuyển chân.',
    ],
  },
  {
    day: 'Thứ 6',
    summary: 'Làm nóng toàn thân với cardio nhẹ và kích hoạt mông phục hồi năng động.',
    details: [
      'Chạy bộ tại chỗ: Chạy nhẹ nhàng 2 phút để nhịp tim và thân nhiệt tăng lên.',
      'Nâng cao đùi: Đứng tại chỗ, đưa đầu gối lên cao ngang bụng trong 30 giây.',
      'Nhảy vung tay: Nhảy bật hai chân sang ngang kết hợp vỗ tay qua đầu. Làm 20 lần để toàn thân linh hoạt.',
      'Giữ nhịp thở đều và không gắng sức quá mức.',
    ],
  },
  {
    day: 'Thứ 7',
    summary: 'Giãn cơ phục hồi sau 5 ngày tập, ưu tiên cơ mông, đùi và lưng dưới.',
    details: [
      'Ép mông tư thế ngồi: Ngồi trên sàn, một chân duỗi thẳng, chân kia vắt qua, kéo đầu gối sát ngực và xoay người ra sau. Giữ 30 giây mỗi bên.',
      'Giãn đùi sau: Ngồi bệt, gập người về phía trước và cố chạm vào mũi bàn chân.',
      'Tư thế Đứa Trẻ: Quỳ gối, ngồi lên gót chân và bò dài hai tay về phía trước, trán chạm sàn.',
      'Giãn cơ bụng: Nằm sấp, chống tay xuống sàn và đẩy ngực lên cao, mắt nhìn thẳng.',
    ],
  },
  {
    day: 'Chủ nhật',
    summary: 'Nghỉ ngơi hoàn toàn, hồi phục cơ thể và duy trì thói quen thở, uống nước.',
    details: [
      'Đi bộ nhẹ: Đi bộ thư giãn 15-20 phút để tăng lưu thông máu.',
      'Uống đủ nước: Giữ lượng nước đều trong ngày để hỗ trợ phục hồi.',
      'Giãn cơ nhẹ: Thực hiện vài động tác giãn nhẹ cho lưng dưới và đùi.',
      'Chuẩn bị tâm lý cho buổi tập Thứ 2 tuần mới.',
    ],
  },
]



function generateLocalAIReply(message: string): ChatbotReply {
  const prompt = message.toLowerCase()
  if (prompt.includes('mông') || prompt.includes('đùi') || prompt.includes('squat') || prompt.includes('hip')) {
    return {
      text: 'Để mông săn chắc, hãy tập trung vào các bài như hip thrust, goblet squat và glute bridge. Mỗi hiệp nên thực hiện chậm, siết mông ở đỉnh động tác, và tăng tạ dần khi bạn đã quen. Nếu muốn, bạn có thể hỏi thêm về cách điều chỉnh cường độ hoặc cách kết hợp các bài phụ.',
      fallback: true,
    }
  }
  if (prompt.includes('eo') || prompt.includes('bụng') || prompt.includes('gập bụng') || prompt.includes('plank')) {
    return {
      text: 'Để eo thon và bụng săn chắc, kết hợp plank, leg raise và russian twist trong buổi tập core. Giữ cột sống thẳng, hạ chân/chuyển động chậm để cơ bụng nhận tải tốt hơn. Ngoài ra, kiểm soát dinh dưỡng và tránh ăn quá nhiều tinh bột vào buổi tối sẽ giúp vòng eo rõ nét hơn.',
      fallback: true,
    }
  }
  if (prompt.includes('ăn') || prompt.includes('dinh dưỡng') || prompt.includes('calo') || prompt.includes('thực đơn') || prompt.includes('ăn gì')) {
    return {
      text: 'Chế độ ăn nên tập trung vào protein nạc, rau xanh, carb phức hợp và chất béo tốt. Giữ 4-5 bữa nhỏ mỗi ngày, ưu tiên thực phẩm nguyên chất và giảm đồ ngọt. Nếu bạn muốn, tôi có thể gợi ý một thực đơn chi tiết theo từng ngày hoặc các món thay thế khi không có nguyên liệu.',
      fallback: true,
    }
  }
  if (prompt.includes('ngủ') || prompt.includes('phục hồi') || prompt.includes('mệt') || prompt.includes('đau cơ')) {
    return {
      text: 'Phục hồi rất quan trọng. Ngủ đủ 7-8 tiếng mỗi đêm, uống nhiều nước và dành thời gian giãn cơ nhẹ sau mỗi buổi tập. Nếu cơ bắp đau nhức, hãy giảm cường độ và tập yoga nhẹ hoặc đi bộ để hỗ trợ phục hồi.',
      fallback: true,
    }
  }
  if (prompt.includes('cardio') || prompt.includes('tim') || prompt.includes('mỡ') || prompt.includes('đốt mỡ')) {
    return {
      text: 'Cardio nhẹ 20-25 phút như đi bộ nhanh, chạy bộ chậm hoặc elliptical là lựa chọn tốt. Giữ nhịp tim ổn định, không quá gắng sức, và kết hợp với tạ nếu mục tiêu của bạn là giảm mỡ nhưng vẫn giữ cơ săn chắc.',
      fallback: true,
    }
  }

  if (prompt.includes('lịch') || prompt.includes('kế hoạch') || prompt.includes('buổi tập') || prompt.includes('ngày')) {
    return {
      text: 'Bạn đang theo lịch tập cân đối với mông, eo và phục hồi. Nếu muốn, tôi có thể giúp bạn tối ưu lại lịch theo mục tiêu giảm mỡ, tăng cơ hoặc tập nhẹ vào ngày phục hồi.',
      fallback: true,
    }
  }

  return {
    text: 'Mình thấy bạn đang tìm kiếm lời khuyên rõ ràng. Hãy nói cho mình biết bạn muốn ưu tiên gì: tăng cơ, eo thon, mông săn chắc, giảm mỡ hay phục hồi, để mình trả lời chi tiết hơn.',
    fallback: true,
  }
}

const CHAT_SERVICE_MODEL = 'meta-llama/Llama-3.1-8B-Instruct'

async function fetchChatbotReply(message: string): Promise<ChatbotReply> {
  try {
    const response = await fetch(CHAT_SERVICE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_SERVICE_MODEL,
        inputs: message,
        parameters: {
          temperature: 0.75,
          top_p: 0.9,
        },
      }),
    })

    const textResponse = await response.text()
    const jsonData = response.headers.get('content-type')?.includes('application/json')
      ? JSON.parse(textResponse || '{}')
      : {}

    if (!response.ok) {
      const errorMessage = jsonData?.error || textResponse || `HTTP ${response.status}`
      throw new Error(errorMessage)
    }

    const text = await parseAIResponseData(jsonData)
    if (typeof text === 'string' && text.trim()) {
      return { text: text.trim(), fallback: false }
    }

    throw new Error('Phản hồi AI không hợp lệ')
  } catch (err) {
    const errorText = err instanceof Error ? err.message : String(err)
    return {
      ...generateLocalAIReply(message),
      fallback: true,
      error: `Không gọi được API backend: ${errorText}`,
    }
  }
}
console.log("MODEL FE:", CHAT_SERVICE_MODEL);
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
  const [selectedAdvice, setSelectedAdvice] = useState<AdviceItem | null>(null)
  const [expandedVideoDay, setExpandedVideoDay] = useState<string | null>(null)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const bmi = useMemo(() => {
    return (profile.weight / (profile.height * profile.height)).toFixed(1)
  }, [])

  const calorieTarget = useMemo(() => 1650, [])

  const openScheduleDay = (day: string) => {
    const item = weeklySchedule.find((schedule) => schedule.day === day)
    if (item) {
      setSelectedDay(item)
    }
  }

  const isImageAsset = (src: string) => /\.(png|jpe?g|gif|webp|avif)$/i.test(src)
  const getAssetUrl = (src: string) => {
    const baseUrl = import.meta.env.BASE_URL || '/'
    const normalizedPath = src.startsWith('/') ? src.slice(1) : src
    return `${baseUrl}${encodeURI(normalizedPath)}`
  }

  const toggleVideoDay = (day: string) => {
    setExpandedVideoDay((current) => (current === day ? null : day))
  }

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
      const reply = await fetchChatbotReply(trimmed)
      const botMessage: ChatMessage = {
        sender: 'assistant',
        text: reply.text,
        createdAt: now,
      }
      setChatMessages((prev) => [...prev, botMessage])
      if (reply.fallback) {
        setError(reply.error ?? 'Hugging Face không khả dụng, đang dùng trả lời nội bộ thay thế.')
      }
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
            <p className="hero-tag">Tập Luyện & Dinh Dưỡng</p>
            <h1>Tập ik con nợn</h1>
            <p className="hero-text">Tối ưu lịch tập, chế độ ăn và trợ lý AI để đạt kết quả nhanh hơn.</p>
            <div className="hero-stats">
              <div className="stat-card">
                <span>Chu kỳ</span>
                <strong>7 ngày</strong>
              </div>
              <div className="stat-card">
                <span>Buổi/tuần</span>
                <strong>5-6 buổi</strong>
              </div>
              <div className="stat-card">
                <span>Calo</span>
                <strong>{calorieTarget} kcal</strong>
              </div>
            </div>
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
          <PageButton label="Video hướng dẫn" active={page === 'videos'} onClick={() => setPage('videos')} />
          <PageButton label="Khởi động" active={page === 'advice'} onClick={() => setPage('advice')} />
          <PageButton label="Chat với AI" active={page === 'analysis'} onClick={() => setPage('analysis')} />
        </nav>

        <main className="page-content">
          {page === 'schedule' && (
            <section className="page-card schedule-card">
              <h2>Thời khóa biểu tập luyện</h2>
              <p className="page-description">Lịch tập 5-7 bài/buổi, mỗi buổi ~60 phút theo phong cách PT xịn để tối ưu mông, eo và săn chắc.</p>
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

          {page === 'videos' && (
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
                            <button className="link-schedule-button" onClick={() => openScheduleDay(day.day)}>
                              Xem hướng dẫn chi tiết
                            </button>
                            <button className="hide-button" onClick={() => setExpandedVideoDay(null)}>
                              Ẩn
                            </button>
                          </div>
                        </div>
                      )}
                    </section>
                  )
                })}
              </div>
            </section>
          )}

          {page === 'advice' && (
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
                    <button className="link-schedule-button" onClick={() => setSelectedAdvice(item)}>
                      Xem chi tiết
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}
          {selectedAdvice && (
            <div className="schedule-modal-backdrop" onClick={() => setSelectedAdvice(null)}>
              <div className="schedule-modal" onClick={(event) => event.stopPropagation()}>
                <button className="modal-close" onClick={() => setSelectedAdvice(null)} aria-label="Đóng chi tiết">
                  ×
                </button>
                <h3>Khởi động chi tiết cho {selectedAdvice.day}</h3>
                <p className="schedule-detail-intro">
                  {selectedAdvice.summary}
                </p>
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

          {page === 'analysis' && (
            <section className="page-card chat-card">
              <div className="chat-header">
                <div>
                  <h2>Chat trực tiếp với trợ lý AI</h2>
                  <p className="page-description">Trò chuyện ngay để nhận phân tích, điều chỉnh lịch và lời khuyên cá nhân hóa.</p>
                </div>
                <span className="chat-status-badge">Hugging Face</span>
              </div>

              <div className="chat-window">
                {chatMessages.length === 0 ? (
                  <div className="chat-empty">Bắt đầu chat với trợ lý AI để nhận lời khuyên ngay.</div>
                ) : (
                  chatMessages.map((message, index) => (
                    <div key={`${message.sender}-${index}`} className={`chat-bubble ${message.sender}`}>
                      <div className="bubble-meta">
                        <span className="bubble-role">{message.sender === 'user' ? 'Bạn' : 'Trợ lý'}</span>
                        <span>{message.createdAt}</span>
                      </div>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                    </div>
                  ))
                )}
              </div>

              <form className="chat-form" onSubmit={handleSendMessage}>
                <textarea
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Hỏi về buổi tập, chế độ ăn hoặc cách phục hồi..."
                  rows={4}
                />
                <div className="chat-action-row">
                  <button type="submit" className="cta-button" disabled={loading}>
                    {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </button>
                </div>
              </form>

              <div className="chat-hint">Ứng dụng chỉ dùng Hugging Face router. Token HF cần quyền Inference Providers. Nếu HF không dùng được thì sẽ dùng phản hồi nội bộ.</div>
              {error && <div className="error-box">{error}</div>}
            </section>
          )}
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
        </main>
      </div>
    </div>
  )
}

export default App
