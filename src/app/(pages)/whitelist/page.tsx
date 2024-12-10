import WhitelistForm from "@/components/whitelist-form";
import { getWhitelistQuestions } from "@/lib/actions";

const WhitelistPage = async () => {
  const questions = await getWhitelistQuestions();

  return (
    <div>
      <WhitelistForm questions={questions} />
    </div>
  );
};

export default WhitelistPage;
