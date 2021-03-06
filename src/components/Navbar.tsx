import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  return (
    <nav className="py-4 flex text-center justify-center px-4 md:px-8 gap-x-2 md:gap-x-8 max-w-screen-xl mx-auto">
      <h3 className="flex items-center text-lg md:text-2xl font-bold mr-auto">
        <Link href="/">
          <a>Vaibhav Kubre</a>
        </Link>
      </h3>
      <NavItem title="🏠 &nbsp;Home" href="/" />
      <NavItem title="📄 &nbsp;Blog" href="/blog" />
    </nav>
  );
};

export default Navbar;

interface NavItemProps {
  title: string;
  href: string;
}

const NavItem = ({ title, href }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const activeClasses = "bg-slate-100 text-slate-900";

  return (
    <Link href={href}>
      <a
        className={`${
          isActive && activeClasses
        } py-2 px-2  md:w-36 uppercase rounded transition hover:bg-slate-100 hover:text-slate-900`}
      >
        {title}
      </a>
    </Link>
  );
};
