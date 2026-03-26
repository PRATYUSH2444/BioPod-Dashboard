const mongoose = require("mongoose");

const FeedRecordSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true,
      index: true,
    },

    input_waste_kg: {
      type: Number,
      default: 0,
    },

    output_fertilizer_kg: {
      type: Number,
      default: 0,
    },

    efficiency_percent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FeedRecord", FeedRecordSchema);
