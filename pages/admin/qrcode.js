import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/admin/rewards/editreward.module.css";
import { AdminHamburgerMenu, AdminFooter } from "@/components";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
// import QRCode from "react-qr-code";
import { getCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export default function QRCodePage() {
  const [reward, setReward] = useState();
  const router = useRouter();
  const { id } = router.query;

  const businessId = getCookie("businessId");

  // let qrCodeRef = useRef();

  // const downloadQRCode = () => {
  //   const canvas = qrCodeRef.current.querySelector("canvas");
  //   const pngUrl = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   let downloadLink = document.createElement("a");
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = "QRCode.png";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };

  return (
    <>
      <Head>
        <title>Rewwardy: Reward Details</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <AdminHamburgerMenu className={styles.shapingBar} />
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Scan or Download QR Code</h1>
          </div>
          <div className={styles.box}>
            {/* {businessId ? (
              <QRCode value={businessId} ref={qrCodeRef} />
            ) : (
              <p>Loading...</p>
            )} */}
          </div>
          <br />
          <div className={styles.btnrow}>
            <Button
              className={styles.btn}
              variant="contained"
              // onClick={() => downloadQRCode()}
            >
              Download
            </Button>
          </div>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
