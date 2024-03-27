import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));
  console.log(req.userId);

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).send(savedGig);
  } catch (err) {
    next(err);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your own gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(403, "Gig not found!"));

    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
export const allGigs = async (req, res, next) => {
  const q = req.query;
  //   const filters = {
  //     cat: q.cat,
  //     price: { $gt: 100 },
  //     title: { $regex: q.search, $options: "i" },
  //   };

  const filters = {
    ...(q.userId && { userId: q.userId }), //agar q.userId hai to userId ko expand kardo filters me
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }), //agar  q.min ya q.max hau to price obj ko expand karo according to greater or less than q min or max
    ...(q.search && { title: { $regex: q.search, $options: "i" } }), // agar search query hai to title ko search karo regex ki madad se , yaha i ka matlab case insensitive hai
  };

  try {
    // const allGigs = await Gig.find(filters).sort({ createdAt: -1 }); //shows in desc order
    const allGigs = await Gig.find(filters).sort({
      [q.sort]: -1,
      createdAt: -1,
    }); //sets sort query

    if (!allGigs) return next(createError(403, "No Gig found!"));

    res.status(200).send(allGigs);
  } catch (err) {
    next(err);
  }
};
