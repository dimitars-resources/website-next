"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import prisma from "./db";

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
