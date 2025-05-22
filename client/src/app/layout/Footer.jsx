import React from 'react';
import './Footer.css';
import { FaTelegramPlane, FaInstagram, FaVk, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="https://t.me/+2KI8vjovLygyNTQy" target="_blank" rel="noopener noreferrer">
          <FaTelegramPlane size={24} />
        </a>
        <a href="https://www.instagram.com/elbrus.bootcamp/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} />
        </a>
        <a href="https://vk.com/elbrusbootcamp" target="_blank" rel="noopener noreferrer">
          <FaVk size={24} />
        </a>
        <a href="https://github.com/Dencheny/English_is_great" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
      </div>

      <div className="footer-info">
        <p>© {new Date().getFullYear()} MVD-Polo. Все права защищены.</p>
      </div>
    </footer>
  );
}
