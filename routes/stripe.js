const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51LtvZ5JWUm7HFjJLultEBJHGWnKLLLCPf3qlu9OplTrXRWNihKSOiq6iMCa1Kmdrx036Dkb5k3BKe8v2YdcKSNmZ00M28CPqF8"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(err);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});
module.exports = router;
