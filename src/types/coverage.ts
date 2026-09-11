export interface CoverageArea {
    id: number;
    name: {
        en: string;
        my: string;
        zh: string;
    };
    latitude: number | null;
    longitude: number | null;
}

export interface CoverageRegion {
    id: number;
    name: {
        en: string;
        my: string;
        zh: string;
    };
    latitude: number | null;
    longitude: number | null;
    areas: CoverageArea[];
}

export interface CoverageState {
    id: number;
    name: {
        en: string;
        my: string;
        zh: string;
    };
    latitude: number | null;
    longitude: number | null;
    regions: CoverageRegion[];
}

export type CoverageCity = CoverageState;