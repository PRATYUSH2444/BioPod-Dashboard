const FeedRecord = require("../models/FeedRecord.model");

// ===============================
// ADD FEED INPUT (WASTE)
// ===============================
exports.addFeedInput = async (req, res) => {
  try {
    const { device_id, input_waste_kg } = req.body;

    if (!device_id || !input_waste_kg) {
      return res.status(400).json({ error: "Missing input data" });
    }

    const record = await FeedRecord.create({
      device_id,
      input_waste_kg,
    });

    res.json({
      success: true,
      message: "Feed input recorded",
      record,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// ADD FERTILIZER OUTPUT
// ===============================
exports.addFeedOutput = async (req, res) => {
  try {
    const { device_id, output_fertilizer_kg } = req.body;

    if (!device_id || !output_fertilizer_kg) {
      return res.status(400).json({ error: "Missing output data" });
    }

    // get last feed entry without output
    const record = await FeedRecord.findOne({
      device_id,
      output_fertilizer_kg: 0,
    }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(404).json({ error: "No feed input found" });
    }

    record.output_fertilizer_kg = output_fertilizer_kg;
    record.efficiency_percent =
      (output_fertilizer_kg / record.input_waste_kg) * 100;

    await record.save();

    res.json({
      success: true,
      message: "Fertilizer output recorded",
      record,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// FEED HISTORY (GRAPH)
// ===============================
exports.getFeedHistory = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;

    const history = await FeedRecord.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json(history.reverse());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// FEED SUMMARY (DASHBOARD KPI)
// ===============================
exports.getFeedSummary = async (req, res) => {
  try {
    const records = await FeedRecord.find();

    let totalInput = 0;
    let totalOutput = 0;

    records.forEach(r => {
      totalInput += r.input_waste_kg || 0;
      totalOutput += r.output_fertilizer_kg || 0;
    });

    const efficiency =
      totalInput > 0 ? (totalOutput / totalInput) * 100 : 0;

    res.json({
      total_input_kg: totalInput,
      total_output_kg: totalOutput,
      efficiency_percent: efficiency.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
