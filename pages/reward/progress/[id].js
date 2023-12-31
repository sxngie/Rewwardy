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
  getDocs,
  where,
  query,
  getCountFromServer,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { getCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export default function RewardLists() {
  const [reward, setReward] = useState();
  const [scanCount, setScanCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const userId = getCookie("userid");

  useEffect(() => {
    async function getData() {
      // Fetch User Challenge
      if (id) {
      const rewardDocRef = doc(db, "user_challenges", id);
      const rewardDocSnap = await getDoc(rewardDocRef);
      setReward(rewardDocSnap.data());

      // Fetch Scan Amounts
      const userScansQuery = query(
        collection(db, "user_scans"),
        where("userId", "==", userId),
        where("scannedToBusiness", "==", rewardDocSnap.data().businessId),
        where("status", "==", "NOT_USED"),
        where("usedForReward", "==", "NOT_USED")
      );
      const userScansSnap = await getCountFromServer(userScansQuery);

      
      // Set Values
      if ((userScansSnap.data().count == 0)){
        setScanCount(0)
      }
      else {
      setScanCount(userScansSnap.data().count -1);
      }
      // console.log(userScansSnap.data().count);
      }

    }

    getData();
  }, [id]);

  async function redeemReward() {
    setLoading(true);
    // Update User Challenges
    const rewardDocRef = doc(db, "user_challenges", id);
    await updateDoc(rewardDocRef, {
      status: "complete",
    })
      .then(async () => {
        // Create Reward
        await addDoc(collection(db, "user_rewards"), {
          ...reward,
          dateReceived: new Date(),
          awardedAt: null,
          status: "available",
        }).then(async (newReward) => {
          // Look for X amount of scans
          const q = query(
            collection(db, "user_scans"),
            where("userId", "==", userId),
            where("scannedToBusiness", "==", reward.businessId),
            where("status", "==", "NOT_USED"),
            where("usedForReward", "==", "NOT_USED")
          );
          const userScansSnapshot = await getDocs(q);
          // change 'status' and 'usedForReward'
          // console.log(userScansSnapshot);

          userScansSnapshot.forEach(async (doc) => {
            // let tempScan = doc.ref;
            // tempScan.id = doc.id
            // console.log(doc.id)
            await updateDoc(doc.ref, {
              status: "USED",
              usedForReward: newReward.id,
            });
          });
        })
          .then(() => router.push("/dashboard"))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Head>
        <title>Rewwardy: Reward Progress</title>
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
              <img className={styles.picture}
                alt="Reward image"
                src={reward?.imageUrl}
                height={275}
                width={275}
              />
            </div>
            <br />
            <div className={styles.info}>
              <h2>Progress</h2>
              <p>
                Visits: (
                {(scanCount < reward?.milestoneGoal)
                  ?  scanCount
                  : reward?.milestoneGoal}
                /{reward?.milestoneGoal})
              </p>
              <br />
              <h2>Description</h2>
              <p>{reward?.description}</p>
              <br />
              <h2>Valid Until</h2>
              <p>{reward?.validUntil}</p>
              <br />
              {scanCount >= reward?.milestoneGoal && (
                <button className={styles.pinkButton} variant="contained" onClick={() => redeemReward()}>
                  {"Redeem"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
