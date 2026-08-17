import { useEffect, useRef, useState } from 'react'

function formatTime(ms) {
  const totalMs = Math.floor(ms)
  const minutes = Math.floor(totalMs / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const milliseconds = Math.floor((totalMs % 1000) / 10)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const startRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current)
      }, 10)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const handleStartPause = () => setRunning((r) => !r)
  const handleReset = () => {
    setRunning(false)
    setElapsed(0)
    setLaps([])
  }
  const handleLap = () => setLaps((l) => [...l, elapsed])

  return (
    <div className="stopwatch">
      <h2 className="stopwatch-display">{formatTime(elapsed)}</h2>
      <div className="stopwatch-buttons">
        <button onClick={handleStartPause} className={running ? 'btn-pause' : 'btn-start'}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleLap} disabled={!running}>Lap</button>
        <button onClick={handleReset} className="btn-reset">Reset</button>
      </div>
      {laps.length > 0 && (
        <ul className="lap-list">
          {laps.map((lap, i) => (
            <li key={i}><span>Lap {i + 1}</span><span>{formatTime(lap)}</span></li>
          ))}
        </ul>
      )}
    </div>
  )
}
