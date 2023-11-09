import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import { Footer } from "../components";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { db } from "@/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async () => {
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // Push to dashboard
        setCookie("userid", user.uid);
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <Head>
        <title>Rewwardy: Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h2 className={styles.header}>Login</h2>
        <br />
        <div className={styles.form}>
          <TextField
            className={styles.inputField}
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField
            className={styles.inputField}
            id="standard-basic"
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            className={styles.clickText}
            id="standard-basic"
            variant="standard"
          >
            Forgot password?
          </Button>
          <br />
          <Button
            className={styles.pinkButton}
            variant="contained"
            onClick={login}
          >
            Submit
          </Button>
          <br />
          <Button
            className={styles.clickText}
            id="standard-basic"
            variant="standard"
            onClick={() => router.push("/register")}
          >
            Create an Account
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
