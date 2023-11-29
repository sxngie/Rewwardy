import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { Footer } from "../components";
import HamburgerMenu from "../components/HamburgerMenu.js";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

function CardEntity({
  imageSrc,
  title,
  businessName,
  description,
  expDate,
  action,
}) {
  return (
    <div className={styles.cardEntity}>
      <div className={styles.pictureFrame}>
        <img src={imageSrc} className={styles.picture} />
      </div>
      <h2 className={styles.cardLabel}>{title}</h2>
      <h3 className={styles.business}>{businessName}</h3>
      <div className={styles.description}>
        <p>{description}</p>
      </div>
      <Link href="/">
        <button className={styles.pinkButton}>{action}</button>
      </Link>
      <div className={styles.expireDate}>{expDate}</div>
    </div>
  );
}

export default function Home() {
  const [user, setUser] = useState();
  const [rewards, setRewards] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  const userid = getCookie("userid");

  useEffect(() => {
    async function getData() {
      // Fetch User
      const userDocRef = doc(db, "users", userid);
      const userDocSnap = await getDoc(userDocRef);
      let userInfo = userDocSnap.data();
      setUser(userInfo);
      let rewards = [];
      userInfo?.businesses.map(async (businessId) => {
        // Queries
        const businessRewardQuery = query(
          collection(db, "business_rewards"),
          where("businessId", "==", businessId)
        );
        // Snapshots
        const businessRewardQuerySnapshot = await getDocs(businessRewardQuery);
        businessRewardQuerySnapshot.forEach((doc) => {
          rewards.push(doc.data());
        });
      });

      setRewards(rewards);
    }

    getData();
  }, [userid]);

  return (
    <>
      <Head>
        <title>Rewwardy: Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <HamburgerMenu className={styles.shapingBar} />
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.body}>
          <div className={styles.header}>
            <h1>Home</h1>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionHead}>Rewards Available</h2>
            {rewards.length > 0 ? (
              <div className={styles.scrollableContainer}>
                {rewards.map((reward) => (
                  <CardEntity
                    title={reward.name}
                    businessName={reward.businessName}
                    description={reward.description}
                    expDate={reward.validUntil}
                    action="Redeem"
                    to={`/reward/redeem/${5}`}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.norewards}>
                <p>Still no rewards. Go visit you local shop.</p>
              </div>
            )}
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionHead}>In Progress</h2>
            {inProgress.length > 0 ? (
              <div className={styles.scrollableContainer}>
                {inProgress.map((challenge) => (
                  <CardEntity
                    title={challenge?.name}
                    businessName={challenge?.businessName}
                    description={challenge?.description}
                    expDate={challenge?.validUntil}
                    action="View Progress"
                  />
                ))}
              </div>
            ) : (
              <div className={styles.norewards}>
                <p>
                  Still haven't started a challenge? Go visit you local shop.
                </p>
              </div>
            )}
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionHead}>New Challenges</h2>
            {inProgress.length > 0 ? (
              <div className={styles.scrollableContainer}>
                {challenges.map((challenge) => (
                  <CardEntity
                    title={challenge?.name}
                    businessName={challenge?.businessName}
                    description={challenge?.description}
                    expDate={challenge.validUntil}
                    action="More Info"
                    to={`/reward/more-info/${5}`}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.norewards}>
                <p>
                  Still haven't started a challenge? Go visit you local shop.
                </p>
              </div>
            )}
          </div>
          <br />
        </div>
      </main>
      <Footer />
    </>
  );
}
