import Sponsors from "@/components/sponsors";

export default function Home() {
  return (
    <div>
      <section className="space-y-8 mt-44 text-center flex items-center flex-col">
        <h1 className="text-7xl font-bold">Server Name</h1>
        <p className="w-full max-w-2xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti,
          earum adipisci. Nulla, labore veniam ratione cumque maiores eaque
          rerum totam reiciendis saepe, repellat excepturi dignissimos omnis
          expedita dicta reprehenderit laborum.
        </p>
        <button className="p-2 px-4 bg-blue-800">Apply Now!</button>
      </section>

      <section className="space-y-4 mt-44 flex flex-col">
        <h1 className="text-xl font-bold text-white">Sponsors</h1>

        <Sponsors />
      </section>
    </div>
  );
}
