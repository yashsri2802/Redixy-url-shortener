import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constants.js";
import { sendEmail } from "../lib/nodemailer.js";
import {
  authenticateUser,
  clearUserSession,
  clearVerifyEmailTokens,
  comparePassword,
  createAccessToken,
  createRefreshToken,
  createSession,
  createUser,
  createVerifyEmailLink,
  findUserById,
  findVerificationEmailToken,
  generateRandomToken,
  getAllShortLinks,
  getUserByEmail,
  hashPassword,
  insertVerifyEmailToken,
  verifyUserEmailAndUpdate,
} from "../services/auth.services.js";
import { verifyEmailSchema } from "../validators/auth-validator.js";

export const getRegisterPage = (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("auth/register", { errors: req.flash("errors") });
};

export const postRegister = async (req, res) => {
  if (req.user) return res.redirect("/");

  // const { data, error } = registerUserSchema.safeParse(req.body);

  // if (error) {
  //   const errorMessage = error.errors[0].message;
  //   req.flash("errors", errorMessage);
  //   return res.redirect("/");
  // }

  const { name, email, password } = req.body;

  const userExists = await getUserByEmail(email);
  // console.log("userExists ", userExists);

  if (userExists) {
    req.flash("errors", "User already exists");
    return res.redirect("/register");
  }

  const hashedPassword = await hashPassword(password);

  const [user] = await createUser({ name, email, password: hashedPassword });
  // console.log(user);
  await authenticateUser({ req, res, user, name, email });
  res.redirect("/");
};

export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("auth/login", { errors: req.flash("errors") });
};

export const postLogin = async (req, res) => {
  if (req.user) return res.redirect("/");
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    req.flash("errors", "Invalid email or password");
    return res.redirect("/login");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    req.flash("errors", "Invalid email or password");
    return res.redirect("/login");
  }
  await authenticateUser({ req, res, user });

  res.redirect("/");
};

export const getMe = (req, res) => {
  if (!req.user) return res.send("Not logged in");
  return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`);
};

export const logoutUser = async (req, res) => {
  await clearUserSession(req.user.sessionId);
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.redirect("/login");
};

export const getProfilePage = async (req, res) => {
  if (!req.user) return res.send("Not logged in");

  const user = await findUserById(req.user.id);
  if (!user) return res.redirect("/login");

  const userShortLinks = await getAllShortLinks(user.id);

  return res.render("auth/profile", {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isEmailValid: user.isEmailValid,
      createdAt: user.createdAt,
      links: userShortLinks,
    },
  });
};

export const getVerifyEmailPage = async (req, res) => {
  // if (!req.user || req.user.isEmailValid) return res.redirect("/");

  if (!req.user) return res.redirect("/");

  const user = await findUserById(req.user.id);

  if (!user || user.isEmailValid) return res.redirect("/");

  return res.render("auth/verify-email", {
    email: req.user.email,
  });
};

export const resendVerificationLink = async (req, res) => {
  if (!req.user) return res.redirect("/");
  const user = await findUserById(req.user.id);
  if (!user || user.isEmailValid) return res.redirect("/");

  const randomToken = generateRandomToken();
  await insertVerifyEmailToken({
    userId: user.id,
    token: randomToken,
  });

  const verifyEmailLink = await createVerifyEmailLink({
    email: req.user.email,
    token: randomToken,
  });

  sendEmail({
    to: req.user.email,
    subject: "Verify your email",
    html: `<h1>Click the link below to verify your email</h1>
    <p>You can use this token: <code>${randomToken}</code></p>
    <a href="${verifyEmailLink}">Verify Email</a>`,
  }).catch((err) => console.log(err.message));

  res.redirect("/verify-email");
};

export const verifyEmailToken = async (req, res) => {
  const { data, error } = verifyEmailSchema.safeParse(req.query);
  if (error) {
    return res.send("Verification link invalid or expired!");
  }

  const token = await findVerificationEmailToken(data); // without joins
  // const [token] = await findVerificationEmailToken(data); // with joins
  // console.log("🚀 ~ verifyEmailToken ~ token̥:", token);
  if (!token) res.send("Verification link invalid or expired!");

  await verifyUserEmailAndUpdate(token.email);

  clearVerifyEmailTokens(token.userId).catch(console.error);

  return res.redirect("/profile");
};
