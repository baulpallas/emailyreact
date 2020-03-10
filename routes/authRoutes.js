const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", async (req, res) => {
    await req.logout();
    await res.send(req.user);
  });

  app.get("/api/current_user", async (req, res) => {
    await res.send(req.session);
  });
};
