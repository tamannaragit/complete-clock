import { useEffect, useState } from 'react'

export default function AnalogClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours() % 12

  const secDeg = seconds * 6
  const minDeg = minutes * 6 + seconds * 0.1
  const hourDeg = hours * 30 + minutes * 0.5

  return (
    <div className="analog-clock">
      <svg viewBox="0 0 200 200" width="260" height="260">
        <circle cx="100" cy="100" r="95" className="clock-face" />
        {[...Array(12)].map((_, i) => {
          const angle = i * 30
          const x1 = 100 + 80 * Math.sin((angle * Math.PI) / 180)
          const y1 = 100 - 80 * Math.cos((angle * Math.PI) / 180)
          const x2 = 100 + 90 * Math.sin((angle * Math.PI) / 180)
          const y2 = 100 - 90 * Math.cos((angle * Math.PI) / 180)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="tick" />
        })}
        <line
          x1="100" y1="100"
          x2={100 + 45 * Math.sin((hourDeg * Math.PI) / 180)}
          y2={100 - 45 * Math.cos((hourDeg * Math.PI) / 180)}
          className="hand hour-hand"
          style={{ transform: `rotate(${hourDeg}deg)`, transformOrigin: '100px 100px' }}
        />
        <line
          x1="100" y1="100"
          x2={100 + 65 * Math.sin((minDeg * Math.PI) / 180)}
          y2={100 - 65 * Math.cos((minDeg * Math.PI) / 180)}
          className="hand minute-hand"
          style={{ transform: `rotate(${minDeg}deg)`, transformOrigin: '100px 100px' }}
        />
        <line
          x1="100" y1="100"
          x2={100 + 75 * Math.sin((secDeg * Math.PI) / 180)}
          y2={100 - 75 * Math.cos((secDeg * Math.PI) / 180)}
          className="hand second-hand"
          style={{ transform: `rotate(${secDeg}deg)`, transformOrigin: '100px 100px' }}
        />
        <circle cx="100" cy="100" r="4" className="center-dot" />
      </svg>
    </div>
  )
}
