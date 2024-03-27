import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(
    "sk_test_51LBMrVCWJeYDfwjzyRiKJox4QOU12EXquxCUIVV9iIgkVl4Cg50w6iWlkNL5HstjKYyTAZvES4a1eNfkRevxFeBB001LVP4ghP"
  );

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    paymentIntent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been cnfirmed");
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    res.status(200).send("successful");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
