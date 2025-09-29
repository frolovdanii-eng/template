import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer>
        <div className="footer-columns">
            <div className="footer-column">
                <h4>Компания</h4>
                <ul>
                    <li><a href="#">About Last.fm</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Jobs</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Справка</h4>
                <ul>
                    <li><a href="#">Track My Music</a></li>
                    <li><a href="#">Community Support</a></li>
                    <li><a href="#">Community Guidelines</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Возможности</h4>
                <ul>
                    <li><a href="#">Download Scrobbler</a></li>
                    <li><a href="#">Developer API</a></li>
                    <li><a href="#">Free Music Downloads</a></li>
                    <li><a href="#">Merchandise</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Аккаунт</h4>
                <ul>
                    <li><a href="#">Inbox</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Last.fm Pro</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Мы в соцсетях</h4>
                <ul className="social-links">
                    <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                    <li><a href="#"><i className="fab fa-youtube"></i> YouTube</a></li>
                    <li><a href="#"><i className="fab fa-vk"></i> VKontakte</a></li>
                </ul>
            </div>
        </div>
        
        <div className="language-selector">
            <ul className="language-list">
                <li><a href="#">English</a></li>
                <li><a href="#">Deutsch</a></li>
                <li><a href="#">Español</a></li>
                <li><a href="#">Français</a></li>
                <li><a href="#">Italiano</a></li>
                <li><a href="#">日本語</a></li>
                <li><a href="#">Português</a></li>
                <li><a href="#">Русский</a></li>
                <li><a href="#">Svenska</a></li>
                <li><a href="#">Türkçe</a></li>
                <li><a href="#">简体中文</a></li>
            </ul>
        </div>
        
        <div className="footer-info">
            <p>Time zone: Europe/Belgrade</p>
            <p>© 2022 Last.fm Ltd. All rights reserved.</p>
            <p>
                <a href="#">Terms of Use</a> | 
                <a href="#">Privacy Policy</a> | 
                <a href="#">Legal Policies</a> | 
                <a href="#">Cookies Policy</a> | 
                <a href="#">Do Not Sell My Personal Information</a>
            </p>
            <p>Version 0.95 - DOOMLast.fmMusic</p>
        </div>
  </footer>
  );
}

export default Footer;