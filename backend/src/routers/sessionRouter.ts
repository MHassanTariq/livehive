import { Router } from "express";

export function appSessionRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({ msg: "This is appSession router get" });
  });

  return router;
}
