const mongoose = require("mongoose");

const BSFBatchSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true,
      unique: true,
    },
    started_on: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * IMPORTANT:
 * Prevent model overwrite error in dev / nodemon
 */
module.exports =
  mongoose.models.BSFBatch ||
  mongoose.model("BSFBatch", BSFBatchSchema);
