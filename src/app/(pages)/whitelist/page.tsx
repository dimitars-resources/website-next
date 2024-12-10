import WhitelistForm from "@/components/whitelist-form";
import { getWhitelistQuestions } from "@/lib/actions";
import { auth } from "@/lib/auth";

const WhitelistPage = async () => {
  const questions = await getWhitelistQuestions();
  const session = await auth();

  return (
    <div>
      <WhitelistForm questions={questions} isAdmin={session?.user.isAdmin} />
    </div>
  );
};

export default WhitelistPage;
