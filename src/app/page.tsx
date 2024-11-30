import Sponsors from "@/components/sponsors";
import Streams from "@/components/streams";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-44 my-44">
      <section className="space-y-8  text-center flex items-center flex-col">
        <h1 className="text-7xl font-bold">Server Name</h1>
        <p className="w-full max-w-2xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti,
          earum adipisci. Nulla, labore veniam ratione cumque maiores eaque
          rerum totam reiciendis saepe, repellat excepturi dignissimos omnis
          expedita dicta reprehenderit laborum.
        </p>
        <Link href="/whitelist-form" className="p-2 px-4 bg-blue-800">
          Apply Now!
        </Link>
      </section>

      <section className="space-y-4  flex flex-col">
        <h1 className="text-xl font-bold text-white">Sponsors</h1>
        <Sponsors />
      </section>

      <section className="space-y-4  flex flex-col">
        <h1 className="text-xl font-bold text-white">Live Now</h1>
        <Streams />
      </section>
    </div>
  );
}
