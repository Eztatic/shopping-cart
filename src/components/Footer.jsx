import Styles from '/src/styles/Footer.module.css'
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
      return (
            <footer className={Styles.footer}>
                  <div>
                        <h1 className={Styles['logo-footer']}>Outfique</h1>
                        <ul>
                              <li><a href="#">Contact Us</a></li>
                              <li><a href="#">FAQ</a></li>
                              <li><a href="#">Privacy Policy</a></li>
                              <li><a href="#">Terms & Conditions</a></li>
                              <li><a href="#">Returns & Exchanges</a></li>
                        </ul>
                        <div className={Styles.icons}>
                              <FaInstagram />
                              <FaFacebookF />
                              <FaXTwitter />
                        </div>
                  </div>
                  <div>
                        <p>Outfique © 2025</p>
                        <p>All Creative Rights Protected by Outfique</p>
                  </div>
            </footer>
      );
}

export default Footer;