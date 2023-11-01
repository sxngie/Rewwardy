import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link";
import { Footer } from "../components";
import HamburgerMenu, { Links } from '../components/HamburgerMenu.js'
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })

function CardEntity({ imageSrc, title, businessName, description, expDate }) {
    return (
        <div className={styles.cardEntity}>
            <h3 className={styles.cardLabel}>{title}</h3>
            <h4 className={styles.business}>{businessName}</h4>
            <div className={styles.description}>
                <p>{description}</p>
            </div>
            <Link href="/">
                <button className={styles.pinkButton}>Redeem</button>
            </Link>
            <div className={styles.expireDate}>{expDate}</div>
        </div>
    );
  }

export default function Home() {
  return (
    <>
      <Head>
        <title>Rewwardy: Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className="row">
            <h1 className={styles.header}>Home</h1>
            <br/>
            <HamburgerMenu className={styles.shapingBar}/>
        </div>
        <div className="row">
          <div id = "SectionDiv" className = "column" >
            <h2 className ={styles.sectionHead}>New Challenges</h2>
            <div className="row">
                <div id = "SectionDiv" className = "column" >
                    <div className='container'>
                        <div className={styles.scrollableContainer}>
                            <CardEntity title='Free Cookie' businessName='Friends Cafe' description='Unlock with 4 visits!' expDate='January 20th, 2024'></CardEntity>
                            <CardEntity title='Bubble Tea 8oz' businessName='Bubble Tea Yum' description='Buy two, get one free!' expDate='April 29th, 2024'></CardEntity>
                            <CardEntity title='1 Free Latte' businessName='Shaktea' description='Unlock after 3 visits! ' expDate='March 12th, 2024'></CardEntity>
                            <CardEntity title='Half-Off Pizza' businessName='Papas Pizza' description='Spend $25 or more.' expDate='January 5th, 2024'></CardEntity>
                            <CardEntity title='Sweet Treat' businessName='Twin Rolls' description='Unlock after 8 visits!' expDate='February 10th, 2024'></CardEntity>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="row">
          <h2 className ={styles.sectionHead}>Rewards Available</h2>
          <div id = "SectionDiv" className = "column" >
            <div className='container'>
              <div className={styles.scrollableContainer}>
                <CardEntity title='Free Chai Latte' businessName='Friends Cafe' description='$25 worth of purchases.' expDate='March 29th, 2024'></CardEntity>
                <CardEntity title='Free Pastry' businessName='Cabra Tosta' description='Visited 6/6 times!' expDate='December 10th, 2023'></CardEntity>
                <CardEntity title='Milkshake 50%' businessName='Rex Cream' description='Completed $10 purchase.' expDate='February 3rd, 2024'></CardEntity>
                <CardEntity title='Free Ice Cream' businessName='Rex Cream' description='Visited 4/4 times!.' expDate='April 6th, 2024'></CardEntity>
                <CardEntity title='Free 8oz Latte' businessName='Friends Cafe' description='Visited 8/8 times!' expDate='February 17th, 2024'></CardEntity>
                </div>
            </div>
          </div>
        </div>
        <br/>
        <div className="row">
          <h2 className ={styles.sectionHead}>In Progress</h2>
          <div id = "SectionDiv" className = "column" >
            <div className='container'>
              <div className={styles.scrollableContainer}>
                    <CardEntity title='Free Iced Coffee' businessName='Friends Cafe' description='Visited 0/8 times!' expDate='March 29th, 2024'></CardEntity>
                    <CardEntity title='Free Tequila Shot' businessName='Off the Wall' description='Visited 2/6 times!' expDate='December 10th, 2023'></CardEntity>
                    <CardEntity title='Bubble Tea 8oz' businessName='Bubble Tea Yum' description='Complete $10 purchase.' expDate='February 3rd, 2024'></CardEntity>
                    <CardEntity title='Sweet Treat' businessName='Friends Cafe' description='Visited 8/10 times!' expDate='February 17th, 2024'></CardEntity>
                    <CardEntity title='Side of Fries' businessName='Jarana' description='Visited 2/4 times!' expDate='February 17th, 2024'></CardEntity>
                </div>
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  )
}
