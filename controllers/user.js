const users = require('../lib/users');

module.exports = function userController (req, res, next) {
  const user = users.get().find((user) => {
    return user.athlete.id == req.params.uid;
  }).value();

  if (!user) {
    return next();
  }

  res.send({
    user,
  });
}
