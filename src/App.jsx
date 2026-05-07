import { useState } from 'react'
import Start from './pages/Start'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import {ToastProvider} from './components/ToastProvider';

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">

      {started ? (
        <>
        <ToastProvider>
          <Header />
          <main className="flex-grow flex flex-col">
            <Dashboard />
          </main>
          <Footer />
        </ToastProvider>
        </>
      ) : (
        <Start onStart={() => setStarted(true)} />
      )}

    </div>
  )
}

export default App