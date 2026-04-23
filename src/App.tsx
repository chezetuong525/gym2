import { useMemo, useState } from 'react'
import './App.css'
import type { Page, TrainingType, WeeklyItem, DietItem, AdviceItem, ChatMessage } from './types'
import type { SubMenu } from './components/PageButton'
import {
  profile,
  weeklySchedule,
  weeklyScheduleHome,
  videoGuideByDay,
  videoGuideByDayHome,
  dietPlan,
  adviceByDay,
  adviceByDayHome,
  exerciseGuides,
} from './data'
import PageButton from './components/PageButton'
import ScheduleSection from './components/ScheduleSection'
import DietSection from './components/DietSection'
import VideosSection from './components/VideosSection'
import AdviceSection from './components/AdviceSection'
import ChatSection from './components/ChatSection'
import { fetchChatbotReply } from './services/chatService'

function App() {
  const [page, setPage] = useState<Page>('schedule')
  const [trainingType, setTrainingType] = useState<TrainingType>('gym')
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

  // Get the appropriate schedule based on training type
  const currentSchedule = trainingType === 'gym' ? weeklySchedule : weeklyScheduleHome
  const currentVideos = trainingType === 'gym' ? videoGuideByDay : videoGuideByDayHome
  const currentAdvice = trainingType === 'gym' ? adviceByDay : adviceByDayHome

  const scheduleMenus: SubMenu[] = [
    { id: 'gym', label: 'Tập tại Gym', value: 'gym' },
    { id: 'home', label: 'Tập tại nhà (Dây kháng lực)', value: 'home' },
  ]

  const videosMenus: SubMenu[] = [
    { id: 'gym', label: 'Video Gym', value: 'gym' },
    { id: 'home', label: 'Video Tập tại nhà', value: 'home' },
  ]

  const adviceMenus: SubMenu[] = [
    { id: 'gym', label: 'Khởi động Gym', value: 'gym' },
    { id: 'home', label: 'Khởi động Tập tại nhà', value: 'home' },
  ]

  const handleScheduleTypeSelect = (type: string) => {
    setTrainingType(type as TrainingType)
    setPage('schedule')
    setSelectedDay(null)
  }

  const handleVideoTypeSelect = (type: string) => {
    setTrainingType(type as TrainingType)
    setPage('videos')
  }

  const handleAdviceTypeSelect = (type: string) => {
    setTrainingType(type as TrainingType)
    setPage('advice')
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
            <p className="hero-text">
              Tối ưu lịch tập, chế độ ăn và trợ lý AI để đạt kết quả nhanh hơn.
            </p>
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
          <PageButton
            label="Thời khóa biểu"
            active={page === 'schedule'}
            subMenus={scheduleMenus}
            onSubMenuClick={handleScheduleTypeSelect}
            onClick={() => setPage('schedule')}
          />
          <PageButton label="Chế độ ăn" active={page === 'diet'} onClick={() => setPage('diet')} />
          <PageButton
            label="Video hướng dẫn"
            active={page === 'videos'}
            subMenus={videosMenus}
            onSubMenuClick={handleVideoTypeSelect}
            onClick={() => setPage('videos')}
          />
          <PageButton
            label="Khởi động"
            active={page === 'advice'}
            subMenus={adviceMenus}
            onSubMenuClick={handleAdviceTypeSelect}
            onClick={() => setPage('advice')}
          />
          <PageButton
            label="Chat với AI"
            active={page === 'analysis'}
            onClick={() => setPage('analysis')}
          />
        </nav>

        <main className="page-content">
          {page === 'schedule' && (
            <ScheduleSection
              weeklySchedule={currentSchedule}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
              onCloseDay={() => setSelectedDay(null)}
            />
          )}

          {page === 'diet' && (
            <DietSection
              dietPlan={dietPlan}
              selectedDiet={selectedDiet}
              onSelectDiet={setSelectedDiet}
              onCloseDiet={() => setSelectedDiet(null)}
            />
          )}

          {page === 'videos' && (
            <VideosSection
              videoGuideByDay={currentVideos}
              weeklySchedule={currentSchedule}
              expandedVideoDay={expandedVideoDay}
              toggleVideoDay={toggleVideoDay}
              exerciseGuides={exerciseGuides}
            />
          )}

          {page === 'advice' && (
            <AdviceSection
              adviceByDay={currentAdvice}
              selectedAdvice={selectedAdvice}
              onSelectAdvice={setSelectedAdvice}
              onCloseAdvice={() => setSelectedAdvice(null)}
            />
          )}

          {page === 'analysis' && (
            <ChatSection
              chatMessages={chatMessages}
              chatInput={chatInput}
              onChatInputChange={setChatInput}
              onSendMessage={handleSendMessage}
              loading={loading}
              error={error}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
