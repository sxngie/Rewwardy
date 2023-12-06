import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/inprogress.module.css";
import { HamburgerMenu, Footer } from "@/components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, where, query, getCountFromServer } from "firebase/firestore";
import { truncateString } from "@/utils/helpers";
import { getCookie } from "cookies-next";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function RewardLists() {
  const [reward, setReward] = useState();
  const router = useRouter();
  const { id } = router.query;

  const userId = getCookie("userid");

  useEffect(() => {
    async function getData() {
      if (id) {
      const rewardDocRef = doc(db, "user_rewards", id);
      const rewardDocSnap = await getDoc(rewardDocRef);
      // Set Values
      setReward(rewardDocSnap.data());
      }
    }

    getData();
  }, [id]);


  return (
    <>
      <Head>
        <title>Rewwardy: Reward Details</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <HamburgerMenu className={styles.shapingBar} />
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Here&apos;s your reward!</h1>
          </div>
          <div className={styles.box}>
          <div className={styles.imgcanvas}>
              <Image alt="Reward image" src={reward?.imageUrl} className={styles.picture} height={275} width={275} />
            </div>
            <br/>
            <div className={styles.info}>
              <h2>Description</h2>
              <p>{reward?.description}</p>
              <br />
              <h2>Status</h2>
              <p>{reward?.status}</p>
              <br/>
              <h2>Valid Until</h2>
              <p>{reward?.validUntil}</p>
              <br />
              <h2>Reward Code</h2>
            </div>
            <br/>
            <div className={styles.rewardCode}>
              <p>{id}</p>
            </div>
            <div className={styles.info}>
              <br/>
              <p>Show the above code to the cashier upon your next visit!</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
