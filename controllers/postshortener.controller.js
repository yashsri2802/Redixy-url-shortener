import { urls } from "../schema/url_schema.js";
import crypto from "crypto";

export const getShortenerPage = async (req, res) => {
  try {
    // const file = await readFile(path.join("views/index.html"));

    const links = await urls.find();

    return res.render("index", { links, hosts: req.host });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const existing = await urls.findOne({ shortCode: finalShortCode });

    if (existing) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another one.");
    }
    await urls.create({ url, shortCode: finalShortCode });
    return res.redirect("/");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await urls.findOne({ shortCode });
    if (!link) return res.redirect("/404");

    return res.redirect(link.url);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
