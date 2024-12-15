import SignIn from "@/components/sign-in";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <section className="flex flex-col items-center space-y-8 px-4 py-40 text-center">
        <h1 className="text-7xl font-bold">{process.env.APP_NAME}</h1>
        <p className="max-w-2xl">{t("description")}</p>

        <SignIn />
      </section>
    </div>
  );
}
