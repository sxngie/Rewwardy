import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/admin/register.module.css";
import Link from "next/link";
import { TopNavbar, Footer, AdminFooter } from "../../components";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLogin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");

  const createBusinessAccount = async () => {
    await addDoc(collection(db, "business"), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      businessName: businessName,
    })
      .then((data) =>
        alert(`You have created a Business!\nBusiness ID: ${data.id}`)
      )
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Head>
        <title>Rewwardy: Admin Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      {/* <TopNavbar/> */}
      <main className={`${styles.main} ${inter.className}`}>
        <h2 className={styles.header}>Create Business Account</h2>
        <div className={styles.form}>
          <TextField
            id="standard-basic"
            label="First Name"
            variant="standard"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Last Name"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Phone"
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Business Name"
            variant="standard"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            className={styles.btn}
            onClick={() => createBusinessAccount()}
          >
            Create Account
          </Button>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
