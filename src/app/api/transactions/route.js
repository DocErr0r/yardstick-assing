import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";


connectDB();

export async function GET() {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { description, amount, date } = await req.json();

        if (!description || !amount || !date) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newTransaction = new Transaction({ description, amount, date });
        await newTransaction.save();

        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, description, amount, date } = await req.json();
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, { description, amount, date }, { new: true });

        if (!updatedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        await Transaction.findByIdAndDelete(id);
        return NextResponse.json({ message: "Transaction deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
    }
}
