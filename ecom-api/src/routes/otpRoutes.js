const router = require("express").Router();
const OTP = require("../models/otpModel");
const { createTransport } = require("nodemailer");
const auth = require("../middlewares/auth");

router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = new OTP({
      email,
    });
    const code = await otp.generateOTP();
    const mailTransporter = createTransport({
      service: "gmail",
      auth: {
        user: "devmail6199@gmail.com",
        pass: "rzeuktcvmdfztbku",
      },
    });

    const mailDetails = {
      from: "E-Commerce 🛒<devmail6199@gmail.com>",
      to: email,
      subject: `OTP`,
      text: `Your OTP is ${code}`,
    };
    await mailTransporter.sendMail(mailDetails);
    console.log(code);
    res.send(code);
  } catch (e) {
    const error = e.message;
    res.status(400).send({ error });
  }
});

router.get("/verify/:otp", auth, async (req, res) => {
  try {
    const email = req.user.contactInformation.email;
    const otp = req.params.otp;
    const result=await OTP.verifyOTP(email, otp);
    res.send({ status: true });
  } catch (e) {
    const error = e.message;
    res.status(400).send({ error });
  }
});

router.get("/view", async (req, res) => {
  try {
    const ult = await OTP.find({});
    res.send(ult);
  } catch (e) {
    const error = e.message;
    res.status(400).send({ error });
  }
});

module.exports = router;
