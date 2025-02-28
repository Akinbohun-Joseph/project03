const KYC = require('../model/KYCModel');
const userModel = require('../model/userModel');

// Create KYC
const createKYC = async (req, res) => {
  try {
    const userId = req.user._id;
    const { idNumber, address } = req.body;

    const kyc = new KYC({ idNumber, address, user: userId });
    await kyc.save();

    // Update user's KYC 
    await User.findByIdAndUpdate(userId, { kyc: kyc._id });

    res.status(201).json({ message: 'KYC created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get KYC for the logged-in user
const getKYC = async (req, res) => {
  try {
    const userId = req.user._id;
    const kyc = await KYC.findOne({ user: userId });

    if (!kyc) {
      return res.status(404).json({ message: 'KYC not found' });
    }

    res.json({ kyc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update KYC for the logged-in user
const updateKYC = async (req, res) => {
  try {
    const userId = req.user._id;
    const { idNumber, address } = req.body;

    const updatedKYC = await KYC.findOneAndUpdate(
      { user: userId },
      { idNumber, address },
      { new: true }
    );

    if (!updatedKYC) {
      return res.status(404).json({ message: 'KYC not found' });
    }

    res.json({ message: 'KYC updated', kyc: updatedKYC });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete KYC for the logged-in user
const deleteKYC = async (req, res) => {
  try {
    const userId = req.user._id;

    const deletedKYC = await KYC.findOneAndDelete({ user: userId });

    if (!deletedKYC) {
      return res.status(404).json({ message: 'KYC not found' });
    }

    // Remove KYC reference from User model
    await User.findByIdAndUpdate(userId, { $unset: { kyc: 1 } });

    res.json({ message: 'KYC deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
