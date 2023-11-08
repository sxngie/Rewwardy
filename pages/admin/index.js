import Head from "next/head";
import styles from "@/styles/admin/login.module.css";
import Link from "next/link";
import { TopNavbar, AdminFooter } from "../../components";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Space_Grotesk } from "next/font/google";
import { setCookie } from "cookies-next";
import { db } from "@/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = async () => {
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // query for business with uid
        const q = query(
          collection(db, "business"),
          where("owner", "==", user.uid),
          limit(1)
        );
        // Set Cookie for businessid
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setCookie("businessid", doc.id);
        });
        // Push to dashboard
        router.push("/admin/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    // await getDocs(q).then(data => console.log(data.data()))

    // console.log(querySnapshot)
  };

  return (
    <>
      <Head>
        <title>Rewwardy: Admin Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      {/* <TopNavbar/> */}
      <main className={`${styles.main} `}>
        <h1 className={`${styles.header} ${space_grotesk.className}`}>
          Login Business
        </h1>
        <div className={styles.form}>
          <TextField
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            className={styles.button}
            onClick={() => login()}
          >
            Login
          </Button>
          <br />
          <Button className={styles.textbutton} id="standard-basic" variant="standard">
            Create an Account
          </Button>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}