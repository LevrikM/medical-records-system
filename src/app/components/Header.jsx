import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Медичні картки</div>
      <nav className="nav">
        <Link href="/">Головна</Link>
        <Link href="/about">Про нас</Link>
        <Link href="/contact">Контакти</Link>
      </nav>
    </header>
  );
};

export default Header;