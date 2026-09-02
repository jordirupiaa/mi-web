import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageCircle, Send, X } from 'lucide-react'
import { FAQ_TOPICS, type FaqLanguage } from '../../data/faq'
import { findBestMatch, interpolate, type MatchableEntry } from '../../utils/faqMatcher'
import { BUSINESS_INFO } from '../../data/businessInfo'
import { formatPhoneDisplay } from '../../utils/formatPhone'

interface ChatMessage {
  id: number
  sender: 'bot' | 'user'
  text: string
}

const SUPPORTED_FAQ_LANGUAGES: FaqLanguage[] = ['es', 'en', 'fr', 'ca', 'de', 'it']

function toFaqLanguage(code: string | undefined): FaqLanguage {
  const short = (code ?? 'es').slice(0, 2) as FaqLanguage
  return SUPPORTED_FAQ_LANGUAGES.includes(short) ? short : 'es'
}

export function ChatWidget() {
  const { t, i18n } = useTranslation()
  const lang = toFaqLanguage(i18n.resolvedLanguage)

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const nextId = useRef(1)
  const scrollRef = useRef<HTMLDivElement>(null)

  const contactValues = {
    address: BUSINESS_INFO.address,
    phone: formatPhoneDisplay(BUSINESS_INFO.phone),
    email: BUSINESS_INFO.email,
  }

  // Seed the welcome message once, the first time the widget is opened.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId.current++, sender: 'bot', text: t('chat.welcome') }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const question = input.trim()
    if (!question) return

    const entries: MatchableEntry<string>[] = FAQ_TOPICS.map((topic) => ({
      id: topic.id,
      variants: topic.variants[lang] ?? topic.variants.es,
      data: topic.answer[lang] ?? topic.answer.es,
    }))

    const match = findBestMatch(question, entries)
    const replyTemplate = match ? match.data : t('chat.fallback')
    const reply = interpolate(replyTemplate, contactValues)

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, sender: 'user', text: question },
      { id: nextId.current++, sender: 'bot', text: reply },
    ])
    setInput('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label={t('chat.title')}
          className="flex h-[28rem] max-h-[75dvh] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-warmwhite shadow-lifted ring-1 ring-sand-200"
        >
          <div className="flex items-center justify-between bg-charcoal-800 px-5 py-4">
            <div>
              <p className="font-display text-base text-warmwhite">{t('chat.title')}</p>
              <p className="text-xs text-sand-200/70">{t('chat.subtitle')}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('chat.closeLabel')}
              className="flex h-8 w-8 items-center justify-center rounded-full text-warmwhite/80 hover:bg-warmwhite/10 hover:text-warmwhite"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.sender === 'user'
                      ? 'bg-terracotta-600 text-warmwhite'
                      : 'bg-sand-100 text-charcoal-800'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-sand-200 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.inputPlaceholder')}
              className="min-w-0 flex-1 rounded-full border border-sand-300 bg-warmwhite px-4 py-2.5 text-base text-charcoal-800 outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
            />
            <button
              type="submit"
              aria-label={t('chat.send')}
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-600 text-warmwhite transition-colors hover:bg-terracotta-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t('chat.closeLabel') : t('chat.openLabel')}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-600 text-warmwhite shadow-lifted transition-transform hover:scale-105 hover:bg-terracotta-700"
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
      </button>
    </div>
  )
}
