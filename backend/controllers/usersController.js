import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mailTransport from "../utils/nodemailer.js";
import crypto from "crypto";

import {
  getUserByEmailSQL,
  getUserByPseudoSQL,
  createUserSQL,
  getUserSQL,
  verifyUserSQL,
  updatePasswordSQL,
  getVerifTokenSQL,
  createVerifTokenSQL,
  deleteVerificationTokenSQL,
  getResetTokenSQL,
  createResetTokenSQL,
  deleteResetTokenSQL,
  getProfileSQL,
  updatePseudoSQL,
  updateAvatarSQL,
  getUserAvatarIdSQL,
} from "../utils/sql/usersSQL.js";
import cloudinary from "../utils/cloudinary.js";
import createTemplate from "../utils/utils.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const signup = async (req, res) => {
  const { email, password, pseudo } = req.body;

  if (!email || !password || !pseudo) {
    return res.json({ succes: false, error: "all fields must be filled" });
  }

  if (!validator.isEmail(email)) {
    return res.json({ succes: false, error: "not a valid email" });
  }

  if (
    !validator.isStrongPassword(password, {
      minSymbols: 0,
      minLength: 8,
      minUppercase: 0,
    })
  ) {
    return res.json({ succes: false, error: "password not strong enough" });
  }

  const emailExists = await getUserByEmailSQL(email);

  if (emailExists) {
    return res.json({ succes: false, error: "Email already in use" });
  }

  const pseudoExists = await getUserByPseudoSQL(pseudo);

  if (pseudoExists) {
    return res.json({ succes: false, error: "Pseudo already in use" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);


  const user = await createUserSQL(email, hash, verifToken, pseudo);

  const html = createTemplate({
    file: "email_verify.html",
    params: {
      URL: process.env.URL,
      token: verifToken,
      id: user._id,
      pseudo: user.pseudo,
    },
  });

  mailTransport().sendMail({
    from: '"Mewsic Support" <mewsic.dev@gmail.com>',
    to: user.email,
    subject: "Mewsic - Verify your email",
    html: html,
  });

  res.json({
    succes: true,
    user,
    message: "An email has been sent to ur accout to verify",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ succes: false, error: "all fields must be filled" });
  }

  const user = await getUserByEmailSQL(email);

  if (!user) {
    return res.json({ succes: false, error: "incorrect email" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.json({ succes: false, error: "incorrect password" });
  }

  if (!user.verified) {
    const verificationToken = await getVerifTokenSQL(user._id);

    if (!verificationToken.verif_token) {
      let token = "";
      for (let i = 0; i < 4; i++) {
        const rand = Math.round(Math.random() * 9);
        token = token + rand;
      }

      await createVerifTokenSQL(user._id, token);

      const html = createTemplate({
        file: "email_verify.html",
        params: {
          URL: process.env.URL,
          token: token,
          id: user._id,
          pseudo: user.pseudo,
        },
      });

      mailTransport().sendMail({
        from: '"Mewsic Support" <mewsic.dev@gmail.com>',
        to: user.email,
        subject: "Verification d'email Mewsic",
        html: html,
      });

      return res.json({
        succes: false,
        user,
        message: "An email has been sent to ur account to verify",
      });
    }
    return res.json({
      succes: false,
      error: "An email his already sent to ur email to verify ur account",
    });
  }

  const token = createToken(user._id);

  res.json({
    succes: true,
    user: {
      email: user.email,
      id: user._id,
      pseudo: user.pseudo,
      avatar: user.avatar,
      admin: user.role,
      token,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { token, id } = req.query;

  if (!id || !token)
    return res.json({ succes: false, error: "invalid request" });

  const user = await getUserSQL(id);
  if (!user) return res.json({ succes: false, error: "user not found" });

  if (user.verified)
    return res.json({ succes: false, error: "account already verified" });

  const verificationToken = await getVerifTokenSQL(user._id);

  if (!verificationToken)
    return res.json({ succes: false, error: "user not found" });

  if (token != verificationToken.verif_token)
    return res.json({ succes: false, error: "invalid code" });

  await verifyUserSQL(id);

  await deleteVerificationTokenSQL(id);

  const html = createTemplate({
    file: "email_confirm.html",
    params: {
      pseudo: user.pseudo,
    },
  });

  mailTransport().sendMail({
    from: '"Mewsic Support" <mewsic.dev@gmail.com>',
    to: user.email,
    subject: "Email Confirmé !",
    html: html,
  });

  res.json({
    succes: true,
    message: "account verified !",
    user: { email: user.email, id: user._id },
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ succes: false, error: "email not valid" });

  const user = await getUserByEmailSQL(email);

  if (!user) return res.json({ succes: false, error: "user not found" });

  const token = await getResetTokenSQL(user._id);
  console.log(token);

  if (token.reset_token)
    return res.json({
      succes: false,
      error: "a reset link is already sent to ur email",
    });

  const randToken = crypto.randomBytes(30).toString("hex");

  await createResetTokenSQL(user._id, randToken);

  const html = createTemplate({
    file: "email_reset.html",
    params: {
      pseudo: user.pseudo,
      URL: process.env.URL,
      token: randToken,
      id: user._id,
    },
  });

  mailTransport().sendMail({
    from: '"Mewsic Support" <mewsic.dev@gmail.com>',
    to: user.email,
    subject: "Reset Mot de passe",
    html: html,
  });

  res.json({ succes: true, message: "Password reset link sent to ur email" });
};

const isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;

  if (!token || !id)
    return res.json({ succes: false, error: "invalid request no token or id" });

  const user = await getUserSQL(id);

  if (!user) return res.json({ succes: false, error: "invalid user" });

  const resetToken = await getResetTokenSQL(user._id);
  if (!resetToken) {
    return res.json({ succes: false, error: "invalid request, no token" });
  }

  if (token !== resetToken.reset_token) {
    return res.json({ succes: false, error: "invalid request not match" });
  }

  req.user = user;
  next();
};

const resetPassword = async (req, res) => {
  const { password } = req.body;

  const user = await getUserSQL(req.user._id);

  if (!user) return res.json({ succes: false, error: "user not found" });

  if (
    !validator.isStrongPassword(password, {
      minSymbols: 0,
      minLength: 8,
      minUppercase: 0,
    })
  ) {
    return res.json({ succes: false, error: "password not strong enough" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await updatePasswordSQL(user._id, hash);

  await deleteResetTokenSQL(user._id);

  const html = createTemplate({
    file: "email_changed.html",
    params: {
      pseudo: user.pseudo,
    },
  });

  mailTransport().sendMail({
    from: '"Mewsic Support" <mewsic.dev@gmail.com>',
    to: user.email,
    subject: "mot de passe changé",
    html: html,
  });

  res.json({ succes: true, message: "password reseted !" });
};

const getProfile = async (req, res) => {
  const { id } = req.params;

  const profile = await getProfileSQL(id);

  if (profile) {
    return res.status(200).json({ profile });
  } else {
    return res.status(404).json({ error: "Profile Not Found" });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { pseudo } = req.body;
  const files = req.files;

  let result = [];
  for (const [name, obj] of Object.entries(files)) {
    result.push(
      await cloudinary.uploader.upload(obj[0].path, {
        resource_type: "auto",
      })
    );
  }
  let avatar_url = result.filter((obj) => {
    return obj.resource_type === "image";
  })[0]?.secure_url;

  let avatar_id = result.filter((obj) => {
    return obj.resource_type === "image";
  })[0]?.public_id;

  const pseudoExists = await getUserByPseudoSQL(pseudo);

  if (pseudoExists) {
    return res.json({ succes: false, error: "Pseudo already in use" });
  }

  try {
    if (pseudo) {
      await updatePseudoSQL(pseudo, id);
    }

    if (avatar_url) {
      const currentAvatarid = await getUserAvatarIdSQL(id);
      console.log(currentAvatarid);

      if (currentAvatarid) {
        await cloudinary.uploader.destroy(currentAvatarid);
      }

      await updateAvatarSQL(avatar_url, avatar_id, id);
    }

    res.status(200).json({ succes: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ succes: false });
  }
};

const changePassword = async (req, res) => {
  const { newPass, oldPass } = req.body;
  const { id } = req.params;

  const user = await getUserSQL(id);

  const match = await bcrypt.compare(oldPass, user.password);

  if (!match) {
    return res.json({ succes: false, error: "incorrect password" });
  }

  if (
    !validator.isStrongPassword(newPass, {
      minSymbols: 0,
      minLength: 8,
      minUppercase: 0,
    })
  ) {
    return res.json({ succes: false, error: "password not strong enough" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPass, salt);

  try {
    await updatePasswordSQL(id, hash);

    return res.json({ succes: true, message: "password changed" });
  } catch (error) {
    console.log(error);
  }
};

export {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  isResetTokenValid,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
};
