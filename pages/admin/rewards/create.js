import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/rewards/create.module.css";
import {
  Select,
  TextField,
  MenuItem,
  Button,
  InputLabel,
  Input,
  FormControl,
} from "@mui/material";
import { Inter } from "next/font/google";
import Head from "next/head";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { AdminHamburgerMenu, AdminFooter } from "@/components";
import InputAdornment from "@mui/material/InputAdornment";
import { getCookie } from "cookies-next";
import { db, storage } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useRouter } from "next/router";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuidv4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateReward() {
  const [challengeName, setChallengeName] = useState("");
  const [description, setDescription] = useState("");
  const [milestoneType, setMilestoneType] = useState("");
  const [milestoneGoal, setMilestoneGoal] = useState(0);
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Success");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [url, setUrl] = useState("");

  const router = useRouter();
  const businessid = getCookie("businessId");
  const businessName = getCookie('businessName');
  /* Create for businessName  
  const businessName  
    that is able to get the businessName and pass it to the challenge info, similar to businessid*/

  // Handle Closing the Snackbar
  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccessAlert(false);
  };

  // Handle Closing the Snackbar
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccessAlert(false);
  };

  useEffect(() => {
    const imageRef = storageRef(storage, `rewards/${uuidv4()}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url)
            setUrl(url);
            // setSuccessMessage("Image Uploaded Successfully");
            // setShowSuccessAlert(true);
          })
          .catch((error) => {
            // setErrorMessage(error.message);
            // setShowErrorAlert(true);
          });
      })
      .catch((error) => {
        // setErrorMessage(error.message);
        // setShowErrorAlert(true);
      });
  }, [imageUpload]);

  // Create Reward
  const createReward = async () => {
    if (imageUpload === null) {
      setShowErrorAlert(true);
      return;
    }

    await addDoc(collection(db, "business_challenges"), {
      challengeName: challengeName,
      description: description,
      milestoneType: milestoneType,
      milestoneGoal: milestoneGoal,
      validFrom: validFrom,
      validUntil: validUntil,
      businessId: businessid,
      businessName: businessName, /* Parse the businessName! */
      imageUrl: url,
    })
      .then((data) => {
        setShowSuccessAlert(true);
        setSuccessMessage("You have created a Reward!");
        router.push("/admin/rewards");
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setShowErrorAlert(true);
      });
  };
  return (
    <>
      <Head>
        <title>Rewwardy: Create Reward</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Rewwardy-Icon.png" />
      </Head>
      <AdminHamburgerMenu className={styles.shapingBar} />
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.headerbar}>
          <h1>Create Reward</h1>
        </div>
        <div className={styles.form}>
          <TextField
            label="Name"
            variant="standard"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "#552CB4",
                [`&.${inputLabelClasses.shrink}`]: {
                  color: "#552CB4",
                },
              },
            }}
          />
          <br />
          <TextField
            label="Description"
            variant="standard"
            multiline
            rows={5}
            value={description}
            InputLabelProps={{
              sx: {
                color: "#552CB4",
                [`&.${inputLabelClasses.shrink}`]: {
                  color: "#552CB4",
                },
              },
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <InputLabel htmlFor="Milestone-type">Milestone Type</InputLabel>

          <Select
            value={milestoneType}
            label="Select-Milestone-Type"
            className={styles.select}
            onChange={(e) => setMilestoneType(e.target.value)}
          >
            {/* <MenuItem label="Money Spent" value={"money_spent"}>
              Money Spent
            </MenuItem> */}
            <MenuItem label="Visits" value={"visits"}>
              Visits
            </MenuItem>
            {/* <MenuItem label="Quantity " value={"quantity"}>
              Quantity
            </MenuItem> */}
          </Select>
          <br />
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={
                milestoneType == "money_spent" && (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }
              value={milestoneGoal}
              onChange={(e) => setMilestoneGoal(e.target.value)}
            />
          </FormControl>

          <br />
          <label className={styles.label}>
            Valid From
            <br />
            <input
              type="date"
              value={validFrom}
              className={styles.dateinput}
              onChange={(e) => setValidFrom(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.label}>
            Valid Until
            <br />
            <input
              type="date"
              value={validUntil}
              className={styles.dateinput}
              onChange={(e) => setValidUntil(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.label}>
            Reward Image
            <br />
            <input
              type="file"
              accept={[".jpg", ".png", ".jpeg"]}
              placeholder="Choose Image"
              className={styles.image}
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
          </label>
          <br />
          <div className={styles.btnrow}>
            <button
              variant="contained"
              className={styles.btn}
              onClick={() => createReward()}
            >
              Create Reward
            </button>
          </div>
          <Snackbar
            open={showSuccessAlert}
            autoHideDuration={6000}
            onClose={handleSuccessClose}
          >
            <Alert
              onClose={handleSuccessClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successMessage}
            </Alert>
          </Snackbar>
          <Snackbar
            open={showSuccessAlert}
            autoHideDuration={6000}
            onClose={handleErrorClose}
          >
            <Alert
              onClose={handleErrorClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
