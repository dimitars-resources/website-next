import Link from "next/link";
import Button from "./ui/button";
import { signOutAction } from "@/lib/actions";

const Header = () => {
  return (
    <header className="h-12">
      <nav className="flex h-full items-center space-x-4 *:text-xl">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>

        <form action={signOutAction}>
          <Button type="submit">Log Out</Button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
