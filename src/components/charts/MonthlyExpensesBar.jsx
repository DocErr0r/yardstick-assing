
'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyExpensesBar({ refresh }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/api/transactions', { cache: 'no-store' })
            .then((res) => res.json())
            .then((transactions) => {
                const grouped = transactions.reduce((acc, tx) => {
                    const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
                    acc[month] = (acc[month] || 0) + tx.amount;
                    return acc;
                }, {});

                setData(Object.entries(grouped).map(([month, total]) => ({ month, total })));
                setLoading(false);
            });
    }, [refresh]); 

    if (loading) return <p>Loading...</p>;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
