import { getArea, getRegions, getStates } from '@/lib/api/location.api'
import { useQuery } from '@tanstack/react-query'

export function useStates() {
    return useQuery({
        queryKey: ['locations', 'states'],
        queryFn: getStates,
    })
}

export function useRegions(stateId: number | null) {
    return useQuery({
        queryKey: ['locations', 'regions', stateId],
        queryFn: () => getRegions(stateId as number),
        enabled: stateId !== null,
    })
}

export function useAreas(regionId: number | null) {
    return useQuery({
        queryKey: ['locations', 'areas', regionId],
        queryFn: () => getArea(regionId as number),
        enabled: regionId !== null,
    })
}