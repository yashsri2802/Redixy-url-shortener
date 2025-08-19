import { Router } from "express";
import {
  postURLShortener,
  getShortenerPage,
  redirectToShortLink,
} from "../controllers/postshortener.controller.js";

const router = Router();

//ejs Template engine
// router.get("/report", (req, res) => {
//   const student = [
//     {
//       name: "yash",
//       grade: "A",
//       favSubject: "Chemistry",
//     },
//     {
//       name: "lorem",
//       grade: "B+",
//       favSubject: "Maths",
//     },
//     {
//       name: "ipsum",
//       grade: "A+",
//       favSubject: "Physics",
//     },
//   ];
//   res.render("report", { student });
// });

router.get("/", getShortenerPage);

router.post("/", postURLShortener);

router.get("/:shortCode", redirectToShortLink);

// export default router;
//named export
export const shortenedRoutes = router;
