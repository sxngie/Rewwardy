import styles from "../styles/components/HamburgerMenu.module.scss";
import Link from 'next/link'
import { slide as Menu } from 'react-burger-menu'

const HamburgerMenu = () => (
    <div className={styles.shapingBar}>
        <Menu customBurgerIcon={<HamburgerIcon />} width={'auto'} className={styles.burgermenubar}>
            <div className={styles.listOfItems}>
                <Link href="/dashboard" className={styles.menuItems}>Home</Link>
                <Link href="/reward" className={styles.menuItems}>Rewards</Link>
                <Link href="/challenge" className={styles.menuItems}>Challenges</Link>
                <Link href="/scanner" className={styles.menuItems}>QR Scanner</Link>
            </div>
        </Menu>
    </div>)

const HamburgerIcon = () => (<div className='p-1/2'><svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="white"><path d="M4 6h16M4 12h16M4 18h16"></path></svg></div>)


export default HamburgerMenu