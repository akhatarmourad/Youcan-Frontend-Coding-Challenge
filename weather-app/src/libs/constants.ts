import { MapboxResult } from '../types/types'

const defaultCity: MapboxResult = {
    id: 'CASA-MA-24',
    properties: {
        name: 'Casablanca',
        place_formatted: 'Casablanca, Morocco',
        coordinates: {
            longitude: -7.5898,
            latitude: 33.5736
        }
    }
}

const AQI_TABLE = [
    {
        index: 1,
        category: 'Good',
        interval: [0, 50],
        ranges: {
            so2: [0, 20],
            no2: [0, 40],
            pm10: [0, 20],
            pm2_5: [0, 10],
            o3: [0, 60],
            co: [0, 4400]
        }
    },
    {
        index: 2,
        interval: [51, 100],
        category: 'Fair',
        ranges: {
            so2: [20, 80],
            no2: [40, 70],
            pm10: [20, 50],
            pm2_5: [10, 25],
            o3: [60, 100],
            co: [4400, 9400]
        }
    },
    {
        index: 3,
        interval: [100, 150],
        category: 'Moderate',
        ranges: {
            so2: [80, 250],
            no2: [70, 150],
            pm10: [50, 100],
            pm2_5: [25, 50],
            o3: [100, 140],
            co: [9400, 12400]
        }
    },
    {
        index: 4,
        category: 'Poor',
        interval: [150, 200],
        ranges: {
            so2: [250, 350],
            no2: [150, 200],
            pm10: [100, 200],
            pm2_5: [50, 75],
            o3: [140, 180],
            co: [12400, 15400]
        }
    },
    {
        index: 5,
        category: 'Very Poor',
        interval: [200, 300],
        ranges: {
            so2: [350, Infinity],
            no2: [200, Infinity],
            pm10: [200, Infinity],
            pm2_5: [75, Infinity],
            o3: [180, Infinity],
            co: [15400, Infinity]
        }
    }
]

export { defaultCity, AQI_TABLE }
