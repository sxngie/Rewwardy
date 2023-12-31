import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/admin/login.module.css";
import Link from "next/link";
import { TopNavbar, AdminFooter } from "../../components";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { db } from "@/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { setCookie } from "cookies-next";
import Script from "next/script";

 const inter = Inter({ subsets: ["latin"] });

 export default function UserLogin() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const router = useRouter();
   const auth = getAuth();

   return (
     <>
       <Head>
         <title>Rewwardy: Password Recovery</title>
         <meta name="description" content="Generated by create next app" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link rel="icon" href="/Images/Rewwardy-Icon.png" />
       </Head>
       <main className={`${styles.main} `}>
            <h1 className={`${styles.header}`}>
             Password Recovery
            </h1>
            <div className={styles.form}>
            <TextField
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          <br />
             <button
               className={styles.button}
               variant="contained"
               onClick={async () =>
                 await sendPasswordResetEmail(auth, email)
                   .then(() => {
                     console.log("Reset Password Email sent successfully!");
                     alert('Recovery email sent successfully');
                   })
                   .catch((error) => {
                     console.error(error);
                     alert('Could not send recovery email.');
                   })
               }
             >
               Send Email
             </button>
             <br />
             <button
               className={styles.textbutton}
               id="standard-basic"
               variant="standard"
             >
               <Link href="/admin">Login</Link>
             </button>
             <button
               className={styles.textbutton}
               id="standard-basic"
               variant="standard"
               onClick={() => router.push("/admin/register")}
             >
               Create an Account
             </button>
           </div>
       </main>
       <AdminFooter />
     </>
   );
 }