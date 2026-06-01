import Link from 'next/link';
import HeaderActions from './HeaderActions';

const Header = () => {
  return (
    <header className="bg-[linear-gradient(to_right,var(--background),transparent,var(--surface))] backdrop-blur-md fixed top-0 left-0 right-0 z-100">
      <nav className="app-container px-5 py-3 flex justify-between items-center gap-5">
        {/* logo */}
        <div>
          <Link href="/">
            <div className="flex items-end justify-center gap-0.5 font-primary text-4xl font-semibold">
              <span className="bg-linear-to-r from-text to-primary bg-clip-text text-transparent">
                alamin
              </span>

              <div className="mb-1.5 h-2 w-2 rounded-full bg-text" />
            </div>
          </Link>
        </div>

        <HeaderActions />
      </nav>
    </header>
  );
};

export default Header;
