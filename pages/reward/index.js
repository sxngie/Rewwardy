import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Reward.module.css";
import Link from "next/link";
import { Footer } from "../../components";
import HamburgerMenu from "../../components/HamburgerMenu.js";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";

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
        <Image
          className={styles.picture}
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
      <Link href={to}>
        <button className={styles.pinkButton}>{action}</button>
      </Link>
      <div className={styles.expireDate}>{expDate}</div>
    </div>
  );
}

export default function RewardsPage() {
  const [user, setUser] = useState();
  const [rewards, setRewards] = useState([]);

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
          // console.log(businessId);
          const businessRewardQuery = query(
            collection(db, "business_challenges"),
            where("businessId", "==", businessId)
          );
          // Snapshots
          const businessRewardQuerySnapshot = await getDocs(
            businessRewardQuery
          );

          let rewards_ = [];
          businessRewardQuerySnapshot.forEach((doc) => {
            let tempReward = doc.data();
            tempReward.id = doc.id;
            rewards_.push(tempReward);
          });
          setRewards(rewards_);
        });
      });
    }

    getData();
  }, [userid]);

  return (
    <>
      <Head>
        <title>Rewwardy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.row}>
          <h1 className={styles.header}>Rewards</h1>
          <br />
          <HamburgerMenu className={styles.shapingBar} />
        </div>
        <div className="row">
          <div id="SectionDiv" className="column">
            <div className={styles.container}>
              {rewards.length > 0 ? (
                <div className={styles.scrollableContainer}>
                  {rewards.map((reward) => (
                    <CardEntity
                      imageSrc={reward?.imageUrl}
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
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public/data", "cards.json");
  const jsonData = fs.readFileSync(filePath);
  const cards = JSON.parse(jsonData);

  return {
    props: {
      cards,
    },
  };
}
