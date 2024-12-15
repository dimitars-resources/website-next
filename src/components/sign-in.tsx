"use server";

import { useTranslations } from "next-intl";
import Button from "./ui/button";
import { signInAction } from "@/lib/actions";

const SignIn = () => {
  const t = useTranslations("HomePage");

  return (
    <form action={signInAction}>
      <Button type="submit" rounded="full">
        {t("signIn")}
      </Button>
    </form>
  );
};

export default SignIn;
