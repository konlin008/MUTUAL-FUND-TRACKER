import User from "../models/user.schema.js";

export const saveFunds = async (req, res) => {
  try {
    const { schemeCode, schemeTitle } = req.body;
    const userId = req.userId;
    const exists = await User.findOne({
      _id: userId,
      savedFunds: { $elemMatch: { schemeCode: schemeCode } },
    });

    if (exists) {
      return res.status(409).json({
        message: "Fund Already Saved",
        success: false,
      });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          savedFunds: {
            schemeCode,
            schemeTitle,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Funds Saved ",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Get User Details! Internal Server Error",
      success: false,
    });
  }
};
export const getSavedFunds = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId }).select("savedFunds");
    if (!user)
      return res.status(404).json({
        message: "No results found",
        success: false,
      });
    res.status(200).json({
      success: true,
      savedFunds: user.savedFunds,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Faild To Get Saved Funds Internal Server Error",
      success: false,
    });
  }
};
