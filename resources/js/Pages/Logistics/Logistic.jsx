import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Logistic({ logistics }) {
  const [filters, setFilters] = useState({
    date: '',
    month: '',
    year: new Date().getFullYear().toString()
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const columns = [
    {
      header: 'Nama Barang',
      accessor: 'item_name',
    },
    {
      header: 'Kategori',
      accessor: 'category',
    },
    {
      header: 'Tanggal',
      accessor: 'date',
    },
    {
      header: 'Status',
      accessor: 'status',
    },
  ];

  // Sample data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Barang Masuk',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Barang Keluar',
        data: [8, 15, 5, 10, 6, 7, 12],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: ['Masuk', 'Keluar'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistik Logistik Barang',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribusi Status Barang',
      },
    },
  };

  return (
    <MainLayout>
      <Head title="Data Logistik" />

      <PageHeader
        title="Data Logistik"
      />

      <div className="p-4 md:p-8">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <select
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 appearance-none"
                >
                  <option value="">Tanggal</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="relative">
                <select
                  name="month"
                  value={filters.month}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 appearance-none"
                >
                  <option value="">Bulan</option>
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="relative">
                <select
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 appearance-none"
                >
                  <option value="">Tahun</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Tabel Barang</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table
              columns={columns}
              data={logistics || [
                { item_name: 'ABCDEFGHI', category: 'HIJK', date: '03-03-2025', status: 'Masuk' },
                { item_name: 'ABCDEFGHI', category: 'HIJK', date: '03-03-2025', status: 'Keluar' },
                { item_name: 'ABCDEFGHI', category: 'HIJK', date: '03-03-2025', status: 'Masuk' },
                { item_name: 'ABCDEFGHI', category: 'HIJK', date: '03-03-2025', status: 'Keluar' },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-4">
            <Bar data={chartData} options={options} />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
