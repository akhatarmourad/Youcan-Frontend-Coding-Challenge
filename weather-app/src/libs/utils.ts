import { AQI_TABLE } from './constants'

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

export function getShortDayName(dt: number): string {
    const date = new Date(dt * (dt < 1e10 ? 1000 : 1))
    const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return shortDayNames[date.getUTCDay()]
}

export function toFahrenheit(celsius: number): number {
    return Math.round((celsius * 9) / 5 + 32)
}

function toCelsius(fahrenheit: number): number {
    return Math.round((fahrenheit - 32) * 5/9);
}

export function getTemp(temp: number, degree: 'C' | 'F', unit: 'metric' | 'imperial'): number {
    if (unit === 'metric') {
        if (degree === 'C') {
            return Math.round(temp); 
        } else {
            return toFahrenheit(temp); 
        }
    } else {
        if (degree === 'F') {
            return Math.round(temp); 
        } else {
            return toCelsius(temp);
        }
    }
}

export function getInverseTemp(temp: number, currentDegree: 'C' | 'F', currentUnit: 'metric' | 'imperial'): number {
    if (currentUnit === 'metric') {
        if (currentDegree === 'C') {
            return toFahrenheit(temp); 
        } else {
            return Math.round(temp); 
        }
    } else {
        if (currentDegree === 'F') {
            return toCelsius(temp); 
        } else {
            return Math.round(temp); 
        }
    }
}

// Get the unit for wind speed based on the unit system
export function getWindSpeedUnit(unit: 'metric' | 'imperial'): string {
    if (unit === 'metric') {
        return 'km/h';
    } else {
        return 'mph';
    }
}

export function getPrecipitationUnit(unit: 'metric' | 'imperial'): string {
    if (unit === 'metric') {
        return 'mm';
    } else {
        return 'in';
    }
}

export function convertPOPToPercentage(pop: number): string {
    const percentage = Math.min(Math.max(pop, 0), 1) * 100;
    return `${Math.round(percentage)}`;
}


type Pollutant = keyof (typeof AQI_TABLE)[0]['ranges']

function calculatePollutantAQI(
    pollutant: Pollutant,
    concentration: number
): number {
    for (const level of AQI_TABLE) {
        const range = level.ranges[pollutant]
        if (!range) continue

        const [cLow, cHigh] = range
        const [iLow, iHigh] = level.interval

        if (concentration >= cLow && concentration <= cHigh) {
            return (
                ((iHigh - iLow) / (cHigh - cLow)) * (concentration - cLow) +
                iLow
            )
        }
    }

    return 0
}

export function calculateMaxPollutantAQI(
    components: Record<Pollutant, number>
): {
    pollutant: string
    aqi: number
    index: number
    category: string
} {
    let maxAQI = 0
    let maxPollutant = ''
    let maxIndex = 0
    let maxCategory = ''

    for (const pollutant in components) {
        const concentration = components[pollutant as Pollutant]
        try {
            const aqi = calculatePollutantAQI(
                pollutant as Pollutant,
                concentration
            )

            const aqiData = AQI_TABLE.find(
                (entry) => aqi >= entry.interval[0] && aqi <= entry.interval[1]
            )

            if (aqi > maxAQI) {
                maxAQI = aqi
                maxPollutant = pollutant
                if (aqiData) {
                    maxIndex = aqiData.index
                    maxCategory = aqiData.category
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.warn(error.message)
            }
        }
    }

    return {
        pollutant: maxPollutant,
        aqi: maxAQI,
        index: maxIndex,
        category: maxCategory
    }
}
