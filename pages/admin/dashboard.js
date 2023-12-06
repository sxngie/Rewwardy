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
  getCountFromServer,
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
  const [allAwards, setAllAwards] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);
  const [popularRewards, setPopularRewards] = useState([]);
  const [todayScans, setTodayScans] = useState(0);
  const [allScans, setAllScans] = useState(0);

  const businessid = getCookie("businessId");

  useEffect(() => {
    async function getData() {
      const businessDocRef = doc(db, "business", businessid);
      const businessDocSnap = await getDoc(businessDocRef);
      setBusiness(businessDocSnap.data());
    }
    getData();
  }, [businessid]);

  // Get Rewards Awarded All Time
  useEffect(() => {
    async function getAwardData() {
      // Queries
      const userAwardsQuery = query(
        collection(db, "user_rewards"),
        where("businessId", "==", businessid),
        where("status", "==", "redeemed")
      );
      const userAwardsSnap = await getCountFromServer(userAwardsQuery);
      const awardSnapshot = await getDocs(userAwardsQuery);
      const awardCounts = {};
      awardSnapshot.forEach((doc) => {
        let tempAward = doc.data();
        // Count for Award
        if (awardCounts[tempAward?.challengeName]) {
          awardCounts[tempAward?.challengeName]++;
        } else {
          awardCounts[tempAward?.challengeName] = 1;
        }
        // Count for Users
        // if (userCounts[tempAward?.userId]) {
        //   userCounts[tempAward?.userId]++;
        // } else {
        //   userCounts[tempAward?.userId] = 1;
        // }
      });

      // Converting to an array of objects
      const awardResult = Object.keys(awardCounts).map((key) => {
        return { name: key, timesAwarded: awardCounts[key] };
      });

      // was here
      setPopularRewards(awardResult);
      setAllAwards(userAwardsSnap.data().count);
    }
    async function getAwardsTodayData() {
      // let startOfDay = new Date();
      // startOfDay.setHours(0, 0, 0, 0);
      // // Queries
      // const userScansQuery = query(
      //   collection(db, "user_rewards"),
      //   where("date", ">=", startOfDay),
      //   where("businessId", "==", businessid)
      //   // where("status", "==", "redeemed")
      // );
      // const userScansSnap = await getCountFromServer(userScansQuery);
      // setAwardedToday(userScansSnap.data().count);
        let startOfDay = new Date();
        let endOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        endOfDay.setHours(23, 59, 59, 999);
        const todayAwardedQuery = query(
          collection(db, "user_rewards"),
          // where("awardedAt", ">=", startOfDay),
          // where("date", "<=", endOfDay),
          where("businessId", "==", businessid),
          where("status", "==", "redeemed")
        );
        const todayAwardedSnap = await getCountFromServer(
          todayAwardedQuery
        );
        setAwardedToday(todayAwardedSnap.data().count);
    }

    getAwardsTodayData();
    getAwardData();
  }, [businessid]);

  // Scans Today
  // const todaysScans = async() = {

  // }
  useEffect( () => {
    async function getTodayUserScans() {
      if (businessid) {
        let startOfDay = new Date();
        let endOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        endOfDay.setHours(23, 59, 59, 999);
        const todayUserScansQuery = query(
          collection(db, "user_scans"),
          where("date", ">=", startOfDay),
          // where("date", "<=", endOfDay),
          where("scannedToBusiness", "==", businessid)
        );
        const todayUserScansSnap = await getCountFromServer(
          todayUserScansQuery
        );
        setTodayScans(todayUserScansSnap.data().count);
      }
    }

    async function getUserScans() {
      const userScansQuery = query(
        collection(db, "user_scans"),
        where("scannedToBusiness", "==", businessid)
      );
      const userScansSnap = await getCountFromServer(userScansQuery);
      // Add Here
      const userVisits = await getDocs(userScansQuery);
      const userCounts = {};

      userVisits.forEach(doc => {
        let tempVisit = doc.data()
        // Count for Users
        if (userCounts[tempVisit?.userId]) {
          userCounts[tempVisit?.userId]++;
        } else {
          userCounts[tempVisit?.userId] = 1;
        }
      })
      const userResultPromise = Promise.all(
        Object.keys(userCounts).map(async (key) => {
          let q = query(collection(db, "users"), where("authId", "==", key));
          let userList = [];
          const userDataDocSnap = await getDocs(q);
          userDataDocSnap.forEach((doc) => {
            let tempUser = doc.data();
            userList.push(tempUser);
          });
          return {
            name: `${userList[0]?.firstName} ${userList[0]?.lastName}`,
            visits: userCounts[key],
          };
        })
      );
      userResultPromise.then((userResult) => {
        // userResult is now an array of results
        setTopCustomers(userResult);
      });
      setAllScans(userScansSnap.data().count);
    }

    getUserScans();
    getTodayUserScans();
  }, []);

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
              <h2>Rewards Awarded (All Time)</h2>
              <h3>{allAwards}</h3>
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
                    {customer.name} ({customer.visits})
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
