'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TransactionList({ onRefresh, setEditData, openModal }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('/api/transactions')
            .then((res) => res.json())
            .then(setTransactions)
            .catch(() => toast.error('Failed to load transactions'));
    }, [onRefresh]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;

        try {
            await fetch('/api/transactions', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' },
            });
            toast.success('Transaction deleted');
            onRefresh();
        } catch {
            toast.error('Delete failed');
        }
    };

    const totelExpens = transactions.reduce((acc, tx) => acc + tx.amount, 0);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Transactions</h2>
                <button onClick={openModal} className="bg-blue-500 text-white rounded-md px-2 py-1 float-right">
                    Add Transaction
                </button>
            </div>
            <Table className="overflow-x-auto">
                <TableCaption>Totel Expensses is: {totelExpens}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>SR no.</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((tx, i) => (
                        <TableRow key={tx._id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{tx.amount}</TableCell>
                            <TableCell>{tx.date.split('T')[0]}</TableCell>
                            <TableCell>{tx.description}</TableCell>
                            <TableCell className="flex gap-x-2 justify-end">
                                <button
                                    onClick={() => {
                                        setEditData(tx);
                                        openModal();
                                    }}
                                    className="bg-yellow-500 text-white px-2 py-1 mr-2">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(tx._id)} className="bg-red-500 text-white px-2 py-1">
                                    Delete
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
