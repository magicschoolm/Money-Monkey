function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              money and monkey<span>.</span>
            </a>
            <p>Made with love.</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <a href="/home">Home</a>
            <a href="/workspace">Work Space</a>
            <a href="https://hextorq.tech/" >hextorq.tech </a>
          </div>

          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <p>Have a question or try?</p>
            <a href="mailto:hello@example.com">
              hello@hextorq.tech
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} money and monkey, All rights reserved.</p>

          <div className="footer-socials">
            <a href="https://www.instagram.com/hextorq"
               target="_blank"
               rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/hextorq-technologies/posts/"
               target="_blank"
               rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
