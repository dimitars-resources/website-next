"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import prisma from "./db";
import { Question } from "./types";

export async function signInAction() {
  const session = await auth();
  const redirectUrl = "/whitelist";

  if (!session?.user) {
    await signIn("discord", { redirectTo: redirectUrl });
  } else {
    redirect(redirectUrl);
  }
}

export async function createWhitelistApplication(data: Record<string, string>) {
  const session = await auth();

  if (!session?.user) return { success: false, message: "User not authenticated" };

  const application = await prisma.whitelistApplication.findFirst({
    where: { applicant: session.user.id, status: "pending" },
  });

  if (application) return { success: false, message: "Application already exists" };

  await prisma.whitelistApplication.create({
    data: {
      applicant: session.user.id,
      answers: data,
    },
  });

  return { success: true, message: "Application submitted successfully" };
}

export const updateQuestions = async (questions: Question[]) => {
  const session = await auth();

  if (!session?.user.isAdmin) return { success: false };

  try {
    const existingQuestions = await prisma.whitelistQuestion.findMany({
      select: { id: true },
    });
    const existingIds = new Set(existingQuestions.map((q) => q.id));

    const newQuestions = questions.filter((q) => q.id.startsWith("new-"));
    const existingQuestionsToUpdate = questions.filter((q) => !q.id.startsWith("new-"));

    for (const question of existingQuestionsToUpdate) {
      if (existingIds.has(question.id)) {
        if (!question.question && !question.placeholder) {
          await prisma.whitelistQuestion.delete({ where: { id: question.id } });
          continue;
        }
        await prisma.whitelistQuestion.update({
          where: { id: question.id },
          data: {
            question: question.question,
            placeholder: question.placeholder,
            required: question.required,
          },
        });
      }
    }

    for (const newQuestion of newQuestions) {
      if (!newQuestion.question) continue;
      await prisma.whitelistQuestion.create({
        data: {
          question: newQuestion.question,
          placeholder: newQuestion.placeholder,
          required: newQuestion.required,
        },
      });
    }

    const updatedIds = new Set(questions.map((q) => q.id));
    const toDeleteIds = Array.from(existingIds).filter((id) => !updatedIds.has(id));
    await prisma.whitelistQuestion.deleteMany({
      where: { id: { in: toDeleteIds } },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to update questions:", error);
    return { success: false };
  }
};

export async function getWhitelistQuestions() {
  try {
    const questions = await prisma.whitelistQuestion.findMany({
      orderBy: { createdAt: "asc" },
    });

    return questions.sort((a, b) => (a.required === b.required ? 0 : a.required ? -1 : 1));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
