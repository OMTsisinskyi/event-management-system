import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create events
    const events = await Promise.all([
        prisma.event.create({
            data: {
                title: 'Tech Conference 2024',
                date: new Date('2024-06-15T09:00:00Z'),
                location: {
                    name: 'New York City',
                    lat: 40.7128,
                    lng: -74.0060,
                },
                description: 'Annual technology conference featuring the latest innovations',
                categoryId: 1, // Conference
            },
        }),
        prisma.event.create({
            data: {
                title: 'Web Development Workshop',
                date: new Date('2024-05-20T14:00:00Z'),
                location: {
                    name: 'Lviv',
                    lat: 49.8397,
                    lng: 24.0297,
                },
                description: 'Hands-on workshop on modern web development practices',
                categoryId: 2, // Workshop
            },
        }),
        prisma.event.create({
            data: {
                title: 'AI and Machine Learning Seminar',
                date: new Date('2024-07-10T11:00:00Z'),
                location: {
                    name: 'Odesa',
                    lat: 46.4825,
                    lng: 30.7233,
                },
                description: 'Deep dive into artificial intelligence and machine learning',
                categoryId: 3, // Seminar
            },
        }),
        prisma.event.create({
            data: {
                title: 'Blockchain Innovation Summit',
                date: new Date('2024-08-05T10:00:00Z'),
                location: {
                    name: 'Kyiv',
                    lat: 50.4501,
                    lng: 30.5234,
                },
                description: 'Exploring the future of blockchain technology and its applications',
                categoryId: 1,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Cloud Computing Workshop',
                date: new Date('2024-09-15T13:00:00Z'),
                location: {
                    name: 'Dnipro',
                    lat: 48.4647,
                    lng: 35.0462,
                },
                description: 'Practical workshop on cloud services and deployment strategies',
                categoryId: 2,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Cybersecurity Best Practices',
                date: new Date('2024-10-20T09:30:00Z'),
                location: {
                    name: 'Kharkiv',
                    lat: 49.9935,
                    lng: 36.2304,
                },
                description: 'Essential security practices for modern applications',
                categoryId: 3,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Mobile App Development Conference',
                date: new Date('2024-11-05T10:00:00Z'),
                location: {
                    name: 'Warsaw',
                    lat: 52.2297,
                    lng: 21.0122,
                },
                description: 'Latest trends in mobile application development',
                categoryId: 1,
            },
        }),
        prisma.event.create({
            data: {
                title: 'UI/UX Design Workshop',
                date: new Date('2024-12-10T14:00:00Z'),
                location: {
                    name: 'Prague',
                    lat: 50.0755,
                    lng: 14.4378,
                },
                description: 'Hands-on workshop on creating beautiful user interfaces',
                categoryId: 2,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Data Science Fundamentals',
                date: new Date('2025-01-15T11:00:00Z'),
                location: {
                    name: 'Berlin',
                    lat: 52.5200,
                    lng: 13.4050,
                },
                description: 'Introduction to data science and analytics',
                categoryId: 3,
            },
        }),
        prisma.event.create({
            data: {
                title: 'DevOps Conference 2025',
                date: new Date('2025-02-20T09:00:00Z'),
                location: {
                    name: 'Amsterdam',
                    lat: 52.3676,
                    lng: 4.9041,
                },
                description: 'Modern DevOps practices and tools',
                categoryId: 1,
            },
        }),
        prisma.event.create({
            data: {
                title: 'React Advanced Workshop',
                date: new Date('2025-03-10T13:00:00Z'),
                location: {
                    name: 'Vienna',
                    lat: 48.2082,
                    lng: 16.3738,
                },
                description: 'Advanced React patterns and performance optimization',
                categoryId: 2,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Testing and QA Seminar',
                date: new Date('2025-04-15T10:00:00Z'),
                location: {
                    name: 'Barcelona',
                    lat: 41.3851,
                    lng: 2.1734,
                },
                description: 'Best practices in software testing and quality assurance',
                categoryId: 3,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Game Development Summit',
                date: new Date('2025-05-20T09:30:00Z'),
                location: {
                    name: 'Stockholm',
                    lat: 59.3293,
                    lng: 18.0686,
                },
                description: 'Latest trends in game development and design',
                categoryId: 1,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Python for Data Analysis',
                date: new Date('2025-06-10T14:00:00Z'),
                location: {
                    name: 'Copenhagen',
                    lat: 55.6761,
                    lng: 12.5683,
                },
                description: 'Practical workshop on data analysis with Python',
                categoryId: 2,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Microservices Architecture',
                date: new Date('2025-07-15T11:00:00Z'),
                location: {
                    name: 'Helsinki',
                    lat: 60.1699,
                    lng: 24.9384,
                },
                description: 'Designing and implementing microservices',
                categoryId: 3,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Frontend Framework Comparison',
                date: new Date('2025-08-20T10:00:00Z'),
                location: {
                    name: 'Dublin',
                    lat: 53.3498,
                    lng: -6.2603,
                },
                description: 'Comparing different frontend frameworks and their use cases',
                categoryId: 1,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Database Optimization Workshop',
                date: new Date('2025-09-10T13:00:00Z'),
                location: {
                    name: 'Lisbon',
                    lat: 38.7223,
                    lng: -9.1393,
                },
                description: 'Advanced techniques for database performance optimization',
                categoryId: 2,
            },
        }),
        prisma.event.create({
            data: {
                title: 'API Design Best Practices',
                date: new Date('2025-10-15T11:00:00Z'),
                location: {
                    name: 'Athens',
                    lat: 37.9838,
                    lng: 23.7275,
                },
                description: 'Designing and documenting RESTful APIs',
                categoryId: 3,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Cloud Native Development',
                date: new Date('2025-11-20T09:00:00Z'),
                location: {
                    name: 'Madrid',
                    lat: 40.4168,
                    lng: -3.7038,
                },
                description: 'Building and deploying cloud-native applications',
                categoryId: 1,
            },
        }),
        prisma.event.create({
            data: {
                title: 'Security Testing Workshop',
                date: new Date('2025-12-10T14:00:00Z'),
                location: {
                    name: 'Rome',
                    lat: 41.9028,
                    lng: 12.4964,
                },
                description: 'Hands-on security testing and penetration testing',
                categoryId: 2,
            },
        }),
    ]);

    console.log('Seed data created successfully!');
    console.log('Events:', events);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 