import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/inprogress.module.css";
import { HamburgerMenu, Footer } from "@/components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  where,
  query,
  getCountFromServer,
  addDoc,
} from "firebase/firestore";
import { truncateString } from "@/utils/helpers";
import { getCookie } from "cookies-next";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function RewardLists() {
  const [reward, setReward] = useState();
  const [scanCount, setScanCount] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  const userId = getCookie("userid");

  useEffect(() => {
    async function getChallengeData() {
      // Fetch User Challenge
      if (id) {
        const rewardDocRef = doc(db, "business_challenges", id);
        const rewardDocSnap = await getDoc(rewardDocRef);
        setReward(rewardDocSnap.data());

        const userScansQuery = query(
          collection(db, "user_scans"),
          where("userId", "==", userId),
          where("scannedToBusiness", "==", rewardDocSnap.data().businessId),
          where("status", "==", "NOT_USED"),
          where("usedForReward", "==", "NOT_USED")
        );
        const userScansSnap = await getCountFromServer(userScansQuery);
        console.log(userScansSnap.data().count);
        // Set Values
        setScanCount(userScansSnap.data().count);
      }

    }

    getChallengeData();
  }, [id]);

  // useEffect(() => {
  //   async function getScanCounter() {
  //     // Fetch Scan Amounts
  //     const userScansQuery = query(
  //       collection(db, "user_scans"),
  //       where("userId", "==", userId),
  //       // where("scannedToBusiness", "==", tempReward.businessId),
  //       where("status", "==", "NOT_USED"),
  //       where("usedForReward", "==", "NOT_USED")
  //     );
  //     const userScansSnap = await getCountFromServer(userScansQuery);
  //     console.log(userScansSnap.data().count);
  //     // Set Values
  //     setScanCount(userScansSnap.data().count);
  //   }

  //   getScanCounter();
  // }, [id]);

  // Track challenge
  async function trackChallenge() {
    await addDoc(collection(db, "user_challenges"), {
      ...reward,
      userId: userId,
      status: "progress",
    })
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Head>
        <title>Rewwardy: Challenge Info</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <HamburgerMenu className={styles.shapingBar} />
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{reward?.challengeName}</h1>
          </div>
          <div className={styles.box}>
            <div className={styles.imgcanvas}>
              <Image
                className={styles.picture}
                alt="Reward image"
                src={reward?.imageUrl}
                height={275} width={275}
              />
            </div>
            <br />
            <div className={styles.info}>
              <h2>Current Visits: {scanCount > 0 ? scanCount-1 : 0 }</h2>
              <br />
              <h2>Description</h2>
              <p>{reward?.description}</p>
              <br />
              <h2>Valid Until</h2>
              <p>{reward?.validUntil}</p>
              <br />
            </div>
            <br />
            <Button className={styles.pinkButton} variant="contained"  onClick={() => trackChallenge()}>
              Track
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
