"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import prisma from "./db";
import { Question } from "./types";
import { getTranslations } from "next-intl/server";
import { Prisma } from "@prisma/client";

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
  const t = await getTranslations("WhitelistPage");

  const session = await auth();

  if (!session?.user) return { success: false, message: t("notAuthenticated") };

  const application = await prisma.whitelistApplication.findFirst({
    where: { applicant: session.user.id, status: "pending" },
  });

  if (application) return { success: false, message: t("alreadyExists") };

  await prisma.whitelistApplication.create({
    data: {
      applicant: session.user.id,
      answers: data,
    },
  });

  return { success: true, message: t("applicationSubmitted") };
}

export const updateQuestions = async (questions: Question[]) => {
  const t = await getTranslations("WhitelistPage");

  const session = await auth();

  if (!session?.user.isAdmin) return { success: false, message: t("userNotAdmin") };

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

    return { success: true, message: t("successfullyUpdated") };
  } catch (error) {
    return { success: false, message: t("failedToUpdate") };
  }
};

export async function getWhitelistQuestions() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { status: "error" };
    }

    const application = await prisma.whitelistApplication.findFirst({
      where: { applicant: userId, status: "pending" },
      select: { status: true, createdAt: true, updatedAt: true },
    });

    if (application) {
      return {
        status: "applied",
        application: application as Prisma.WhitelistApplicationCreateInput,
      };
    }

    const questions = await prisma.whitelistQuestion.findMany({
      orderBy: { createdAt: "asc" },
    });

    return {
      status: "canApply",
      questions: questions.sort((a, b) => (a.required === b.required ? 0 : a.required ? -1 : 1)),
      isAdmin: session.user.isAdmin,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: "error" };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
