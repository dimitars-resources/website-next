import Link from "next/link";

const Header = () => {
  return (
    <header className="h-12">
      <nav className="flex items-center h-full">
        <Link href="/" className="text-xl">
          Home
        </Link>
      </nav>
    </header>
  );
};

export default Header;
