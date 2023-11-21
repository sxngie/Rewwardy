import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/register.module.css";
import { Footer } from "../components";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Select,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export default function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const router = useRouter();

  const createUserAccount = async () => {
    console.log("HIT")
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await addDoc(collection(db, "users"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          phone: phone,
          dateOfBirth: dateOfBirth,
          gender: gender,
          authId: user.uid,
          role: "USER",
          dateCreated: new Date(),
        })
          .then((data) => {
            alert(`You hav3e created an account!\nAccount ID: ${data.id}`);
            router.push("/");
          })
          .catch((err) => alert(err.message));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Head>
        <title>Rewwardy: Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`} style={{overflow: 'scroll'}}>
        <div className={styles.row}>
          <h1 className={styles.header}>Create an Account</h1>
          <br />
        </div>
        <div className={styles.column}>
          <div className={styles.form}>
            <TextField
              className={styles.inputField}
              label="First Name"
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <TextField
              className={styles.inputField}
              label="Last Name"
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <TextField
              className={styles.inputField}
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              className={styles.inputField}
              label="Phone"
              variant="standard"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <TextField
              className={styles.inputField}
              label="Password"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label className={styles.label}>
              Date of Birth
              <br />
            </label>
            <input
              className={styles.dateinput}
              label="Date of Birth"
              type="date"
              variant="standard"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <br />
            <label className={styles.label}>
              Gender
              <br />
            </label>
            <Select
              className={styles.inputField}
              label="Gender"
              variant="standard"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
              <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
            </Select>
            <br />
            <Button
              className={styles.clickText}
              id="standard-basic"
              variant="standard"
            >
              Terms and Conditions
            </Button>
            <br />
            <Button
              className={styles.pinkButton}
              variant="contained"
              onClick={() => createUserAccount()}
            >
              Submit
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
