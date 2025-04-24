import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Delete all existing users
    await prisma.user.deleteMany();

    // Generate hashed passwords
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('securePass456', 10);
    const hashedPassword3 = await bcrypt.hash('strongPass789', 10);
    const hashedPassword4 = await bcrypt.hash('userPass321', 10);
    const hashedPassword5 = await bcrypt.hash('randomPass654', 10);

    await prisma.user.createMany({
        data: [
            { name: 'Alice', email: 'alice@example.com', password: hashedPassword1 },
            { name: 'Bob', email: 'bob@example.com', password: hashedPassword2 },
            { name: 'Charlie', email: 'charlie@example.com', password: hashedPassword3 },
            { name: 'David', email: 'david@example.com', password: hashedPassword4 },
            { name: 'Eve', email: 'eve@example.com', password: hashedPassword5 },
        ],
    });

    console.log('Seeding completed.');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
