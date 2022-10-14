export const hasRole = (...roles) => {
  return (req, res, next) => {
    try {
      console.log(req.body);
      validRole(req.user, ...roles);
      next();
    } catch (err) {
      next(err);
    }
  };
};

const validRole = (user, ...roles) => {
  if (!roles.includes(user.role)) {
    throw new Error("Authorization failed! User without privileges.", 403);
  }
  return true;
};
