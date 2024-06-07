import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="site-footer">
      <small className="site-footer__text">
        &copy; Stephen Werronen - 2024
      </small>
      <small className="site-footer__text--latin">
        <span>Stephanus Werronensis me fecit</span>
        <span>Anno Domini MMXXiiij</span>
      </small>
    </footer>
  );
};

export default Footer;
