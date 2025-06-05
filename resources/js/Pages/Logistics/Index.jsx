import { useState, useMemo, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import theme from '@/theme';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export default function LogisticsIndex({ logistics }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingLogistic, setEditingLogistic] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 1-12

  const { data, setData, post, put, errors, reset, processing } = useForm({
    name: '',
    category: 'Peralatan Kantor',
    status: 'Masuk',
    date: new Date().toISOString().slice(0,10),
  });

  const statusColors = {
    'Masuk': 'bg-sky-100 text-sky-800',
    'Keluar': 'bg-orange-100 text-orange-800',
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
      header: 'Status',
      accessor: 'status',
      cell: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
          {value}
        </span>
      ),
    },
    {
      header: 'Tanggal',
      accessor: 'date',
      cell: (value) => new Date(value).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric'})
    },
  ];

  const filteredLogistics = useMemo(() => {
    return logistics
      .filter(log => {
        const logDate = new Date(log.date);
        return logDate.getFullYear() === parseInt(currentYear) && (logDate.getMonth() + 1) === parseInt(currentMonth);
      })
      .filter(log => 
        log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [logistics, searchTerm, currentYear, currentMonth]);

  // Chart data preparation
  const monthlyData = useMemo(() => {
    const dataByMonth = Array(12).fill(0).map(() => ({ masuk: 0, keluar: 0 }));
    logistics.forEach(log => {
      const logDate = new Date(log.date);
      if (logDate.getFullYear() === parseInt(currentYear)) {
        const month = logDate.getMonth(); // 0-11
        if (log.status === 'Masuk') {
          dataByMonth[month].masuk += 1;
        } else if (log.status === 'Keluar') {
          dataByMonth[month].keluar += 1;
        }
      }
    });
    return dataByMonth;
  }, [logistics, currentYear]);

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [
      {
        label: 'Barang Masuk (Jumlah Transaksi)',
        data: monthlyData.map(d => d.masuk),
        borderColor: theme.colors.primary[500],
        backgroundColor: `${theme.colors.primary[500]}33`, // opacity
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Barang Keluar (Jumlah Transaksi)',
        data: monthlyData.map(d => d.keluar),
        borderColor: theme.colors.secondary[500],
        backgroundColor: `${theme.colors.secondary[500]}33`, // opacity
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const categoryDistribution = useMemo(() => {
    const distribution = {};
    filteredLogistics.forEach(log => {
      distribution[log.category] = (distribution[log.category] || 0) + 1;
    });
    return distribution;
  }, [filteredLogistics]);

  const pieChartData = {
    labels: Object.keys(categoryDistribution),
    datasets: [
      {
        data: Object.values(categoryDistribution),
        backgroundColor: [
          theme.colors.primary[500],
          theme.colors.secondary[500],
          theme.colors.accent.warning,
          theme.colors.primary[300],
          theme.colors.secondary[300],
          theme.colors.accent.info,
        ],
        borderColor: theme.colors.neutral.white,
        borderWidth: 2,
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
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
      name: '',
      category: 'Peralatan Kantor',
      status: 'Masuk',
      date: new Date().toISOString().slice(0,10),
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (logistic) => {
    setIsEditMode(true);
    setEditingLogistic(logistic);
    setData({
      name: logistic.name,
      category: logistic.category,
      status: logistic.status,
      date: logistic.date,
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
        onSuccess: () => closeModal(),
      });
    } else {
      post(route('logistics.store'), {
        onSuccess: () => closeModal(),
      });
    }
  };

  const handleDelete = (logistic) => {
    if (confirm('Apakah Anda yakin ingin menghapus data logistik ini?')) {
      router.delete(route('logistics.destroy', logistic.id));
    }
  };

  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const monthOptions = [
    { value: 1, label: 'Januari' }, { value: 2, label: 'Februari' }, { value: 3, label: 'Maret' }, 
    { value: 4, label: 'April' }, { value: 5, label: 'Mei' }, { value: 6, label: 'Juni' }, 
    { value: 7, label: 'Juli' }, { value: 8, label: 'Agustus' }, { value: 9, label: 'September' }, 
    { value: 10, label: 'Oktober' }, { value: 11, label: 'November' }, { value: 12, label: 'Desember' }
  ];

  return (
    <MainLayout>
      <Head title="Manajemen Logistik" />

      <PageHeader
        title="Manajemen Logistik Pelabuhan"
        description="Pantau dan kelola arus barang, stok, dan distribusi logistik."
        pattern="compass"
        actions={
          <Button 
            onClick={openAddModal}
            className="bg-white text-blue-800 hover:bg-blue-100 transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Data Logistik
          </Button>
        }
      />

      <div className="p-8 bg-gray-50">
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Arus Barang Tahunan ({currentYear})</h3>
            <div className="h-72 md:h-80">
              <Line data={lineChartData} options={chartOptions} />
            </div>
            </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Kategori Barang</h3>
            <div className="h-72 md:h-80 flex items-center justify-center">
              {Object.keys(categoryDistribution).length > 0 ? (
                <Pie data={pieChartData} options={{...chartOptions, maintainAspectRatio: false}} />
              ) : (
                <p className="text-gray-500 text-center">Tidak ada data untuk ditampilkan pada periode ini.</p>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div>
                  <label htmlFor="month-filter" className="sr-only">Bulan</label>
                  <select 
                    id="month-filter"
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(e.target.value)}
                    className="py-2 pl-3 pr-8 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm"
                  >
                    {monthOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="year-filter" className="sr-only">Tahun</label>
                  <select 
                    id="year-filter"
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                    className="py-2 pl-3 pr-8 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm"
                  >
                    {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
                 <div className="text-gray-700 font-medium">
                  Total: <span className="text-blue-700 font-semibold">{filteredLogistics.length}</span> item
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
                  placeholder="Cari logistik..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
            <Table
              columns={columns}
                data={filteredLogistics}
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

      <Modal show={isModalOpen} onClose={closeModal} title={isEditMode ? 'Edit Data Logistik' : 'Tambah Data Logistik'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Barang/Peralatan</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Contoh: Komputer PC, Tali Tambat, Oli Mesin"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
              value={data.category}
              onChange={(e) => setData('category', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="Peralatan Kantor">Peralatan Kantor</option>
                <option value="Suku Cadang Kapal">Suku Cadang Kapal</option>
                <option value="Alat Berat">Alat Berat</option>
                <option value="Bahan Bakar">Bahan Bakar</option>
                <option value="Perlengkapan Keselamatan">Perlengkapan Keselamatan</option>
                <option value="Material Konstruksi">Material Konstruksi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Transaksi</label>
              <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="Masuk">Masuk (Pembelian/Penerimaan)</option>
                <option value="Keluar">Keluar (Penggunaan/Pengiriman)</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Transaksi</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => setData('date', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
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
              {processing ? 'Menyimpan...' : (isEditMode ? 'Update Data' : 'Simpan Data')}
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
