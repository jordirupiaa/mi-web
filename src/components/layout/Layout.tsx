import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ChatWidget } from '../chat/ChatWidget'
import { ChatWidgetProvider } from '../../context/ChatWidgetContext'

export function Layout() {
  return (
    <ChatWidgetProvider>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-warmwhite">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ChatWidgetProvider>
  )
}
