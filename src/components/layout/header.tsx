import Link from "next/link";
import { auth } from "@/lib/auth";
import UserProfile from "../user-profile";

const tabs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Whitelist", href: "/whitelist", memberOnly: true },
  { name: "Dashboard", href: "/dashboard", adminOnly: true },
];

const Header = async () => {
  const session = await auth();

  const hasPermission = (tab: (typeof tabs)[0]) => {
    if (tab.memberOnly && !session?.user) {
      return true;
    }

    if (tab.adminOnly && (!session?.user || !session.user.isAdmin)) {
      return true;
    }

    return false;
  };

  return (
    <header className="fixed top-0 h-16 w-full border-b border-white/5 bg-background">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <div className="space-x-6">
          {tabs.map((tab) => {
            if (hasPermission(tab)) return null;
            return (
              <Link key={tab.name} href={tab.href}>
                {tab.name}
              </Link>
            );
          })}
        </div>

        {session?.user && (
          <UserProfile image={session.user.image} name={session.user.name} isAdmin={session.user.isAdmin} />
        )}
      </nav>
    </header>
  );
};

export default Header;
