"use server";

import { redirect } from "next/navigation";
import { signIn, auth } from "./auth";

export async function signInAction() {
  const session = await auth();

  if (!session?.user) {
    await signIn("discord", { redirectTo: "/whitelist-form" });
  } else {
    redirect("/whitelist-form");
  }
}
