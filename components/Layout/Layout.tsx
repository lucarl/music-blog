import styles from './Layout.module.scss';
import { Inter } from 'next/font/google'
import cn from 'classnames';
import Header from '../Header/Header';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }: any) => {
    return (
        <div className={cn(styles.container, inter.className)}>
            <Header title={'Buchla & Beyond'} />
            <div className={styles.body}>
                <Analytics />
                {children}
            </div>
        </div>
    );
}

export default Layout;
