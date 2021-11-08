const getAllProducts = (req, res) => {
  return res.status(200).json({ success: true, msg: "getting all products" });
};

module.exports = { getAllProducts };
