import Link from "next/link";
import Image from "next/image";
import Button from "../ui/button";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/lib/actions";
import Avatar from "../avatar";

const tabs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard", adminOnly: true },
];

const Header = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 h-16 w-full border-b border-white/5 bg-background">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <div className="space-x-6">
          {tabs.map((tab) => {
            if (tab.adminOnly && (!session?.user || !session.user.isAdmin)) return null;
            return (
              <Link key={tab.name} href={tab.href}>
                {tab.name}
              </Link>
            );
          })}
        </div>

        {session?.user && <Avatar image={session.user.image} />}
      </nav>
    </header>
  );
};

export default Header;
