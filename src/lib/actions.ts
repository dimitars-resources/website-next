"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";

export async function signInAction() {
  const session = await auth();
  const redirectUrl = "/whitelist";

  if (!session?.user) {
    await signIn("discord", { redirectTo: redirectUrl });
  } else {
    redirect(redirectUrl);
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
