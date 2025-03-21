import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Медичні картки</div>
      <nav className="nav">
        <Link href="/">Головна</Link>
        <Link href="/notification-form"><strong>Реєстрація на сайті</strong></Link>
        <Link href="/contact">Контакти</Link>
        <Link href="/about">Про нас</Link>
        <Link href="/virtual-list"><strong>Пацієнти</strong></Link>
      </nav>
    </header>
  );
};

export default Header;