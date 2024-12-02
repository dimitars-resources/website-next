import Button from "@/components/ui/button";
import { signInAction } from "@/lib/actions";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center space-y-8 px-4 py-40 text-center">
        <h1 className="text-7xl font-bold">Server Name</h1>
        <p className="max-w-2xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, earum adipisci. Nulla, labore veniam
          ratione cumque maiores eaque rerum totam reiciendis saepe, repellat excepturi dignissimos omnis expedita dicta
          reprehenderit laborum.
        </p>
        <form action={signInAction}>
          <Button type="submit">Apply Now!</Button>
        </form>
      </section>
    </div>
  );
}
