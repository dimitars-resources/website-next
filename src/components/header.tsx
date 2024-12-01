import Link from "next/link";
import Button from "./ui/button";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/lib/actions";

const Header = async () => {
  const session = await auth();

  return (
    <header className="h-12">
      <nav className="flex h-full items-center justify-between *:space-x-4">
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
