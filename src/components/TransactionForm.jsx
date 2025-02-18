'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function TransactionForm({ onTransactionAdded, editData, setEditData, closeModal }) {
    const [formData, setFormData] = useState({ description: '', amount: '', date: '' });
    const [errors, setErrors] = useState({});

    // Load existing data into the form for editing
    useEffect(() => {
        if (editData) setFormData({ ...editData, date: editData.date.split('T')[0] });
    }, [editData]);

    // Validate input fields
    const validate = () => {
        let newErrors = {};
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) newErrors.amount = 'Valid amount is required';
        if (!formData.date) newErrors.date = 'Date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const url = editData ? '/api/transactions' : '/api/transactions';
            const method = editData ? 'PUT' : 'POST';
            const body = JSON.stringify(editData ? { ...formData, id: editData._id } : formData);

            const res = await fetch(url, {
                method,
                body,
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error('Transaction operation failed');

            toast.success(editData ? 'Transaction updated' : 'Transaction added');
            setFormData({ description: '', amount: '', date: '' });
            setEditData(null);
            closeModal();
            onTransactionAdded();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{editData ? 'Edit' : 'Add'} Transaction</h2>

            <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2 w-full my-2" />
            {errors.description && <p className="text-red-500">{errors.description}</p>}

            <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="border p-2 w-full my-2" />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}

            <input type="date" value={formData.date} min={'2020-01-01'} max={new Date().toISOString().split('T')[0]} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="border p-2 w-full my-2" />
            {errors.date && <p className="text-red-500">{errors.date}</p>}

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                {editData ? 'Update' : 'Add'} Transaction
            </button>
        </form>
    );
}
