import { useEffect, useMemo, useState } from 'react'

const LOCATIONS = [
  { city: 'New York', country: 'USA', tz: 'America/New_York', flag: '🇺🇸' },
  { city: 'London', country: 'UK', tz: 'Europe/London', flag: '🇬🇧' },
  { city: 'Mumbai', country: 'India', tz: 'Asia/Kolkata', flag: '🇮🇳' },
  { city: 'Dubai', country: 'UAE', tz: 'Asia/Dubai', flag: '🇦🇪' },
  { city: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo', flag: '🇯🇵' },
  { city: 'Sydney', country: 'Australia', tz: 'Australia/Sydney', flag: '🇦🇺' },
  { city: 'Berlin', country: 'Germany', tz: 'Europe/Berlin', flag: '🇩🇪' },
  { city: 'Paris', country: 'France', tz: 'Europe/Paris', flag: '🇫🇷' },
  { city: 'Singapore', country: 'Singapore', tz: 'Asia/Singapore', flag: '🇸🇬' },
  { city: 'Los Angeles', country: 'USA', tz: 'America/Los_Angeles', flag: '🇺🇸' },
  { city: 'Seoul', country: 'South Korea', tz: 'Asia/Seoul', flag: '🇰🇷' },
  { city: 'Cape Town', country: 'South Africa', tz: 'Africa/Johannesburg', flag: '🇿🇦' },
]

const DEFAULT_LOCATIONS = [
  LOCATIONS.find((location) => location.city === 'London'),
  LOCATIONS.find((location) => location.city === 'Tokyo'),
  LOCATIONS.find((location) => location.city === 'Dubai'),
]

function getTimezoneOffset(tz, date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    timeZoneName: 'longOffset',
  }).formatToParts(date)

  const offset = parts.find((part) => part.type === 'timeZoneName')

  return offset ? offset.value.replace('GMT', 'UTC') : 'UTC'
}

export default function WorldClock() {
  const [now, setNow] = useState(new Date())
  const [locations, setLocations] = useState(DEFAULT_LOCATIONS)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const filteredLocations = useMemo(() => {
    return LOCATIONS.filter((location) =>
      location.city.toLowerCase().includes(search.toLowerCase()) ||
      location.country.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const formatLocation = (location) => {
    const time = new Intl.DateTimeFormat('en-US', {
      timeZone: location.tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(now)

    const date = new Intl.DateTimeFormat('en-US', {
      timeZone: location.tz,
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(now)

    return {
      time,
      date,
      offset: getTimezoneOffset(location.tz, now),
    }
  }

  const addLocation = (location) => {
    setLocations((current) => {
      if (current.some((item) => item.tz === location.tz)) {
        return current
      }

      return [...current, location]
    })

    setSearch('')
  }

  const removeLocation = (tz) => {
    setLocations((current) =>
      current.filter((location) => location.tz !== tz)
    )
  }

  return (
    <div className="world-clock-wrapper">

      <div className="world-search">
        <div className="world-search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search city or country..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {search && (
          <div className="city-suggestions">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <button
                  key={location.tz}
                  onClick={() => addLocation(location)}
                >
                  <span>{location.flag}</span>

                  <span>
                    <strong>{location.city}</strong>
                    <small>{location.country}</small>
                  </span>

                  <span className="suggestion-add">+</span>
                </button>
              ))
            ) : (
              <p>No cities found.</p>
            )}
          </div>
        )}
      </div>

      <div className="local-time-card">
        <div className="local-time-info">
          <span className="local-time-label">YOUR LOCAL TIME</span>

          <h3>🇮🇳 Mumbai</h3>

          <p>India Standard Time</p>
        </div>

        <div className="local-time-value">
          <strong>
            {new Intl.DateTimeFormat('en-US', {
              timeZone: 'Asia/Kolkata',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            }).format(now)}
          </strong>

          <span>
            {new Intl.DateTimeFormat('en-US', {
              timeZone: 'Asia/Kolkata',
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            }).format(now)}
          </span>
        </div>

        <div className="local-time-zone">
          UTC+5:30
        </div>
      </div>

      <div className="saved-heading">
        <div>
          <h3>Saved Locations</h3>
          <p>Live time across your selected cities</p>
        </div>

        <span>{locations.length} locations</span>
      </div>

      <div className="world-clock">
        {locations.map((location) => {
          const data = formatLocation(location)

          return (
            <div className="world-clock-card" key={location.tz}>

              <div className="world-card-top">
                <div className="city-identity">
                  <span className="city-flag">{location.flag}</span>

                  <div>
                    <h3>{location.city}</h3>
                    <p>{location.country}</p>
                  </div>
                </div>

                <button
                  className="remove-city-btn"
                  onClick={() => removeLocation(location.tz)}
                  title="Remove location"
                >
                  ×
                </button>
              </div>

              <div className="world-card-time">
                {data.time}
              </div>

              <div className="world-card-bottom">
                <span>{data.date}</span>
                <strong>{data.offset}</strong>
              </div>

            </div>
          )
        })}
      </div>

      {locations.length === 0 && (
        <div className="empty-world-clock">
          <div>🌍</div>
          <h3>No locations saved</h3>
          <p>Search for a city above to add it to your dashboard.</p>
        </div>
      )}

    </div>
  )
}