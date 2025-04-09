import axios from 'axios';
import { Category, Event } from '@/types';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

export const categoryApi = {
    getAll: async (): Promise<Category[]> => {
        const { data } = await api.get('/api/categories');
        return data;
    },

    getById: async (id: number): Promise<Category> => {
        const { data } = await api.get(`/api/categories/${id}`);
        return data;
    },

    create: async (name: string): Promise<Category> => {
        const { data } = await api.post('/api/categories', { name });
        return data;
    },

    update: async (id: number, name: string): Promise<Category> => {
        const { data } = await api.put(`/api/categories/${id}`, { name });
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/api/categories/${id}`);
    },
};

export const eventApi = {
    getAll: async (): Promise<Event[]> => {
        const { data } = await api.get('/api/events');
        return data;
    },

    getById: async (id: number): Promise<Event> => {
        const { data } = await api.get(`/api/events/${id}`);
        return data;
    },

    getSimilar: async (id: number, limit: number = 3): Promise<Event[]> => {
        const { data } = await api.get(`/api/events/${id}/similar`, {
            params: { limit },
        });
        return data;
    },

    create: async (event: Omit<Event, 'id'>): Promise<Event> => {
        const { data } = await api.post('/api/events', event);
        return data;
    },

    update: async (id: number, event: Omit<Event, 'id'>): Promise<Event> => {
        const { data } = await api.put(`/api/events/${id}`, event);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/api/events/${id}`);
    },
}; 