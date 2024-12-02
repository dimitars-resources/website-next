import Link from "next/link";
import Image from "next/image";
import Button from "../ui/button";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/lib/actions";

const tabs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard" },
];

const Header = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 z-10 h-16 w-full border-b border-white/5 bg-background">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <div className="space-x-6">
          {tabs.map(({ name, href }) => (
            <Link key={name} href={href} className="underline-offset-8 hover:underline">
              {name}
            </Link>
          ))}
        </div>

        {session?.user && (
          <form action={signOutAction} className="flex items-center space-x-2">
            <Button
              type="submit"
              size="small"
              intent="ghost"
              rounded="full"
              className="px-4 ring-white/20 hover:ring-1"
            >
              Log Out
            </Button>
            <Image src={session.user.image} alt="Profile" width={40} height={40} className="rounded-full" />
          </form>
        )}
      </nav>
    </header>
  );
};

export default Header;
