const Result = require("../models/Result");

// Get All Results
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Result
exports.getSingleResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: "Result Not Found",
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Result
exports.addResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();

    res.status(201).json({
      message: "Result Added Successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Result
exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Result Updated Successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Result
exports.deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);

    res.json({
      message: "Result Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};