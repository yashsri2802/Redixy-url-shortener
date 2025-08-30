import crypto from "crypto";
import {
  findShortLinkById,
  getAllShortLinks,
  getShortLinkByShortCode,
  saveLinks,
  updateShortCode,
} from "../services/shortener.services.js";
import z from "zod";

export const getShortenerPage = async (req, res) => {
  try {
    let links = [];
    if (req.user) {
      links = await getAllShortLinks(req.user.id);
    }

    return res.render("index", {
      links,
      host: req.headers.host,
      errors: req.flash("errors"),
      user: req.user || null,
    });
  } catch (error) {
    console.error("Error in getShortenerPage:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const postURLShortener = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const link = await getShortLinkByShortCode(finalShortCode);

    if (link) {
      req.flash(
        "errors",
        "URL with this shortcode already exists, please choose another"
      );
      return res.redirect("/");
    }
    await saveLinks({ url, shortCode: finalShortCode, userId: req.user.id });
    return res.redirect("/");
  } catch (error) {
    console.error("Error in postURLShortener:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await getShortLinkByShortCode(shortCode);
    if (!link) return res.status(404).send("Link not found");

    return res.redirect(link.url);
  } catch (error) {
    console.error("Error in redirectToShortLink:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getShortenerEditPage = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
  if (error) return res.redirect("/404");

  try {
    const shortLink = await findShortLinkById(id);
    if (!shortLink) return res.redirect("/404");

    res.render("edit-shortLink", {
      id: shortLink.id,
      url: shortLink.url,
      shortCode: shortLink.shortCode,
      errors: req.flash("errors"),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const postShortenerEditPage = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
  if (error) return res.redirect("/404");

  try {
    const { url, shortCode } = req.body;

    const currentLink = await findShortLinkById(id);

    if (!currentLink) return res.redirect("/404");

    if (currentLink.shortCode === shortCode) {
      req.flash("errors", "Shortcode already exists, please choose another");
      return res.redirect(`/edit/${id}`);
    }

    const existingLink = await getShortLinkByShortCode(shortCode);
    if (existingLink) {
      req.flash("errors", "Shortcode already exists, please choose another");
      return res.redirect(`/edit/${id}`);
    }

    const newUpdateShortCode = await updateShortCode({ id, url, shortCode });
    if (!newUpdateShortCode) return res.redirect("/404");

    res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};
