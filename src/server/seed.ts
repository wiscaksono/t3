import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    for (let i = 0; i <= 10; i++) {
      const user = {
        name: `John Doe ${i}`,
        email: `johndoe${i}@example.com`,
        image: `https://plchldr.co/i/150x150?text=John Doe ${i}`,
        role: "USER",
      };
      await prisma.user.create({ data: user });
      console.log(`Sucess create ${user.name}`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

export default seed;
