import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
    {
        user: {
            email: 'john.doe@example.com',
            name: 'John Doe',
        },
        posts: [
            {
                title: 'Introduction to Prisma',
                content: 'Learn about Prisma ORM in this introductory guide.',
                published: true,
            },
        ],
    },
    {
        user: {
            email: 'jane.smith@example.com',
            name: 'Jane Smith',
        },
        posts: [
            {
                title: 'Prisma vs. TypeORM',
                content: 'Comparing Prisma and TypeORM for database access.',
                published: true,
            },
            {
                title: 'Getting Started with GraphQL',
                content: 'A beginner-friendly guide to GraphQL basics.',
                published: false,
            },
        ],
    },
    {
        user: {
            email: 'emma.white@example.com',
            name: 'Emma White',
        },
        posts: [
            {
                title: 'Prisma Migrations Tutorial',
                content: 'A step-by-step guide to using Prisma Migrate.',
                published: true,
            },
            {
                title: 'Building a REST API with Express and Prisma',
                content: 'Learn how to create a RESTful API using Express and Prisma.',
                published: true,
            },
        ],
    },
    {
        user: {
            email: 'sam.jones@example.com',
            name: 'Sam Jones',
        },
        posts: [
            {
                title: 'Prisma Client Advanced Usage',
                content: 'Explore advanced features of Prisma Client in this tutorial.',
                published: false,
            },
        ],
    },
];

async function seedUsers() {
    for (const userData of seedData) {
        const user = await prisma.user.create({
            data: userData.user,
        });

        for (const postData of userData.posts) {
            await prisma.post.create({
                data: {
                    ...postData,
                    userId: user.id,
                },
            });
        }

        console.log('User seeded:', user);
    }
}

seedUsers()
    .catch((error) => {
        console.error('Error seeding users:', error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export default seedData;
