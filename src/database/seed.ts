import { PrismaClient } from "@prisma/client";
import { userData, statusData, roleData } from '~/entities';

const prisma = new PrismaClient();

const seedUsers = async () => {
    for (const data of statusData) {
        const status = await prisma.status.create({ data });
        console.log('Status seeded:', status.name);
    }

    for (const data of roleData) {
        const role = await prisma.role.create({ data });
        console.log('Role seeded:', role.name);
    }

    for (const data of userData) {
        const user = await prisma.user.create({ data });
        console.log('User seeded:', user.name);
    }
};

seedUsers()
    .catch((error) => {
        console.error('Error seeding users:', error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export { seedUsers };
