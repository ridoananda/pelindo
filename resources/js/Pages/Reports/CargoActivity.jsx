import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import { FaBoxes, FaClock, FaUser, FaShip } from 'react-icons/fa';

export default function CargoActivityReport({ auth, cargoActivities, reportType, reportDate, reportPeriod }) {
  const columns = [
    {
      key: 'ship_name',
      label: 'Nama Kapal',
      render: (item) => (
        <div className="flex items-center">
          <FaShip className="mr-2 text-blue-600" />
          <span className="font-medium">{item.ship_name}</span>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Jenis Aktivitas',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.type === 'bongkar'
            ? 'bg-green-100 text-green-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {item.type === 'bongkar' ? 'Bongkar' : 'Muat'}
        </span>
      )
    },
    {
      key: 'cargo_type',
      label: 'Jenis Kargo',
      render: (item) => (
        <div className="flex items-center">
          <FaBoxes className="mr-2 text-gray-600" />
          <span>{item.cargo_type}</span>
        </div>
      )
    },
    {
      key: 'quantity',
      label: 'Kuantitas',
      render: (item) => (
        <div className="text-right">
          <span className="font-medium">{item.quantity?.toLocaleString()}</span>
          <span className="text-gray-500 ml-1">{item.unit}</span>
        </div>
      )
    },
    {
      key: 'operator',
      label: 'Operator',
      render: (item) => (
        <div className="flex items-center">
          <FaUser className="mr-2 text-gray-600" />
          <span>{item.operator}</span>
        </div>
      )
    },
    {
      key: 'time',
      label: 'Waktu',
      render: (item) => (
        <div className="flex items-center text-sm">
          <FaClock className="mr-2 text-gray-600" />
          <span>{item.time ? new Date(item.time).toLocaleString('id-ID') : '-'}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'selesai'
            ? 'bg-green-100 text-green-800'
            : item.status === 'proses'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'notes',
      label: 'Catatan',
      render: (item) => (
        <span className="text-gray-600 text-sm">
          {item.notes ? (item.notes.length > 50 ? item.notes.substring(0, 50) + '...' : item.notes) : '-'}
        </span>
      )
    }
  ];

  // Calculate statistics
  const stats = {
    total: cargoActivities.length,
    bongkar: cargoActivities.filter(item => item.type === 'bongkar').length,
    muat: cargoActivities.filter(item => item.type === 'muat').length,
    selesai: cargoActivities.filter(item => item.status === 'selesai').length,
  };

  return (
    <MainLayout user={auth.user}>
      <Head title={reportType} />

      <PageHeader
        title={reportType}
        description={`Periode: ${reportPeriod} | Dibuat pada: ${reportDate}`}
        pattern="grid"
      />

      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Aktivitas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FaBoxes className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bongkar</p>
                <p className="text-2xl font-bold text-green-600">{stats.bongkar}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">B</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Muat</p>
                <p className="text-2xl font-bold text-blue-600">{stats.muat}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">M</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Selesai</p>
                <p className="text-2xl font-bold text-green-600">{stats.selesai}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FaBoxes className="mr-2 text-blue-600" />
              Data Aktivitas Bongkar Muat
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Menampilkan {cargoActivities.length} aktivitas untuk periode {reportPeriod}
            </p>
          </div>

          <Table
            columns={columns}
            data={cargoActivities}
            emptyMessage="Tidak ada data aktivitas bongkar muat untuk periode ini."
          />
        </div>
      </div>
    </MainLayout>
  );
}
