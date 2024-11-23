export function getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }
    return new Date().toLocaleDateString('en-US', options)
}

export function getCurrentTime(): string {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const amPm = hours >= 12 ? 'PM' : 'AM'

    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${formattedHours}:${formattedMinutes} ${amPm}`
}

export function formatTime(dt: number): string {
    const date = new Date(dt * 1000)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${hours}:${minutes}`
}

export const getWeatherIcon = (iconCode: string): string => {
    const baseUrl = 'https://openweathermap.org/img/wn/'
    console.log(`${baseUrl}${iconCode}@2x.png`)
    return `${baseUrl}${iconCode}@2x.png`
}

export function getShortDayName(dt: number): string {
    const date = new Date(dt * (dt < 1e10 ? 1000 : 1))
    const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return shortDayNames[date.getUTCDay()]
}

export function toFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32
}
