import { IsString, IsNotEmpty, MinLength, MaxLength, IsDate, IsObject, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @Type(() => Date)
    @IsDate()
    date: Date;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    description: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
} 