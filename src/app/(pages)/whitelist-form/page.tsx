import { mockQuestions } from "@/lib/mock";
import React from "react";

const WhitelistForm = () => {
  return (
    <div>
      <section className="flex flex-col items-center space-y-4 pt-20">
        <h1 className="text-5xl font-bold text-white">Whitelist Form</h1>
        <form className="w-full max-w-xl space-y-8 pt-10">
          {mockQuestions.map((question) => (
            <div key={question.id}>
              <label className="text-white">{question.question}</label>
              <input type="text" className="w-full rounded bg-zinc-900 p-2" />
            </div>
          ))}

          <div className="flex justify-end">
            <button className="bg-blue-800 p-2 px-4">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default WhitelistForm;
