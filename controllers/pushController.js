const pushSubscription = require('../models/pushSubscription');

exports.subscribe = async (req, res) => {
  try {
    const { subscription } = req.body;

    const existing = await pushSubscription.findOne({
      user: req.user.id
    });

    if (existing) {
      existing.subscription = subscription;
      await existing.save();
    } else {
      await pushSubscription.create({
        user: req.user.id,
        subscription
      });
    }

    res.status(201).json({ message: "Abonnement enregistré" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};