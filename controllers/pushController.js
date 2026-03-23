const PushSubscription = require('../models/PushSubscription');

exports.subscribe = async (req, res) => {
  try {
    const { subscription } = req.body;

    const existing = await PushSubscription.findOne({
      user: req.user.id
    });

    if (existing) {
      existing.subscription = subscription;
      await existing.save();
    } else {
      await PushSubscription.create({
        user: req.user.id,
        subscription
      });
    }

    res.status(201).json({ message: "Abonnement enregistré" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};