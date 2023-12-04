import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/admin/dashboard.module.css";
import { AdminHamburgerMenu, AdminFooter, TopNavbar } from "../../components";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
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
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function AdminDashboard() {
  const router = useRouter();

  // Hooks
  const [rewards, setRewards] = useState([]);
  const [business, setBusiness] = useState();
  const [awardedToday, setAwardedToday] = useState(0);
  const [recurringCustomers, setRecurringCustomers] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);
  const [popularRewards, setPopularRewards] = useState([]);
  const [todayScans, setTodayScans] = useState(0);
  const [allScans, setAllScans] = useState(0);

  const businessid = getCookie("businessId");

  useEffect(() => {
    async function getData() {
      // Queries
      const businessRewardQuery = query(
        collection(db, "business_rewards"), /* Change this to business_challenges!! new DB */
        where("businessId", "==", businessid)
      );
      const businessDocRef = doc(db, "business", businessid);
      const businessDocSnap = await getDoc(businessDocRef);
      // Snapshots
      const businessRewardQuerySnapshot = await getDocs(businessRewardQuery);
      let rewards = [];
      businessRewardQuerySnapshot.forEach((doc) => {
        rewards.push(doc.data());
      });
      setRewards(rewards);
      setBusiness(businessDocSnap.data());
    }

    getData();
  }, [businessid]);

  return (
    <>
      <Head>
        <title>Rewwardy: Admin Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <AdminHamburgerMenu className={styles.shapingBar} />
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Home - {business?.businessName}</h1>
          </div>
          <div className={styles.data}>
            <div>
              <h2>Rewards Awarded (Today)</h2>
              <h3>{awardedToday}</h3>
              <h2>Daily Recurring Customers</h2>
              <h3>{recurringCustomers}</h3>
            </div>
            <div>
              <h2>Scans (Today)</h2>
              <h3>{todayScans}</h3>
              <h2>Scans (All Time)</h2>
              <h3>{allScans}</h3>
            </div>
          </div>
          <div className={styles.leaderboard}>
            <h4>Top Loyal Customers (Visits)</h4>
            {topCustomers.length > 0 ? (
              <ol className={styles.lists}>
                {topCustomers.map((customer) => (
                  <li>
                    {customer.firstName} {customer.lastName} ({customer.visits})
                  </li>
                ))}
              </ol>
            ) : (
              <p className={styles.lists}>No customers yet!</p>
            )}
            <h4>Popular Rewards (Redeemed)</h4>
            {popularRewards.length > 0 ? (
              <ol className={styles.lists}>
                {popularRewards.map((reward) => (
                  <li>
                    {reward.name} ({reward.timesAwarded})
                  </li>
                ))}
              </ol>
            ) : (
              <p className={styles.lists}>No rewards awarded yet!</p>
            )}
          </div>
          <div className={styles.btnrow}>
            <Button
              variant="contained"
              className={styles.btn}
              onClick={() => router.push("/admin/rewards/create")}
            >
              Create Reward
            </Button>
            <br />
            <Button
              variant="contained"
              className={styles.btn}
              onClick={() => router.push("/admin/rewards")}
            >
              View All Rewards
            </Button>
          </div>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
