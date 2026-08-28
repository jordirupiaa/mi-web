import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { isSupabaseConfigured } from '../../lib/supabase'
import { ConfigWarningBanner } from '../ui/Feedback'
import { ChatWidget } from '../chat/ChatWidget'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-warmwhite">
      {!isSupabaseConfigured && <ConfigWarningBanner />}
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
