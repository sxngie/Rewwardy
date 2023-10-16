import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/register.module.css";
import { Footer } from "../components";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
// import { db } from "@/firebase";
// import { collection, addDoc } from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

export default function UserLogin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const createUserAccount = async () => {
    await addDoc(collection(db, "user"), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      dateOfBirth: dateOfBirth,
      gender: gender,
    })
      .then((data) =>
        alert(`You have created an account!\nAccount ID: ${data.id}`)
      )
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Head>
        <title>Rewwardy: Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h2 className={styles.header}>Create an Account</h2>
        <br/>
        <div className={styles.form}>
          <TextField
            className={styles.inputField}
            id="standard-basic"
            label="First Name"
            variant="standard"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br/>
          <TextField
            className={styles.inputField}
            id="standard-basic"
            label="Last Name"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br/>
          <TextField
            className={styles.inputField}
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br/>
          <TextField
            className={styles.inputField}
            id="standard-basic"
            label="Phone"
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br/>
          <TextField
            className={styles.inputField}
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
          <TextField
            className={styles.inputField}
            id="standard-basic"
            label="Date of Birth"
            variant="standard"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <br/>
          <TextField
            className={styles.inputField}
            id="standard-basic"
            label="Gender"
            variant="standard"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <br />
          <Button className={styles.clickText} id="standard-basic" variant="standard">Terms and Conditions</Button>          
          <br />
          <Button className={styles.pinkButton} variant="contained" onClick={() => createUserAccount()}>Submit</Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
