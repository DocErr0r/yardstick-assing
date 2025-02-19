"use client";
import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyExpensesBar from "@/components/charts/MonthlyExpensesBar";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [refresh, setRefresh] = useState(false);
    const [editData, setEditData] = useState(null);
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
        setEditData(null);
    };

    // Function to force re-fetching transactions
    const triggerRefresh = () => setRefresh((prev) => !prev);

    const Modal = ({ children }) => {
        return (
            open && <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4 text-center">
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
                    <div className="bg-white flex flex-col p-6 rounded-lg shadow-md z-50">
                        <Button onClick={closeModal} className="self-end">X</Button>
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Personal Finance Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <TransactionList refresh={refresh} onRefresh={triggerRefresh} setEditData={setEditData} openModal={() => setOpen(true)} />
                </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl mb-2 font-semibold">Transactions Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-x-auto">
                        <h3 className="text-lg">Monthly Expenses Bar</h3>
                        <MonthlyExpensesBar refresh={triggerRefresh} />
                    </div>
                </div>
            </div>
            <Modal>
                <TransactionForm onTransactionAdded={triggerRefresh} closeModal={closeModal} editData={editData} setEditData={setEditData} />
            </Modal>
        </div>
    );
}
