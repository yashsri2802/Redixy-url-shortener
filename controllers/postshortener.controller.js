import crypto from "crypto";
import { loadLinks, saveLinks } from "../models/shortener.model.js";

export const getShortenerPage = async (req, res) => {
  try {
    // const file = await readFile(path.join("views/index.html"));
    const links = await loadLinks();

    return res.render("index", { links, hosts: req.host });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const links = await loadLinks();

    if (links[finalShortCode]) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another one.");
    }

    links[finalShortCode] = url;
    await saveLinks(links);
    return res.redirect("/");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();

    if (!links[shortCode]) {
      return res.status(404).send("Short code not found.");
    }

    res.redirect(links[shortCode]);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
