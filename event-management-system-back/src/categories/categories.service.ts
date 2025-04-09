import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async create(createCategoryDto: CreateCategoryDto) {
        try {
            return await this.prisma.category.create({
                data: createCategoryDto,
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Category with this name already exists');
            }
            throw error;
        }
    }

    async findAll() {
        return this.prisma.category.findMany({
            include: {
                _count: {
                    select: { events: true },
                },
            },
        });
    }

    async remove(id: number) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { events: true },
                },
            },
        });

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        if (category._count.events > 0) {
            throw new ConflictException(
                `Cannot delete category with ID ${id} because it has ${category._count.events} associated events`,
            );
        }

        return this.prisma.category.delete({
            where: { id },
        });
    }
} 