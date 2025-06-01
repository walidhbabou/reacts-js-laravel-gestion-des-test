import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { BarChart } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EtudiantData {
  id: number;
  nom: string;
  moyenne: number;
}

const ChartPage = () => {
  const [etudiants, setEtudiants] = useState<EtudiantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:8000'; // Your backend URL

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/students`);
        // Assuming the API returns objects with 'nom' and 'moyenne'
        setEtudiants(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Failed to load student data.');
        setLoading(false);
      }
    };

    fetchEtudiants();
  }, []);

  const chartData = {
    labels: etudiants.map(etudiant => etudiant.nom),
    datasets: [
      {
        label: 'Moyenne des étudiants',
        data: etudiants.map(etudiant => etudiant.moyenne),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(201, 203, 207, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Moyenne des étudiants par nom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
      },
    },
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <BarChart className="h-8 w-8 text-primary" />
          Statistiques des Moyennes
        </h1>
        <p className="text-muted-foreground">
          Visualisation graphique des moyennes étudiantes
        </p>
      </div>

      {/* Statistics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Moyenne des étudiants</CardTitle>
        </CardHeader>
        <CardContent>
          {etudiants.length > 0 ? (
            <div style={{ height: '400px' }}> {/* Added height for chart container */}
              <Bar data={chartData} options={chartOptions} />
            </div>
          ) : (
            <p className="text-center text-gray-500">Aucune donnée d'étudiant disponible pour le graphique.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartPage;
