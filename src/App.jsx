import { useState } from 'react'
import AnalogClock from './components/AnalogClock'
import DigitalClock from './components/DigitalClock'
import Stopwatch from './components/Stopwatch'
import WorldClock from './components/WorldClock'
import Alarm from './components/Alarm'

const TABS = ['Clock', 'Stopwatch', 'World Clock', 'Alarm']

export default function App() {
  const [activeTab, setActiveTab] = useState('Clock')
  const [is24Hour, setIs24Hour] = useState(true)

  return (
    <div className="app">
      <h1 className="app-title">Clock App</h1>

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'Clock' && (
          <div className="clock-section">
            <AnalogClock />
            <DigitalClock is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
          </div>
        )}
        {activeTab === 'Stopwatch' && <Stopwatch />}
        {activeTab === 'World Clock' && <WorldClock />}
        {activeTab === 'Alarm' && <Alarm is24Hour={is24Hour} />}
      </div>
    </div>
  )
}
