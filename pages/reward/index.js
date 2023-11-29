import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Reward.module.css'
import Link from "next/link";
import { Footer } from "../../components";
import HamburgerMenu from '../../components/HamburgerMenu.js'
import { useRouter } from "next/router";
import fs from 'fs';
import path from 'path';

const inter = Inter({ subsets: ['latin'] })

function CardEntity({ imageSrc, title, businessName, description, expDate }) {
  return (
      <div className={styles.cardEntity}>
          <div className={styles.pictureFrame}><img id="Reward image"  src={imageSrc} className={styles.picture}/></div> {}
          <h2 className={styles.cardLabel}>{title}</h2>
          <h3 className={styles.business}>{businessName}</h3>
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

export default function Home({ cards }) {
  return (
    <>
      <Head>
        <title>Rewwardy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.row}>
            <h1 className={styles.header}>Rewards</h1>
            <br/>
            <HamburgerMenu className={styles.shapingBar}/>
        </div>
        <div className="row">
          <div id = "SectionDiv" className = "column" >
            <div className={styles.container}>
              <div className={styles.scrollableContainer}>
                { cards.map((card, index) => (
                  <CardEntity key={index} {...card} />))}
              </div>
          </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/data', 'cards.json');
  const jsonData = fs.readFileSync(filePath);
  const cards = JSON.parse(jsonData);

  return {
    props: {
      cards,
    },
  };
}