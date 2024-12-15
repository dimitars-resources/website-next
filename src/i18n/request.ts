import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = process.env.APP_LOCALE || "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
