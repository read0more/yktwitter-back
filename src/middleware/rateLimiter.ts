import rateLimit from "express-rate-limit";

export default rateLimit({
  windowMs: 60 * 60000,
  max: 100,
  keyGenerator: (req, res) => "yktwitter",
});
