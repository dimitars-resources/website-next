import React from "react";

const WhitelistForm = () => {
  return (
    <div>
      <section className="space-y-4 pt-20 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-white">Whitelist Form</h1>
        <form className="space-y-8 max-w-xl pt-10 w-full">
          <div>
            <label className="text-white">FiveM Username</label>
            <input
              type="text"
              className="w-full p-2 bg-zinc-900 rounded"
              placeholder="FiveM Username"
            />
          </div>
          <div>
            <label className="text-white">Discord Username</label>
            <input
              type="text"
              className="w-full p-2 bg-zinc-900 rounded"
              placeholder="Discord Username"
            />
          </div>

          <div className="flex justify-end">
            <button className="p-2 px-4 bg-blue-800">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default WhitelistForm;
