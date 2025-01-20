// bugSolution.js
import { useEffect, useState } from 'react';

async function fetchData() {
  const res = await fetch('/api/data');
  return res.json();
}

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        setError(error);
      }
      finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>My Component</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// pages/api/data.js
export default async function handler(req, res) {
  // Simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  res.status(200).json({ message: 'Data from server' });
} 