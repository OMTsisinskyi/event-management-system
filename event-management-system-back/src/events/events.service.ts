import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) { }

    async create(createEventDto: CreateEventDto) {
        const category = await this.prisma.category.findUnique({
            where: { id: createEventDto.categoryId },
        });

        if (!category) {
            throw new NotFoundException(`Category with ID ${createEventDto.categoryId} not found`);
        }

        const { location, ...rest } = createEventDto;
        return this.prisma.event.create({
            data: {
                ...rest,
                location: location.toJSON(),
            },
            include: {
                category: true,
            },
        });
    }

    async findAll() {
        return this.prisma.event.findMany({
            orderBy: { date: 'asc' },
            include: {
                category: true,
            },
        });
    }

    async findOne(id: number) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });

        if (!event) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }

        return event;
    }

    async update(id: number, updateEventDto: UpdateEventDto) {
        if (updateEventDto.categoryId) {
            const category = await this.prisma.category.findUnique({
                where: { id: updateEventDto.categoryId },
            });

            if (!category) {
                throw new NotFoundException(`Category with ID ${updateEventDto.categoryId} not found`);
            }
        }

        try {
            const { location, ...rest } = updateEventDto;
            return await this.prisma.event.update({
                where: { id },
                data: {
                    ...rest,
                    ...(location && { location: location.toJSON() }),
                },
                include: {
                    category: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.event.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
    }

    async findSimilarEvents(eventId: number, limit: number = 3) {
        const event = await this.findOne(eventId);
        if (!event) {
            throw new NotFoundException(`Event with ID ${eventId} not found`);
        }

        const eventLocation = event.location as { lat: number; lng: number };
        
        const allEvents = await this.prisma.event.findMany({
            where: {
                id: { not: eventId }
            },
            include: {
                category: true,
            },
        });

        const eventsWithDistance = allEvents.map(otherEvent => {
            const otherLocation = otherEvent.location as { lat: number; lng: number };
            const distance = this.calculateDistance(
                eventLocation.lat,
                eventLocation.lng,
                otherLocation.lat,
                otherLocation.lng
            );
            return { ...otherEvent, distance };
        });

        return eventsWithDistance
            .sort((a, b) => a.distance - b.distance)
            .slice(0, limit);
    }

    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    private toRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
} 