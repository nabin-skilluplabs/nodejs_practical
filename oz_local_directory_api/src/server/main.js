import express from "express";
import ViteExpress from "vite-express";
import bodyParser from 'body-parser';

import jobRouter from './routes/job.js';
import { writeToCodesFile } from "./fileHandler/codeFileHandler.js";

const app = express();

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});


app.post("/register", (req, res) => {
  const data = req.body;
  res.json({"status": "OK", message: `Successfully registered email: ${data.email}`});
});


app.post("/send-code", (req, res) => {
  const body = req.body;
  const email = body.email;
  const code = parseInt(Math.random() * 100000);
  const data = {
    email: code
  }
  writeToCodesFile(data);

  console.log({email,  code });
  res.status(200).json({status: "OK", message: `Code sent to email: ${email}`});
});


app.post("/login", (req, res) => {
  try {
    const body = req.body;
    res.status(200).json({status: "OK", message: `Login successful for email: ${body.email}`});
  }
  catch(error) {
    res.status(500).json({status: "error", message: "Something went wrong, please try again!", error: error.message});
  }
});

app.post("/forgot-password", (req, res) => {
  try {
    const body = req.body;
    res.status(200).json({status: "OK", message: `Set new password for email: ${body.email}`});
  }
  catch(error) {
    res.status(500).json({status: "error", message: "Something went wrong, please try again!", error: error.message});
  }
});

app.post("/change-password", (req, res) => {
  try {
    const body = req.body;
    res.status(200).json({status: "OK", message: `New password set to email: ${body.email}`});
  }
  catch(error) {
    res.status(500).json({status: "error", message: "Something went wrong, please try again!", error: error.message});
  }
});


app.use("/jobs", jobRouter)



ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
