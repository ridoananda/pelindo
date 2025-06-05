import { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import theme from '@/theme';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ProductionsIndex({ productions }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduction, setEditingProduction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());

  const { data, setData, post, put, errors, reset, processing } = useForm({
    production_date: new Date().toISOString().slice(0,10),
    production_type: 'Import',
    grain_type: '',
    grain_weight: '',
  });

  const columns = [
    {
      header: 'Tanggal Produksi',
      accessor: 'production_date',
      cell: (value) => new Date(value).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric'})
    },
    {
      header: 'Jenis Produksi',
      accessor: 'production_type',
    },
    {
      header: 'Jenis Biji-bijian',
      accessor: 'grain_type',
    },
    {
      header: 'Berat Biji-bijian (Ton)',
      accessor: 'grain_weight',
      cell: (value) => value
    },
  ];

  const filteredProductions = useMemo(() => {
    return productions
      .filter(prod => new Date(prod.production_date).getFullYear().toString() === filterYear)
      .filter(prod => 
        prod.production_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.grain_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [productions, searchTerm, filterYear]);

  // Chart data
  const monthlyProductionData = useMemo(() => {
    const months = Array(12).fill(0);
    filteredProductions.forEach(p => {
      const month = new Date(p.production_date).getMonth();
      months[month] += parseFloat(p.grain_weight) || 0;
    });
    return months;
  }, [filteredProductions]);

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [
      {
        label: `Total Berat Biji-bijian (Ton) (${filterYear})`,
        data: monthlyProductionData,
        backgroundColor: theme.colors.primary[600],
        borderColor: theme.colors.primary[800],
        borderWidth: 1,
        borderRadius: 5,
    },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: theme.colors.neutral[700] }
      },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Total Berat Biji-bijian (Ton)', color: theme.colors.neutral[600] },
        ticks: { color: theme.colors.neutral[600] },
        grid: { color: theme.colors.neutral[200] }
      },
      x: {
        ticks: { color: theme.colors.neutral[600] },
        grid: { display: false }
      }
    },
  };

  const openAddModal = () => {
    reset();
    setData({
        production_date: new Date().toISOString().slice(0,10),
        production_type: 'Import',
        grain_type: '',
        grain_weight: '',
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (production) => {
    setIsEditMode(true);
    setEditingProduction(production);
    setData({
      production_date: production.production_date,
      production_type: production.production_type,
      grain_type: production.grain_type,
      grain_weight: production.grain_weight,
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
      put(route('productions.update', editingProduction.id), {
        onSuccess: () => closeModal(),
      });
    } else {
      post(route('productions.store'), {
        onSuccess: () => closeModal(),
      });
    }
  };

  const handleDelete = (production) => {
    if (confirm('Apakah Anda yakin ingin menghapus data produksi ini?')) {
      router.delete(route('productions.destroy', production.id));
    }
  };

  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <MainLayout>
      <Head title="Data Produksi" />

      <PageHeader
        title="Manajemen Produksi Pelabuhan"
        description="Kelola dan pantau semua aktivitas produksi barang di fasilitas pelabuhan."
        pattern="compass" // Example pattern
        actions={
          <Button 
            onClick={openAddModal}
            className="bg-white !text-blue-800 hover:bg-blue-100 hover:!text-white transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Data Produksi
          </Button>
        }
      />

      <div className="p-8 bg-gray-50">
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Grafik Produksi Bulanan</h3>
          <p className="text-sm text-gray-500 mb-4">Menampilkan total output produksi (Ton) per bulan untuk tahun {filterYear}.</p>
          <div className="h-80 md:h-96">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div>
                  <label htmlFor="year-filter" className="sr-only">Tahun</label>
                  <select 
                    id="year-filter"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="py-2 pl-3 pr-8 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm"
                  >
                    {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
                 <div className="text-gray-700 font-medium">
                  Total Data: <span className="text-blue-700 font-semibold">{filteredProductions.length}</span>
                </div>
              </div>
              
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cari data produksi..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
        <Table
          columns={columns}
                data={filteredProductions}
          actions={(row) => (
            <div className="flex justify-end space-x-2">
                     <Button 
                        variant="white" 
                        size="sm" 
                        onClick={() => openEditModal(row)}
                        className="border border-gray-300 hover:bg-gray-100"
                      >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                Edit
              </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(row)}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>
                Hapus
              </Button>
            </div>
          )}
        />
            </div>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModal} title={isEditMode ? 'Edit Data Produksi' : 'Tambah Data Produksi'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Produksi</label>
            <input
              type="date"
              value={data.production_date}
              onChange={(e) => setData('production_date', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.production_date && <p className="mt-1 text-sm text-red-600">{errors.production_date}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Produksi</label>
            <input
              type="text"
              value={data.production_type}
              onChange={(e) => setData('production_type', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Contoh: Import, Export, Pengolahan Lokal"
            />
              {errors.production_type && <p className="mt-1 text-sm text-red-600">{errors.production_type}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Biji-bijian</label>
              <input
                type="text"
                value={data.grain_type}
                onChange={(e) => setData('grain_type', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Contoh: Gandum, Jagung, Kedelai"
              />
              {errors.grain_type && <p className="mt-1 text-sm text-red-600">{errors.grain_type}</p>}
            </div>
          </div>

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Berat Biji-bijian (Ton)</label>
            <input
                type="number"
                step="0.01"
                value={data.grain_weight}
                onChange={(e) => setData('grain_weight', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Contoh: 1000"
            />
              {errors.grain_weight && <p className="mt-1 text-sm text-red-600">{errors.grain_weight}</p>}
            </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="white" onClick={closeModal} className="border border-gray-300">
              Batal
            </Button>
            <Button 
              type="submit" 
              disabled={processing}
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              {processing ? 'Menyimpan...' : (isEditMode ? 'Update Produksi' : 'Simpan Produksi')}
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
