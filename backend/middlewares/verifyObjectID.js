const mongoose = require("mongoose");

// verify OBject ID is valid
function verifyObjectId(req, res, next) {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isIdValid) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  next();
}

module.exports = {
  verifyObjectId,
};
