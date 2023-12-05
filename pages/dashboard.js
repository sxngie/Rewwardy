import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { Footer } from "../components";
import HamburgerMenu from "../components/HamburgerMenu.js";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

function CardEntity({
  imageUrl,
  title,
  businessName,
  description,
  expDate,
  action,
  to,
}) {
  return (
    <div className={styles.cardEntity}>
      <div className={styles.pictureFrame}>
        <img className={styles.picture}>{imageUrl}</img>
      </div>
      <h2 className={styles.cardLabel}>{title}</h2>
      <h3 className={styles.business}>{businessName}</h3>
      <div className={styles.description}>
        <p>{description}</p>
      </div>
      <Link href={to}>
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
      const user_query = query(
        collection(db, "users"),
        where("authId", "==", userid)
      );
      const userDoc = await getDocs(user_query);
      userDoc.forEach((doc_) => {
        // console.log(doc_.data());
        setUser(doc_.data());

        doc_.data()?.businesses.map(async (businessId) => {
          // Queries
          // Get Challenges
          const businessRewardQuery = query(
            collection(db, "business_challenges"),
            where("businessId", "==", businessId)
          );
          // Snapshots
          const businessRewardQuerySnapshot = await getDocs(
            businessRewardQuery
          );

          // Fill up lists
          let challenges_ = [];
          // Challenges
          businessRewardQuerySnapshot.forEach((doc) => {
            let tempChallenges = doc.data();
            tempChallenges.id = doc.id;
            challenges_.push(tempChallenges);
          });

          setChallenges(challenges_);
        });
      });
    }

    getData();
  }, [userid]);

  // In Progress
  useEffect(() => {
    async function getInProgressData() {
      // Get In Progress
      const inProgressQuery = query(
        collection(db, "user_challenges"),
        where("status", "==", "progress"),
        where("userId", "==", userid)
      );
      // Snapshots
      const inProgressQuerySnapshot = await getDocs(inProgressQuery);

      // In Progress
      let inProgress_ = [];
      inProgressQuerySnapshot.forEach((doc) => {
        let tempProgress = doc.data();
        tempProgress.id = doc.id;
        inProgress_.push(tempProgress);
      });

      setInProgress(inProgress_);
    }

    getInProgressData();
  }, [userid]);

  // Rewards
  useEffect(() => {
    async function getRewardData() {
      // Get Rewards
      const rewardsQuery = query(
        collection(db, "user_rewards"),
        where("userId", "==", userid)
      );
      // Snapshots
      const rewardsQuerySnapshot = await getDocs(rewardsQuery);

      // Rewards
      let rewards_ = [];
      rewardsQuerySnapshot.forEach((doc) => {
        let tempReward = doc.data();
        tempReward.id = doc.id;
        rewards_.push(tempReward);
      });

      setRewards(rewards_);
    }

    getRewardData();
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
                    title={reward?.challengeName}
                    businessName={reward?.businessName}
                    description={reward?.description}
                    expDate={reward?.validUntil}
                    action="Redeem"
                    to={`/reward/redeem/${reward?.id}`}
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
                {inProgress.map((progress) => (
                  <CardEntity
                    title={progress?.challengeName}
                    businessName={progress?.businessName}
                    description={progress?.description}
                    expDate={progress?.validUntil}
                    action="View Progress"
                    to={`/reward/progress/${progress.id}`}
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
            {challenges.length > 0 ? (
              <div className={styles.scrollableContainer}>
                {challenges.map((challenge) => (
                  <CardEntity
                    title={challenge?.challengeName}
                    businessName={challenge?.businessName}
                    description={challenge?.description}
                    expDate={challenge?.validUntil}
                    action="More Info"
                    to={`/reward/more-info/${challenge.id}`}
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
