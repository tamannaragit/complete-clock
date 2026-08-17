import { useEffect, useMemo, useState } from 'react'

const DEFAULT_ZONES = [
  { city: 'New York', tz: 'America/New_York' },
  { city: 'London', tz: 'Europe/London' },
  { city: 'Mumbai', tz: 'Asia/Kolkata' },
  { city: 'Dubai', tz: 'Asia/Dubai' },
  { city: 'Tokyo', tz: 'Asia/Tokyo' },
  { city: 'Sydney', tz: 'Australia/Sydney' },
]

const CITY_OPTIONS = [
  { city: 'Berlin', tz: 'Europe/Berlin' },
  { city: 'Paris', tz: 'Europe/Paris' },
  { city: 'Singapore', tz: 'Asia/Singapore' },
  { city: 'Los Angeles', tz: 'America/Los_Angeles' },
  { city: 'Cape Town', tz: 'Africa/Johannesburg' },
  { city: 'Seoul', tz: 'Asia/Seoul' },
]

export default function WorldClock() {
  const [now, setNow] = useState(new Date())
  const [zones, setZones] = useState(DEFAULT_ZONES)
  const [selectedZone, setSelectedZone] = useState(CITY_OPTIONS[0].tz)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const cards = useMemo(
    () =>
      zones.map(({ city, tz }) => {
        const time = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now)
        const date = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).format(now)

        return { city, tz, time, date }
      }),
    [zones, now]
  )

  const handleAddCity = () => {
    const zoneToAdd = CITY_OPTIONS.find(({ tz }) => tz === selectedZone)
    if (!zoneToAdd) return

    setZones((currentZones) => {
      if (currentZones.some(({ tz }) => tz === zoneToAdd.tz)) {
        return currentZones
      }

      return [...currentZones, zoneToAdd]
    })
  }

  const handleRemoveCity = (tzToRemove) => {
    setZones((currentZones) => currentZones.filter(({ tz }) => tz !== tzToRemove))
  }

  return (
    <div className="world-clock-wrapper">
      <div className="world-clock-controls">
        <select value={selectedZone} onChange={(event) => setSelectedZone(event.target.value)}>
          {CITY_OPTIONS.map(({ city, tz }) => (
            <option key={tz} value={tz}>{city}</option>
          ))}
        </select>
        <button onClick={handleAddCity}>Add City</button>
      </div>

      <div className="world-clock">
        {cards.map(({ city, tz, time, date }) => (
          <div className="world-clock-card" key={tz}>
            <div className="world-clock-header">
              <h3>{city}</h3>
              <button className="remove-city-btn" onClick={() => handleRemoveCity(tz)}>Remove</button>
            </div>
            <p className="wc-time">{time}</p>
            <p className="wc-date">{date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
