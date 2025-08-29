export const getRegisterPage = (req, res) => {
  return res.render("auth/register", {
    user: req.user || null,
    errors: [],
  });
};

export const getLoginPage = (req, res) => {
  return res.render("auth/login", {
    user: req.user || null,
    errors: [],
  });
};

export const postLogin = (req, res) => {
  res.cookie("isLoggedIn", true);
  res.redirect("/");
};

export const postRegister = async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;

  const userExist = await getUserByEmail(email);
  if (userExist) {
    return res.redirect("/register");
  }

  const user = await createUser({ name, email, password });

  res.redirect("/login");
};

export const getHomePage = async (req, res) => {
  return res.render("index", { user: req.user || null, hosts: req.host });
};

export const logoutUser = async (req, res) => {
  await clearUserSession(req.user.sessionId);

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.redirect("/login");
};
