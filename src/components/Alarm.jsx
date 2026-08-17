import { useEffect, useMemo, useState } from 'react'

export default function Alarm({ is24Hour }) {
  const [selectedTime, setSelectedTime] = useState('09:00')
  const [activeAlarm, setActiveAlarm] = useState('')
  const [isTriggered, setIsTriggered] = useState(false)

  useEffect(() => {
    if (!activeAlarm) return

    const checkAlarm = () => {
      const now = new Date()
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

      if (currentTime === activeAlarm) {
        setIsTriggered(true)
      }
    }

    const timer = setInterval(checkAlarm, 1000)
    checkAlarm()

    return () => clearInterval(timer)
  }, [activeAlarm])

  const formatTime = useMemo(() => {
    return (value) => {
      if (!value) return 'No alarm set'

      const [hours, minutes] = value.split(':').map(Number)
      const date = new Date()
      date.setHours(hours, minutes, 0, 0)

      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: !is24Hour,
      })
    }
  }, [is24Hour])

  const handleSaveAlarm = () => {
    if (!selectedTime) return
    setActiveAlarm(selectedTime)
    setIsTriggered(false)
  }

  const handleDismiss = () => {
    setIsTriggered(false)
    setActiveAlarm('')
  }

  return (
    <div className="alarm-panel">
      <div className="alarm-form">
        <input
          type="time"
          value={selectedTime}
          onChange={(event) => setSelectedTime(event.target.value)}
        />
        <button onClick={handleSaveAlarm}>Set Alarm</button>
      </div>

      <div className="alarm-status">
        <p>Active Alarm</p>
        <h3>{formatTime(activeAlarm)}</h3>
      </div>

      {isTriggered && (
        <div className="alarm-triggered">
          <p>Alarm reached</p>
          <button onClick={handleDismiss}>Dismiss</button>
        </div>
      )}
    </div>
  )
}
