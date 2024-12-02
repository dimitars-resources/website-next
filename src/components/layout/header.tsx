import Link from "next/link";
import Button from "../ui/button";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/lib/actions";

const Header = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 z-10 h-16 w-full border-b border-white/5 bg-[#111111]">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 *:space-x-4">
        <div className="*:text-xl">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>

        {session?.user && (
          <form action={signOutAction}>
            <Button type="submit" size="small">
              Log Out
            </Button>
          </form>
        )}
      </nav>
    </header>
  );
};

export default Header;
