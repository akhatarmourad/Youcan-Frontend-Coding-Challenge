import axios from 'axios'
import type { MapboxResult } from '../types/types'

export const fetchMapboxResults = async (
    query: string
): Promise<MapboxResult[] | null> => {
    const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

    try {
        const response = await axios.get(
            `https://api.mapbox.com/search/geocode/v6/forward`,
            {
                params: {
                    q: query.trim(),
                    country: 'ma',
                    proximity: 'ip',
                    types: 'place',
                    limit: 5,
                    access_token: MAPBOX_ACCESS_TOKEN
                }
            }
        )

        return response.data.features
    } catch (error) {
        console.error('Error fetching Mapbox results:', error)
        throw new Error('Failed to fetch results from Mapbox API')
    }
}
