import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ChatWidget } from '../chat/ChatWidget'
import { ChatWidgetProvider } from '../../context/ChatWidgetContext'
import { CookieConsentProvider } from '../../context/CookieConsentContext'
import { CookieBanner } from '../cookies/CookieBanner'
import { CookiePreferencesModal } from '../cookies/CookiePreferencesModal'

export function Layout() {
  return (
    <CookieConsentProvider>
      <ChatWidgetProvider>
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-warmwhite">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <ChatWidget />
          <CookieBanner />
          <CookiePreferencesModal />
        </div>
      </ChatWidgetProvider>
    </CookieConsentProvider>
  )
}
