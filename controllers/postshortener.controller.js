import crypto from "crypto";
import {
  getLinkByShortCode,
  loadLinks,
  saveLinks,
} from "../services/shortener.services.js";

export const getShortenerPage = async (req, res) => {
  try {
    const links = await loadLinks();

    let isLoggedIn = req.cookies.isLoggedIn;
    // console.log(isLoggedIn);

    return res.render("index", { links, hosts: req.host, isLoggedIn });
  } catch (error) {
    console.error("Error in getShortenerPage:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const link = await getLinkByShortCode(shortCode);

    if (link) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another one.");
    }
    await saveLinks({ url, shortCode: finalShortCode });
    return res.redirect("/");
  } catch (error) {
    console.error("Error in postURLShortener:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await getLinkByShortCode(shortCode);
    if (!link) return res.redirect("/404");

    return res.redirect(link.url);
  } catch (error) {
    console.error("Error in redirectToShortLink:", error);
    return res.status(500).send("Internal Server Error");
  }
};
