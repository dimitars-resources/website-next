import React from "react";

const WhitelistForm = () => {
  return (
    <div>
      <section className="flex flex-col items-center space-y-4 pt-20">
        <h1 className="text-5xl font-bold text-white">Whitelist Form</h1>
        <form className="w-full max-w-xl space-y-8 pt-10">
          <div>
            <label className="text-white">FiveM Username</label>
            <input type="text" className="w-full rounded bg-zinc-900 p-2" placeholder="FiveM Username" />
          </div>
          <div>
            <label className="text-white">Discord Username</label>
            <input type="text" className="w-full rounded bg-zinc-900 p-2" placeholder="Discord Username" />
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-800 p-2 px-4">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default WhitelistForm;
