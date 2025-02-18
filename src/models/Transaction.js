import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);