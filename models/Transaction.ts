import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  created: { type: Date, required: true },
  description: { type: String, required: true },
  account: {
    type: String,
    required: true,
    enum: ["Spenden", "Investieren", "Sparen"],
  },
  isPaid: { type: Boolean, default: false },
});

transactionSchema.plugin(toJSON);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
