const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//3
async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "Khamit",
      surname: "Amantaev",
      profession: "Backend Developer",
      onvacation: true,
    },
  });
  const users = await prisma.user.findMany();
  console.log(users);
}

//4
main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
