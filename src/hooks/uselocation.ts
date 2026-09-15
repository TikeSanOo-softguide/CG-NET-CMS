import { getArea, getRegions, getStates } from '@/lib/api/location.api'
import { useQuery } from '@tanstack/react-query'

export function useStates() {
    return useQuery({
        queryKey: ['locations', 'states'],
        queryFn: getStates,
        staleTime: 24 * 60 * 60 * 1000,
    })
}

export function useRegions(stateId: number | null) {
    return useQuery({
        queryKey: ['locations', 'regions', stateId],
        queryFn: () => getRegions(stateId as number),
        enabled: stateId !== null,
        staleTime: 24 * 60 * 60 * 1000,
    })
}

export function useAreas(regionId: number | null) {
    return useQuery({
        queryKey: ['locations', 'areas', regionId],
        queryFn: () => getArea(regionId as number),
        enabled: regionId !== null,
        staleTime: 24 * 60 * 60 * 1000,
    })
}