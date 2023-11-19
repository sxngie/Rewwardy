import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/admin/search.module.css";
import Link from "next/link";
import { TopNavbar, AdminFooter } from "../../components";
import { useRouter } from "next/router";
import { useState } from "react";
import { TextField } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function AdminSearch() {
  const router = useRouter();
  const [rewardCode, searchRewardCode] = useState("");
  return (
    <>
      <Head>
        <title>Rewwardy: Admin Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <TopNavbar />
      <main className={`${styles.main}`}>
        <div className={styles.box}>
          <div className={styles.searchTitle}>
            <h1>Search for Rewards</h1>
                <div className={styles.data}>
                    <TextField
                        label="Reward Code"
                        className={styles.inputField}
                        value={rewardCode}
                        onChange={(e) => searchRewardCode(e.target.value)}
                    />
                </div>
            </div>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
