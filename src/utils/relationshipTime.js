export function getTimeTogether(startDate, now = new Date()) {
  const start = new Date(startDate)
  if (Number.isNaN(start.getTime()) || now < start) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      orbits: 0,
    }
  }

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }
  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }
  if (hours < 0) {
    hours += 24
    days -= 1
  }
  if (days < 0) {
    const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += daysInPrevMonth
    months -= 1
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  const totalMs = now.getTime() - start.getTime()
  const totalDays = totalMs / (1000 * 60 * 60 * 24)
  const orbits = totalDays / 365.25

  return { years, months, days, hours, minutes, seconds, totalDays, orbits }
}

export function pad2(n) {
  return String(n).padStart(2, '0')
}
