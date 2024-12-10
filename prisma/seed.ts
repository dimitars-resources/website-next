import { PrismaClient } from "@prisma/client";
import { mockQuestions } from "../src/lib/mock";
const prisma = new PrismaClient();
async function main() {
  console.log("Seeding questions...");
  for (const question of mockQuestions) {
    await prisma.whitelistQuestion.create({
      data: {
        question: question.question,
        placeholder: question.placeholder,
        required: question.required,
      },
    });
    console.log(`Question seeded: ${question.question}`);
  }
  console.log("Questions seeded successfully!");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
