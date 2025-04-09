export interface Location {
    name: string;
    lat: number;
    lng: number;
}

export interface Event {
    id: number;
    title: string;
    date: string;
    location: Location;
    description: string;
    categoryId: number;
    category?: {
        id: number;
        name: string;
    };
}

export interface Category {
    id: number;
    name: string;
    _count?: {
        events: number;
    };
} 