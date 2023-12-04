import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/admin/search.module.css";
import Link from "next/link";
import { AdminHamburgerMenu, AdminFooter } from "../../components";
import { useRouter } from "next/router";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export default function AdminSearch() {
  const router = useRouter();
  const [rewardCode, searchRewardCode] = useState("");
  const [recipient, setRecipient] = useState("");
  const [reward, setReward] = useState("");

  const businessId = getCookie("businessId");
  // Fetch for Reward
  const searchForReward = async () => {
    // Fetch User Reward
    const rewardDocRef = doc(db, "user_challenges", rewardCode);
    const rewardDocSnap = await getDoc(rewardDocRef);
    const rewardResult = rewardDocSnap.data();

    // Fetch Receipient Data
    const recipientDocRef = doc(db, "users", rewardResult.owner);
    const recipientDocSnap = await getDoc(recipientDocRef);
    const recipientResult = recipientDocSnap.data();
    setReward(rewardResult);
    setRecipient(recipientResult);
  };

  // Change Status to Redeemed
  const redeemReward = async () => {
    // Reward Reference
    const rewardDocRef = doc(db, "user_challenges", rewardCode);
    // Update Status
    await updateDoc(rewardDocRef, { status: "redeemed", awardedAt: new Date() })
      .then(() => alert("Reward Redeemed!"))
      .catch((err) => console.log(err));
    router.reload();
  };

  return (
    <>
      <Head>
        <title>Rewwardy: Admin Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <AdminHamburgerMenu />
      <main className={`${styles.main}`}>
        <div className={styles.box}>
          <div className={styles.searchTitle}>
            <h1>Search for Rewards</h1>
            <br />
            <div className={styles.searchbox}>
              <TextField
                label="Reward Code"
                className={styles.inputField}
                value={rewardCode}
                onChange={(e) => searchRewardCode(e.target.value)}
              />
              <Button
                variant="contained"
                className={styles.searchbtn}
                onClick={() => searchForReward()}
              >
                Search
              </Button>
            </div>
          </div>

          <div className={styles.data}>
            {/* Reward Details */}
            <div>
              <h2>Reward:</h2>
              <h3>{reward ? reward.reward_name : "Enter Code..."}</h3>
              <h2>Description:</h2>
              <p>
                {reward
                  ? reward.description
                  : "Here goes the Reward Description"}
              </p>

              <h2>Actions</h2>
              <Button
                variant="contained"
                className={styles.btn}
                onClick={() => redeemReward()}
              >
                Award Receipient
              </Button>
            </div>
            <div>
              <h2>Valid Until:</h2>
              <h3>{reward ? reward.validUntil : "Valid Date"}</h3>
              <h2>Status</h2>
              <h3>{reward ? reward.status : "Unknown"}</h3>
            </div>
            {/* User Receiving Award Details */}
            <div>
              <h2>Reward Receipient:</h2>
              <h3>
                {recipient
                  ? `${recipient.firstName} ${recipient.lastName}`
                  : "User's Name"}
              </h3>
            </div>
          </div>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
