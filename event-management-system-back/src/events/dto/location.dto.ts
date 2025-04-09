import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Prisma } from '@prisma/client';

export class LocationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(-90)
    @Max(90)
    lat: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    lng: number;

    toJSON(): Prisma.JsonObject {
        return {
            name: this.name,
            lat: this.lat,
            lng: this.lng,
        };
    }

    static fromJSON(json: any): LocationDto {
        const location = new LocationDto();
        location.name = json.name;
        location.lat = json.lat;
        location.lng = json.lng;
        return location;
    }
} 