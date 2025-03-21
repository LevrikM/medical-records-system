import Link from 'next/link';


const Footer = () => {
  return (
      <footer className="footer">
        <div className="footer-links">
          <Link href="https://levrikm.github.io/"><strong>My GitHub Portfolio</strong></Link>
        </div>
        <p>&copy; 2025 Medical Records System</p>
      </footer>
    );
  }

  export default Footer;
  