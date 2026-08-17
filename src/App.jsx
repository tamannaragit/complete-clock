import { useState } from 'react'
import AnalogClock from './components/AnalogClock'
import DigitalClock from './components/DigitalClock'
import Stopwatch from './components/Stopwatch'
import WorldClock from './components/WorldClock'
import Alarm from './components/Alarm'

const TABS = ['Clock', 'Stopwatch', 'World Clock', 'Alarm']

export default function App() {
  const [activeTab, setActiveTab] = useState('Clock')
  const [clockMode, setClockMode] = useState('digital')
  const [is24Hour, setIs24Hour] = useState(true)

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="app-label">TIME MANAGEMENT</p>
          <h1 className="app-title">Clock Dashboard</h1>
          <p className="app-subtitle">
            Your time, anywhere and anytime.
          </p>
        </div>

        <div className="live-indicator">
          <span></span> LIVE
        </div>
      </header>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {activeTab === 'Clock' && (
          <div className="clock-dashboard">
            <div className="clock-mode-switch">
              <button
                className={clockMode === 'digital' ? 'mode-active' : ''}
                onClick={() => setClockMode('digital')}
              >
                Digital
              </button>

              <button
                className={clockMode === 'analog' ? 'mode-active' : ''}
                onClick={() => setClockMode('analog')}
              >
                Analog
              </button>
            </div>

            <div className="clock-section">
              {clockMode === 'digital' ? (
                <DigitalClock
                  is24Hour={is24Hour}
                  setIs24Hour={setIs24Hour}
                />
              ) : (
                <AnalogClock />
              )}
            </div>
          </div>
        )}

        {activeTab === 'Stopwatch' && (
          <section className="dashboard-card">
            <h2>Stopwatch</h2>
            <p className="section-description">
              Track elapsed time with precision.
            </p>
            <Stopwatch />
          </section>
        )}

        {activeTab === 'World Clock' && (
          <section className="dashboard-card wide-card">
            <h2>World Clock</h2>
            <p className="section-description">
              Keep track of time across different cities.
            </p>
            <WorldClock />
          </section>
        )}

        {activeTab === 'Alarm' && (
          <section className="dashboard-card">
            <h2>Alarm</h2>
            <p className="section-description">
              Set an alarm and get notified when your time arrives.
            </p>
            <Alarm is24Hour={is24Hour} />
          </section>
        )}
      </main>

      <footer className="app-footer">
        <span>Clock Dashboard</span>
        <span>•</span>
        <span>Real-time system</span>
      </footer>
    </div>
  )
}