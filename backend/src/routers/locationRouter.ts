import { Router } from "express";

export function locationRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({ msg: "This is location router get" });
  });

  return router;
}
