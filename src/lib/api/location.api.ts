
import { CoverageArea, CoverageRegion, CoverageState } from '@/types/coverage'
import { apiClient } from './client'
import {
    areasResponseSchema,
    parseApiResponse,
    regionsResponseSchema,
    statesResponseSchema,
} from './validation'

type CoverageStateResponse = {
    data: CoverageState[]
}

type CoverageRegionResponse = {
    data: CoverageRegion[]
}

type CoverageAreaResponse = {
    data: CoverageArea[]
}

export async function getStates(): Promise<CoverageState[]> {
    const { data } = await apiClient.get<CoverageStateResponse>(
        '/states'
    )

    return parseApiResponse<CoverageStateResponse>(
        statesResponseSchema,
        data,
        'states'
    ).data
}

export async function getRegions(stateId: number): Promise<CoverageRegion[]> {
    const { data } = await apiClient.get<CoverageRegionResponse>(
        `/states/${stateId}/regions`
    )

    return parseApiResponse<CoverageRegionResponse>(
        regionsResponseSchema,
        data,
        'regions'
    ).data
}

export async function getArea(regionId: number): Promise<CoverageArea[]> {
    const { data } = await apiClient.get<CoverageAreaResponse>(
        `/regions/${regionId}/areas`
    )

    return parseApiResponse<CoverageAreaResponse>(
        areasResponseSchema,
        data,
        'areas'
    ).data
}