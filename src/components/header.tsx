import Link from "next/link";

const Header = () => {
  return (
    <header className="h-12">
      <nav className="flex items-center h-full *:text-xl space-x-4">
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
      </nav>
    </header>
  );
};

export default Header;
