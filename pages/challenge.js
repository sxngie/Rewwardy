import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Challenge.module.css";
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
} from "firebase/firestore";
import Image from "next/image";

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
      <Image
          className={styles.picture}
          alt="Reward image"
          src={imageSrc}
          height={275}
          width={275}
        />
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

export default function Challenge() {
  const [user, setUser] = useState();
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

        doc_.data()?.businesses.map(async (businessId) => {
          // Queries
          // Get Challenges
          console.log(businessId);
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
            let tempChallenge = doc.data();
            tempChallenge.id = doc.id;
            challenges_.push(tempChallenge);
            console.log(doc.data());
          });
          setChallenges((challenges) => [...challenges,...challenges_]);

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

  return (
    <>
      <Head>
        <title>Rewwardy: Challenges</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className="row">
          <h2 className={styles.header}>Challenges</h2>
          <br />
          <HamburgerMenu className={styles.shapingBar} />
        </div>
          <div className="row">
            <div id="SectionDiv" className="column">
              <div className="container">
                {inProgress.length > 0 ? (
                <div className={styles.scrollableContainer}>
                  {challenges.map((challenge) => (
                    <CardEntity
                      imageSrc={challenge?.imageUrl}
                      title={challenge?.challengeName}
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
            </div>
          </div>
      </main>
      <Footer></Footer>
    </>
  );
}