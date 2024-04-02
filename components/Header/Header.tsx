import React from 'react';
import styles from './Header.module.scss';
import header from '../../assets/images/header.png';
import Image from 'next/image'

interface HeaderProps {
  title: string;
  menuItems?: Array<{ text: string; link: string }>;
}

const Header: React.FC<HeaderProps> = ({ title, menuItems }) => {
  return (
    <div className={styles.container}>
        <Image className={styles.header_img} src={header} alt='header'/>
        <nav>
            <ul>
            {menuItems?.map((item, index) => (
                <li key={index}>
                <a href={item.link}>{item.text}</a>
                </li>
            ))}
            </ul>
        </nav>
    </div>
  );
};

export default Header;
