export type ExerciseGuideDetail = {
  name: string
  group: 'lower' | 'upper' | 'core' | 'warmup'
  summary: string
  instructions: string[]
  tips: string[]
  bandType?: string
  bandWeight?: string
}

export const exerciseGuides: ExerciseGuideDetail[] = [
  // WARMUP - KHỞI ĐỘNG
  {
    name: 'Khởi động chi tiết',
    group: 'warmup',
    summary: 'Tập trung xoay tròn các khớp từ đầu đến chân, đặc biệt cổ tay và vai.',
    instructions: [
      'Xoay cổ tay: Duỗi tay ra trước, xoay cổ tay theo vòng tròn 10 vòng mỗi chiều',
      'Xoay vai: Dang tay ngang, xoay vai từ trước lên sau 10 vòng, sau đó từ sau lên trước 10 vòng',
      'Xoay cánh tay: Tay sát sườn, xoay cánh tay từ trong ra ngoài 15 vòng, rồi ngoài vào trong 15 vòng',
      'Xoay hông: Hai tay chống hông, xoay hông theo vòng tròn rộng 10 vòng trái, 10 vòng phải',
      'Xoay cổ chân: Đứng trên một chân, xoay cổ chân còn lại 10 vòng mỗi chiều, đổi chân',
      'Gập người nhẹ: Đứng thẳng, từ từ gập người về phía trước để xoay lưng (5-10 lần)',
    ],
    tips: [
      'Khi cầm dây kháng lực, các khớp cổ tay và vai chịu áp lực khá lớn nên xoay kỹ',
      'Không nên kéo căng quá sâu trong quá trình khởi động',
      'Thực hiện chậm rãi, kiểm soát từng động tác',
    ],
  },

  // LOWER BODY - MÔNG & ĐÙI
  {
    name: 'Banded Squat',
    group: 'lower',
    summary: 'Squat với dây Mini Band giúp kích hoạt cơ mông và mở rộng gối an toàn.',
    instructions: [
      'Đứng hai chân rộng bằng vai',
      'Đặt dây Mini Band trên đầu gối khoảng 5cm (ngay trên đầu gối, không ở ngoài cẳng)',
      'Hạ người xuống: Đẩy mông ra sau như đang ngồi vào ghế (không võng lưng)',
      'Giữ lưng thẳng, đầu gối mở rộng theo hướng mũi chân (dây kéo gối giữ tư thế)',
      'Hạ đến khi đùi song song với sàn',
      'Đẩy gót chân để đứng dậy, siết mông ở điểm cao nhất',
    ],
    tips: [
      'Đừng để dây kéo gối chụm vào nhau, giữ dây luôn căng',
      'Tập trung cảm nhận cơ mông chịu lực, không chỉ di chuyển chân',
      'Hạ và nâng chậm rãi, kiểm soát động tác (2 giây hạ, 1 giây đứng)',
    ],
    bandType: 'Mini Band',
    bandWeight: '13-18kg',
  },
  {
    name: 'Glute Bridge (Cầu mông)',
    group: 'lower',
    summary: 'Bài tập hạng nặng để kích hoạt toàn bộ cơ mông với sự siết chặt tối đa.',
    instructions: [
      'Nằm ngửa, co gối, hai bàn chân cách vai khoảng 30-40cm',
      'Đặt dây Mini Band trên đầu gối',
      'Dùng lực gót chân đẩy hông lên cao',
      'Khi nâng lên, tạo thành đường thẳng từ vai đến đầu gối',
      'Siết chặt mông ở điểm cao nhất trong 2 giây (cảm nhận cơ ép chặt)',
      'Hạ xuống chậm rãi theo kiểm soát trong 2-3 giây',
    ],
    tips: [
      'Đây là bài tập trọng tâm cho mông, dùng dây nặng nhất 18-25kg',
      'Đẩy từ gót chân, không dùng lực mũn đang để hạn chế áp lực lưng dưới',
      'Cảm nhận sự siết chặt của cơ mông ở trên cùng, không chỉ nâng hông',
    ],
    bandType: 'Mini Band',
    bandWeight: '18-25kg',
  },
  {
    name: 'Lateral Walk (Bước ngang)',
    group: 'lower',
    summary: 'Bài tập kích hoạt mông bên và cơ chống xoay (abductor) với lực kháng vừa phải.',
    instructions: [
      'Đứng tư thế nửa Squat: hơi khuỵu gối, mông ra sau, lưng thẳng',
      'Đặt dây Mini Band quanh cổ chân hoặc trên gối',
      'Bước một chân sang ngang một khoảng rộng (khoảng 30-40cm)',
      'Chân kia bước theo đó, luôn giữ dây có độ căng (không khép sát)',
      'Bước 10 bước sang trái, sau đó 10 bước ngược lại (quay 180 độ và bước về)',
      'Đặc biệt: Giữ tư thế nửa Squat suốt quá trình bước',
    ],
    tips: [
      'Bước từ từ, giữ dây căng liên tục (không được nhảy hay gục xuống)',
      'Cảm nhận cơ mông bên kịch hoạt để cân bằng',
      'Lực dây vừa phải (9-13kg) giúp bạn duy trì được quãng đường bước rộng',
    ],
    bandType: 'Mini Band',
    bandWeight: '9-13kg',
  },
  {
    name: 'Donkey Kicks',
    group: 'lower',
    summary: 'Đá chân phía sau để kích hoạt cơ mông với amplitude cao.',
    instructions: [
      'Tư thế quỳ bốn chân: chống tay thẳng, vai ở trên tay, hông ở trên đầu gối',
      'Đặt dây Mini Band trên gối',
      'Giữ nguyên góc độ đầu gối (không duỗi thẳng chân)',
      'Đá một chân lên cao về phía trần nhà, lòng bàn chân hướng lên trên',
      'Siết mông thật chặt khi chân ở trên cao nhất (tạm dừng 1 giây)',
      'Hạ chân xuống từ từ, nhưng không để gối chạm sàn rồi đá lên lại',
    ],
    tips: [
      'Duy trì tư thế quỳ cố định, không để hông lật theo chân',
      'Di chuyển từ khớp hông, không từ đầu gối hoặc lưng',
      'Lực dây nhẹ đến trung bình (5-9kg) để có biên độ động tác đủ rộng',
    ],
    bandType: 'Mini Band',
    bandWeight: '5-9kg',
  },
  {
    name: 'Stiff-Legged Deadlift',
    group: 'lower',
    summary: 'Bài tập kích hoạt cơ mông và đùi sau với lực kháng cao.',
    instructions: [
      'Đứng thẳng, chân tách rộng bằng vai',
      'Giẫm lên giữa dây Long Band, hai tay cầm hai đầu dây',
      'Giữ chân gần như thẳng (chỉ hơi trùng gối nhẹ, không khóa gối)',
      'Gập người tại phần hông, đưa mông ra sau',
      'Hạ tay xuống về phía chân cho đến khi thấy căng ở đùi sau',
      'Dùng cơ mông và đùi sau để kéo người đứng thẳng dậy (không dùng lưng)',
    ],
    tips: [
      'Động tác này tập trung vào đùi sau và mông, không phải lưng dưới',
      'Lưng phải giữ thẳng suốt quá trình, không cong',
      'Lực dây cao (15-22kg) vì cơ đùi sau khá khỏe',
      'Cảm nhận độ căng ở đùi sau, không chỉ di chuyển',
    ],
    bandType: 'Long Band',
    bandWeight: '15-22kg',
  },
  {
    name: 'Fire Hydrant',
    group: 'lower',
    summary: 'Mở chân sang ngang để kích hoạt mông bên và cơ chống xoay.',
    instructions: [
      'Tư thế quỳ bốn chân: chống tay thẳng, vai ở trên tay',
      'Đặt dây Mini Band trên gối',
      'Giữ đầu gối gập (không duỗi thẳng)',
      'Mở một chân sang ngang như tư thế "chú chó", lòng bàn chân hướng lên',
      'Giữ hông cố định không bị lật theo chân (chỉ chân di chuyển)',
      'Mở chân lên cao nhất có thể rồi khép lại (nhưng không để chạm sàn)',
      'Thực hiện 15 lần một bên, sau đó chuyển sang bên kia',
    ],
    tips: [
      'Tập trung vào việc kiểm soát hông, không để nó xoay theo chân',
      'Động tác từ khớp hông, không từ lưng hoặc vai',
      'Di chuyển chậm rãi, tránh thúc mạnh để tăng cảm nhận cơ',
    ],
    bandType: 'Mini Band',
    bandWeight: '5-9kg',
  },
  {
    name: 'Clamshells',
    group: 'lower',
    summary: 'Mở đầu gối ở tư thế nằm nghiêng để kích hoạt mông bên.',
    instructions: [
      'Nằm nghiêng bên phải: vai, hông, chân thẳng hàng',
      'Gập hai đầu gối lại chồng lên nhau (chân từng cái 90 độ)',
      'Đặt dây Mini Band trên gối (ở phía trên)',
      'Giữ hai bàn chân chạm vào nhau (không tách biệt)',
      'Mở đầu gối chân trên lên cao nhất có thể (giống mở vỏ sò)',
      'Khép lại một cách kiểm soát rồi lặp lại',
      'Thực hiện 15 lần một bên, sau đó nằm sang bên trái',
    ],
    tips: [
      'Lưng phải giữ thẳng, không để nó cong hoặc xoay',
      'Di chuyển từ hông, chỉ đầu gối trên mở ra',
      'Lực kháng nhẹ đến trung bình (13-18kg) để có biên độ đủ rộng',
    ],
    bandType: 'Mini Band',
    bandWeight: '13-18kg',
  },

  // UPPER BODY - LƯNG, VAI & TAY
  {
    name: 'Band Over Row',
    group: 'upper',
    summary: 'Kéo lưng: Tập trung vào bả vai xiết chặt ở phía sau.',
    instructions: [
      'Đứng giẫm lên dây Long Band, hai tay cầm hai đầu dây',
      'Gập người về phía trước khoảng 45 độ',
      'Lưng phải giữ thẳng, không cong hay võng',
      'Kéo dây về phía sườn (khuỷu tay sát sườn)',
      'Ở đỉnh kéo: ép hai bả vai sát vào nhau ở phía sau',
      'Hạ xuống chậm rãi dưới kiểm soát',
    ],
    tips: [
      'Tập trung vào chuyển động bả vai, không chỉ di chuyển tay',
      'Lưng phải giữ góc 45 độ suốt quá trình (không để thẳng lên hoặc cong xuống)',
      'Lực kháng trung bình (10-15kg) để tập trung vào kỹ thuật',
    ],
    bandType: 'Long Band',
    bandWeight: '10-15kg',
  },
  {
    name: 'Lat Pulldown',
    group: 'upper',
    summary: 'Kéo xà: Kích hoạt cơ xô (dưới nách) bằng cách kéo từ trên xuống.',
    instructions: [
      'Vòng dây Long Band qua một điểm cao (thanh xà, cánh cửa, hay xà bộng)',
      'Hai tay cầm dây rộng hơn vai (khoảng 120-150cm)',
      'Ngồi xuống hoặc quỳ, ưỡn ngực lên',
      'Kéo dây xuống dưới ngực (không về bụng)',
      'Tập trung vào việc dùng cơ xô để kéo thay vì dùng bắp tay',
      'Ở đỉnh kéo: ép hai bả vai xuống và lùi vào (không bỏ vào tai)',
      'Hạ dây lên từ từ, kiểm soát chuyển động',
    ],
    tips: [
      'Cảm nhận cơ dưới nách kịch hoạt, không chỉ cảm nhận bắp tay',
      'Không nên kéo lên tới cằm (chỉ đến mức ngang ngực)',
      'Lực kháng vừa phải (7-12kg) để giữ được kỹ thuật chính xác',
    ],
    bandType: 'Long Band',
    bandWeight: '7-12kg',
  },
  {
    name: 'Overhead Press',
    group: 'upper',
    summary: 'Đẩy vai: Kích hoạt vai và cơ ngực với lực kháng thấp để bảo vệ khớp vai.',
    instructions: [
      'Đứng giẫm lên một phần dây Long Band (hoặc cả dây).',
      'Hai tay cầm dây đặt ngang vai (cùng chiều cao với vai)',
      'Chuẩn bị: Mõm hơi gập, lưng thẳng',
      'Đẩy tay thẳng lên trời cho đến khi cánh tay thẳng sát tai',
      'Tạm dừng 1 giây ở đỉnh (không khóa khuỷu tay)',
      'Hạ xuống chậm rãi về vị trí ngang vai (cơ kiểm soát)',
    ],
    tips: [
      'Khớp vai dễ chấn thương, ưu tiên luyện kỹ thuật đúng trước tăng lực',
      'Không nên hạ dây quá phía sau đầu (chỉ ngang mũi hoặc ngang vai)',
      'Lực kháng rất nhẹ (3-6kg) để đảm bảo an toàn',
      'Tránh đưa khuỷu tay ra ngoài quá 90 độ',
    ],
    bandType: 'Long Band',
    bandWeight: '3-6kg',
  },
  {
    name: 'Band Pull-Apart',
    group: 'upper',
    summary: 'Cơ vai sau: Tập giãn dây để kích hoạt và làm săn chắc vùng vai sau.',
    instructions: [
      'Đứng thẳng, hai tay cầm dây Long Band mỏng',
      'Tay giơ thẳng trước ngực (tay khoảng 60-80cm cách nhau)',
      'Sử dụng lực vai sau để kéo hai tay sang hai bên',
      'Kéo cho đến khi dây chạm vào ngực và tay mở rộng sang ngang',
      'Tạm dừng 1 giây, cảm nhận sự siết chặt ở vai sau',
      'Trả dây về vị trí trước ngực một cách kiểm soát',
    ],
    tips: [
      'Động tác này chú trọng vào độ bền, không cần năng lực lớn',
      'Dùng lực vai sau kéo, không dùng bắp tay hoặc lưng',
      'Lực kháng nhẹ (3-5kg) vì mục đích là làm săn chắc và phục hồi',
    ],
    bandType: 'Long Band (mỏng)',
    bandWeight: '3-5kg',
  },

  // CORE - BỤNG
  {
    name: 'Bicycle Crunches',
    group: 'core',
    summary: 'Bài bụng: Kéo bụng trong với lực kháng từ dây Mini Band ở lòng bàn chân.',
    instructions: [
      'Nằm ngửa, hai tay đặt phía sau đầu (khuỷu tay hơi mở)',
      'Đặt dây Mini Band vào lòng bàn chân',
      'Co một gối về phía ngực',
      'Đồng thời xoay người để khuỷu tay đối diện chạm vào gối đó',
      'Chân còn lại duỗi thẳng, dây ở lòng bàn chân',
      'Lực kháng của dây ở lòng bàn chân sẽ làm bụng dưới rất mỏi',
      'Đổi bên: hạ người xuống, chân kia co vào lại',
    ],
    tips: [
      'Cảm nhận bụng dưới bị kéo mạnh bởi dây Mini Band',
      'Không nên kéo cổ, động tác gập gối và xoay từ bụng',
      'Lực kháng nhẹ (3-5kg) vì bụng đã mỏi từ lực kháng của dây',
      'Thực hiện chậm, kiểm soát từng động tác',
    ],
    bandType: 'Mini Band',
    bandWeight: '3-5kg',
  },
  {
    name: 'Plank Tap',
    group: 'core',
    summary: 'Tư thế Plank với chạm tay: Gồng core cực mạnh để giữ thăng bằng.',
    instructions: [
      'Tư thế Plank cao (chống tay thẳng): vai ở trên tay, hông ngang với vai',
      'Đặt dây Mini Band vào cổ tay',
      'Giữ lưng và hông cố định (không để hông nhón lên hoặc gục xuống)',
      'Lần lượt nhấc một tay chạm nhẹ ra phía trước hoặc sang ngang (khoảng 10-15cm)',
      'Thu tay về vị trí chống ban đầu',
      'Dây sẽ kéo tay bạn lại, buộc cơ bụng phải gồng rất mạnh để giữ thăng bằng',
      'Đổi tay và lặp lại',
    ],
    tips: [
      'Động tác chạm tay tạo ra mất thăng bằng, cơ core phải gồng để giữ',
      'Không để hông bị lật sang một bên khi chạm tay',
      'Lực kháng trung bình (5-9kg) để tạo ra lực kéo khi chạm tay',
      'Nếu quá khó, bạn có thể bắt đầu từ Plank đầu gối (chống hai tay, đầu gối trên sàn)',
    ],
    bandType: 'Mini Band',
    bandWeight: '5-9kg',
  },

  // COOLDOWN - GIÃN CƠ
  {
    name: 'Giãn cơ toàn bộ sau tập',
    group: 'warmup',
    summary: 'Giãn cơ chi tiết sau tập luyện (5-7 phút) để phục hồi nhanh hơn.',
    instructions: [
      'Giãn mông: Nằm ngửa, bắt chéo một chân lên đầu gối chân kia, kéo đầu gối về phía ngực. Giữ 20-30 giây mỗi bên.',
      'Giãn đùi sau: Ngồi bệt, duỗi hai chân về phía trước, từ từ gập người về phía trước để chạm vào mũi bàn chân. Giữ 20-30 giây.',
      'Giãn tay/vai: Kéo tay ngang ngực qua cơ thể bằng tay kia, giữ 20 giây mỗi bên.',
      'Giãn vai sau: Để tay sau lưng, kéo lên một chút. Hoặc kéo tay qua đầu, cúi người sang một bên. Giữ 20-30 giây.',
      'Tư thế Đứa Trẻ: Quỳ gối, ngồi lên gót chân, để trán chạm sàn, hai tay duỗi về phía trước. Giữ 30-45 giây.,',
    ],
    tips: [
      'Giữ mỗi tư thế giãn cơ (stretch) trong ít nhất 20-30 giây để cơ bắp được phục hồi',
      'Không nên giãn quá mạnh (stretch đến mức cảm nhận, không bị đau)',
      'Thực hiện giãn cơ khi cơ thể còn nóng (sau tập), không nên chờ để cơ bắp nguội đi',
      'Giãn cơ chi tiết giúp cơ bắp không bị đau nhức vào ngày hôm sau',
    ],
  },
]
