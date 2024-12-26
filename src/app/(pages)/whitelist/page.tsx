import WhitelistForm from "@/components/whitelist-form";
import WhitelistStatusCard from "@/components/whitelist-status";
import { getWhitelistQuestions } from "@/lib/actions";

const WhitelistPage = async () => {
  const data = await getWhitelistQuestions();

  if (data.status === "error") {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <>
      {data.status === "applied" && data.application && (
        <div className="flex h-screen items-center justify-center">
          <WhitelistStatusCard application={data.application} />
        </div>
      )}
      {data.status === "canApply" && data.questions && (
        <WhitelistForm questions={data.questions} isAdmin={data.isAdmin} />
      )}
    </>
  );
};

export default WhitelistPage;
