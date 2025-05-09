import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
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

export default function LogisticsIndex({ logistics }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingLogistic, setEditingLogistic] = useState(null);
  const [filters, setFilters] = useState({
    date: '',
    month: '',
    year: new Date().getFullYear().toString()
  });

  const { data, setData, post, put, errors, reset, processing } = useForm({
    name: '',
    category: '',
    date: '',
    status: '',
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
      accessor: 'name',
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
        display: false,
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
        display: false,
      },
    },
  };

  const openAddModal = () => {
    reset();
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (logistic) => {
    setIsEditMode(true);
    setEditingLogistic(logistic);
    setData({
      name: logistic.name,
      category: logistic.category,
      date: logistic.date,
      status: logistic.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      put(route('logistics.update', editingLogistic.id), {
        onSuccess: () => {
          closeModal();
        },
      });
    } else {
      post(route('logistics.store'), {
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  const handleDelete = (logistic) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      router.delete(route('logistics.destroy', logistic.id));
    }
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
            </div>

            <div className="w-full md:w-1/3">
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
            </div>

            <div className="w-full md:w-1/3">
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
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Tabel Barang</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table
              columns={columns}
              data={logistics || [
                { name: 'ABCDEFGHI', category: 'HIJK', date: '03-03-2025', status: 'Masuk' },
                { name: 'ABCDEFGHI', category: 'HIJK', date: '03-03-2025', status: 'Keluar' },
                { name: 'ABCDEFGHI', category: 'HIJK', date: '03-03-2025', status: 'Masuk' },
                { name: 'ABCDEFGHI', category: 'HIJK', date: '03-03-2025', status: 'Keluar' },
              ]}
              actions={(row) => (
                <div className="flex justify-end space-x-2">
                  <Button variant="white" size="sm" className="border border-gray-300" onClick={() => openEditModal(row)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(row)}>
                    Hapus
                  </Button>
                </div>
              )}
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

      <Modal show={isModalOpen} onClose={closeModal} title={isEditMode ? 'Edit Data Logistik' : 'Tambah Data Logistik'}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Barang
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <input
              type="text"
              value={data.category}
              onChange={(e) => setData('category', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => setData('date', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Pilih status</option>
              <option value="Masuk">Masuk</option>
              <option value="Keluar">Keluar</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="white" onClick={closeModal}>
              Batal
            </Button>
            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
              {isEditMode ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
