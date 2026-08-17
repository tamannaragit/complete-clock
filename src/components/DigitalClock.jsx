import { useEffect, useMemo, useState } from 'react'

export default function DigitalClock({ is24Hour, setIs24Hour }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeStr = useMemo(
    () => time.toLocaleTimeString('en-US', { hour12: !is24Hour }),
    [time, is24Hour]
  )

  const dateStr = useMemo(
    () => time.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }),
    [time]
  )

  const timezoneLabel = useMemo(() => {
    const offsetMinutes = new Date().getTimezoneOffset()
    const sign = offsetMinutes <= 0 ? '+' : '-'
    const absolute = Math.abs(offsetMinutes)
    const hrs = String(Math.floor(absolute / 60)).padStart(2, '0')
    const mins = String(absolute % 60).padStart(2, '0')
    return `UTC ${sign}${hrs}:${mins}`
  }, [])

  return (
    <div className="digital-clock">
      <div className="digital-clock-controls">
        <button
          type="button"
          className={`mini-btn ${is24Hour ? 'active' : ''}`}
          onClick={() => setIs24Hour(true)}
        >
          24 Hour
        </button>
        <button
          type="button"
          className={`mini-btn ${!is24Hour ? 'active' : ''}`}
          onClick={() => setIs24Hour(false)}
        >
          12 Hour
        </button>
      </div>
      <h1>{timeStr}</h1>
      <p>{dateStr}</p>
      <p className="digital-clock-zone">Local Timezone: {timezoneLabel}</p>
    </div>
  )
}
