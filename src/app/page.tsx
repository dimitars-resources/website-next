import Sponsors from "@/components/sponsors";
import Streams from "@/components/streams";
import Link from "next/link";

export default function Home() {
  return (
    <div className="my-44 space-y-44">
      <section className="flex flex-col items-center space-y-8 text-center">
        <h1 className="text-7xl font-bold">Server Name</h1>
        <p className="w-full max-w-2xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti,
          earum adipisci. Nulla, labore veniam ratione cumque maiores eaque
          rerum totam reiciendis saepe, repellat excepturi dignissimos omnis
          expedita dicta reprehenderit laborum.
        </p>
        <Link
          href="/whitelist-form"
          className="rounded-sm bg-blue-800 px-4 py-2"
        >
          Apply Now!
        </Link>
      </section>

      <section className="flex flex-col space-y-4">
        <h1 className="text-xl font-bold text-white">Sponsors</h1>
        <Sponsors />
      </section>

      <section className="flex flex-col space-y-4">
        <h1 className="text-xl font-bold text-white">Live Now</h1>
        <Streams />
      </section>
    </div>
  );
}
