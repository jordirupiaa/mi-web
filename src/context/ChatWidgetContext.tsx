import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface ChatWidgetContextValue {
  open: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null)

/**
 * Shares the chat widget's open/closed state across the app so pages other
 * than the widget itself (e.g. the Contact page's "virtual assistant" card)
 * can open it with a button, instead of only the widget's own floating
 * toggle. Mounted once in Layout, alongside <ChatWidget />.
 */
export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const value = useMemo<ChatWidgetContextValue>(
    () => ({
      open,
      openChat: () => setOpen(true),
      closeChat: () => setOpen(false),
      toggleChat: () => setOpen((v) => !v),
    }),
    [open]
  )

  return <ChatWidgetContext.Provider value={value}>{children}</ChatWidgetContext.Provider>
}

export function useChatWidget() {
  const ctx = useContext(ChatWidgetContext)
  if (!ctx) throw new Error('useChatWidget must be used within a ChatWidgetProvider')
  return ctx
}
