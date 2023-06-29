const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "No Token Provided" });
  }
  try {
    const token = authToken.split(" ")[1];
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decodedPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token, Acces denied" });
  }
}

// verify Token and Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Only Admin Can See Users" });
    } else {
      next();
    }
  });
}

// verify Only User
function verifyOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id !== req.params.id) {
      return res
        .status(403)
        .json({ message: "Only user himself can update his profile" });
    }
    next();
  });
}

// Verify Token and admin or user himself
function verifyOnlyUserOrAdmin(req, res, next) {
  verifyToken(req, res, () => {
    console.log(req.user.id === req.params.id);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Only user himself can update his profile" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyOnlyUser,
  verifyOnlyUserOrAdmin,
};
