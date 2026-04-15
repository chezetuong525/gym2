import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5173
const HF_API_KEY = process.env.VITE_HF_API_KEY || process.env.HF_API_KEY
const HF_ROUTER_URL = 'https://router.huggingface.co/v1/chat/completions'

app.use(cors())
app.use(express.json())

function normalizeChatRequest(body) {
  const model = body.model || 'openai/gpt-oss-120b:fastest'
  let userContent = ''

  if (typeof body.message === 'string') {
    userContent = body.message
  } else if (typeof body.inputs === 'string') {
    userContent = body.inputs
  } else if (Array.isArray(body.inputs)) {
    userContent = body.inputs.join('\n')
  } else if (body.inputs && typeof body.inputs === 'object') {
    if (typeof body.inputs.text === 'string') {
      userContent = body.inputs.text
    } else {
      userContent = JSON.stringify(body.inputs)
    }
  }

  return {
    model,
    messages: [
      { role: 'system', content: 'Bạn là trợ lý tập luyện và dinh dưỡng cho nữ 22 tuổi, 62kg, 1m63. Hãy trả lời thân thiện, cụ thể và dễ hiểu.' },
      { role: 'user', content: userContent },
    ],
    temperature: body.parameters?.temperature ?? 0.75,
    max_new_tokens: body.parameters?.max_new_tokens ?? 450,
    max_tokens: body.parameters?.max_tokens ?? 450,
    top_p: body.parameters?.top_p ?? 0.9,
    stream: false,
  }
}

app.post('/api/chat', async (req, res) => {
  const { message } = req.body
  if (!HF_API_KEY) {
    return res.status(500).json({ error: 'Hugging Face API key is missing in server environment.' })
  }

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing message in request body.' })
  }

  try {
    const response = await fetch(HF_ROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b:fastest',
        messages: [
          { role: 'system', content: 'Bạn là trợ lý tập luyện và dinh dưỡng cho nữ 22 tuổi, 62kg, 1m63. Hãy trả lời thân thiện, cụ thể và dễ hiểu.' },
          { role: 'user', content: message },
        ],
        temperature: 0.75,
        max_new_tokens: 450,
        max_tokens: 450,
        top_p: 0.9,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      return res.status(response.status).json({ error: errorBody || 'Hugging Face API returned an error.' })
    }

    const data = await response.json()
    const text =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      data?.generated_text ||
      data?.text ||
      ''

    return res.json({ text: text.trim() })
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) })
  }
})

app.post('/api/hf', async (req, res) => {
  if (!HF_API_KEY) {
    return res.status(500).json({ error: 'Hugging Face API key is missing in server environment.' })
  }

  const normalized = normalizeChatRequest(req.body)
  if (!normalized.messages?.[1]?.content) {
    return res.status(400).json({ error: 'Missing message or inputs in request body.' })
  }

  try {
    const response = await fetch(HF_ROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalized),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      return res.status(response.status).json({ error: errorBody || 'Hugging Face API returned an error.' })
    }

    const data = await response.json()
    const text =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      data?.generated_text ||
      data?.text ||
      ''

    return res.json({ text: text.trim() })
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) })
  }
})

app.get('/', (req, res) => {
  res.json({
    message: 'Hugging Face proxy API đang hoạt động',
    endpoints: {
      health: '/health',
      inference: '/api/hf',
      chat: '/api/chat',
    },
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/hf', (req, res) => {
  res.json({
    message: 'Gửi POST tới /api/hf với { model, inputs, parameters? } để lấy trả lời từ Hugging Face.',
  })
})

app.get('/api/chat', (req, res) => {
  res.json({
    message: 'Gửi POST tới /api/chat với { message } để gọi chat completion.',
  })
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
