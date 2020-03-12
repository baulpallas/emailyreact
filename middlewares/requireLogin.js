module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ error: "Woah woah there partner.  You must log in first!" });
  }
  next();
};
