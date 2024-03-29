import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // const token = req.cookies.accessToken;

  // if (!token) {
  //   return res.status(401).send("You are not authenticated");
  // }

  // jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
  //   //       if (payload.id !== user._id.toString()) {
  //   //         return res.status(403).send(" you can delete only uour account!");
  //   //       }
  //   if (err) return res.status(403).send("token is not valid!");

  //   req.userId = payload.id;
  //   req.isSeller = payload.isSeller;
  //   next();
  // });

  next();
};
