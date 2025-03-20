import Link from 'next/link';


const Footer = () => {
  return (
      <footer className="footer">
        <p>&copy; 2025 Медичні картки. Всі права захищені.</p>
        <div className="footer-links">
          <Link href="/privacy">Політика конфіденційності</Link>
          <Link href="/terms">Умови використання</Link>
        </div>
      </footer>
    );
  }

  export default Footer;
  