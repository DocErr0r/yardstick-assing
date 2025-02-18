export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Personal Finance Visualizer</h1>
        <p className="text-gray-600 mb-6">
          Track your expenses and manage your finances with ease.
        </p>
        <a href="/dashboard" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Go to Dashboard
        </a>
      </div>
    </main>
  );
}
