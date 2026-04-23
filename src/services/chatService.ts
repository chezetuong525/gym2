import type { AIResponse, ChatbotReply } from '../types'

const CHAT_SERVICE_URL = (import.meta.env.VITE_CHAT_BACKEND_URL ?? 'https://api-gym-1-l2ip.onrender.com')
  .replace(/\/+$/g, '')

const CHAT_SERVICE_PATH = import.meta.env.VITE_CHAT_BACKEND_PATH ?? '/api/hf'

const CHAT_SERVICE_ENDPOINT = `${CHAT_SERVICE_URL}${
  CHAT_SERVICE_PATH.startsWith('/') ? CHAT_SERVICE_PATH : `/${CHAT_SERVICE_PATH}`
}`

export const CHAT_SERVICE_MODEL = 'meta-llama/Llama-3.1-8B-Instruct'
console.log('MODEL FE:', CHAT_SERVICE_MODEL)

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

export async function fetchChatbotReply(message: string): Promise<ChatbotReply> {
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
