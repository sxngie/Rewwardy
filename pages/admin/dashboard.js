import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/admin/dashboard.module.css";
import Link from "next/link";
import { TopNavbar, AdminFooter } from "../../components";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function AdminDashboard() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Rewwardy: Admin Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <TopNavbar />
      <main className={`${styles.main}`}>
        <div className={styles.box}>
          <div className={styles.rewardsadded}>
            <h1>Rewards Awarded</h1>
            <div className={styles.data}>
              <h2>Rewards Awarded (Today)</h2>
              <h3>10</h3>
              <h2>Daily Recurring Customers</h2>
              <h3>25</h3>
            </div>
          </div>
          <div className={styles.leaderboard}>
            <h4>Top Loyal Customers (Visits)</h4>
            <ol>
              <li>Juan Matos (170)</li>
              <li>Lucia Aires (155)</li>
              <li>Carla Vives (148)</li>
            </ol>
            <h4>Popular Rewards (Redeemed)</h4>
            <ol>
              <li>Juan Matos (170)</li>
              <li>Lucia Aires (155)</li>
              <li>Carla Vives (148)</li>
            </ol>
          </div>
          <div className={styles.btnrow}>
            <Button
              variant="contained"
              className={styles.btn}
              onClick={() => router.push("/admin/rewards/create")}
            >
              Create Reward
            </Button>
            <br/>
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