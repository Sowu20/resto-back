const PushSubscription = require('../models/PushSubscription');

exports.subscribe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

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
    console.error('Erreur web push: ', error.message);
  }
};