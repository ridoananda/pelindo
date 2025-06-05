import { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import theme from '@/theme'; // Assuming your theme file is here

export default function CargoActivitiesIndex({ cargoActivities }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const { data, setData, post, put, errors, reset, processing } = useForm({
    ship_name: '',
    type: '', // e.g., 'Bongkar', 'Muat'
    cargo_type: '', // e.g., 'Kontainer', 'Curah Kering', 'Curah Cair'
    quantity: '',
    unit: 'Ton', // e.g., 'Ton', 'TEUs', 'Unit'
    operator: '',
    time: '',
    status: 'Dalam Proses', // e.g., 'Dalam Proses', 'Selesai', 'Tertunda'
    notes: '',
  });

  const statusColors = {
    'Selesai': 'bg-green-100 text-green-800',
    'Dalam Proses': 'bg-blue-100 text-blue-800',
    'Tertunda': 'bg-amber-100 text-amber-800',
    'Dibatalkan': 'bg-red-100 text-red-800',
  };

  const columns = [
    {
      header: 'Nama Kapal',
      accessor: 'ship_name',
    },
    {
      header: 'Jenis Aktivitas',
      accessor: 'type',
      cell: (value) => (
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
          value === 'Bongkar' ? 'bg-sky-100 text-sky-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      header: 'Jenis Muatan',
      accessor: 'cargo_type',
    },
    {
      header: 'Jumlah',
      accessor: 'quantity',
      cell: (value, row) => `${value} ${row.unit}`
    },
    {
      header: 'Operator',
      accessor: 'operator',
    },
    {
      header: 'Jam',
      accessor: 'time',
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
  ];

  const filteredActivities = useMemo(() => {
    return cargoActivities.filter(activity => {
      const matchesSearch = 
        activity.ship_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.cargo_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.operator.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'Semua' || activity.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [cargoActivities, searchTerm, filterStatus]);

  const openAddModal = () => {
    reset();
    setData({
      ship_name: '',
      type: 'Bongkar',
      cargo_type: '',
      quantity: '',
      unit: 'Ton',
      operator: '',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'Dalam Proses',
      notes: '',
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (activity) => {
    setIsEditMode(true);
    setEditingActivity(activity);
    setData({
      ship_name: activity.ship_name,
      type: activity.type,
      cargo_type: activity.cargo_type,
      quantity: activity.quantity,
      unit: activity.unit,
      operator: activity.operator,
      time: activity.time,
      status: activity.status,
      notes: activity.notes || '',
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
      put(route('cargo-activities.update', editingActivity.id), {
        onSuccess: () => {
          closeModal();
        },
      });
    } else {
      post(route('cargo-activities.store'), {
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  const handleDelete = (activity) => {
    if (confirm('Apakah Anda yakin ingin menghapus data aktivitas ini?')) {
      router.delete(route('cargo-activities.destroy', activity.id));
    }
  };

  const statusOptions = ['Semua', 'Dalam Proses', 'Selesai', 'Tertunda', 'Dibatalkan'];

  return (
    <MainLayout>
      <Head title="Bongkar Muat" />

      <PageHeader
        title="Aktivitas Bongkar Muat"
        description="Kelola semua aktivitas bongkar muat barang di pelabuhan."
        pattern="waves"
        actions={
          <Button 
            onClick={openAddModal}
            className="bg-white !text-blue-800 hover:bg-blue-100 hover:!text-white transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Aktivitas
          </Button>
        }
      />

      <div className="p-8 bg-gray-50">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                {statusOptions.map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      filterStatus === status 
                        ? 'bg-blue-700 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              <input
                type="text"
                  placeholder="Cari aktivitas..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
            <Table
              columns={columns}
                data={filteredActivities}
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

      <Modal show={isModalOpen} onClose={closeModal} title={isEditMode ? 'Edit Aktivitas Bongkar Muat' : 'Tambah Aktivitas Bongkar Muat'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kapal
            </label>
            <input
              type="text"
              value={data.ship_name}
              onChange={(e) => setData('ship_name', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Contoh: KM Jaya Abadi"
            />
            {errors.ship_name && (
              <p className="mt-1 text-sm text-red-600">{errors.ship_name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Aktivitas</label>
              <select
                value={data.type}
                onChange={(e) => setData('type', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="Bongkar">Bongkar</option>
                <option value="Muat">Muat</option>
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Muatan</label>
            <input
              type="text"
                value={data.cargo_type}
                onChange={(e) => setData('cargo_type', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Contoh: Kontainer, Semen, Pupuk"
            />
              {errors.cargo_type && <p className="mt-1 text-sm text-red-600">{errors.cargo_type}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
            <input
                type="number"
              value={data.quantity}
              onChange={(e) => setData('quantity', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Contoh: 1000"
            />
              {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Satuan</label>
              <select
                value={data.unit}
                onChange={(e) => setData('unit', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="Ton">Ton</option>
                <option value="TEUs">TEUs (Kontainer)</option>
                <option value="Unit">Unit</option>
                <option value="M3">M3 (Kubik)</option>
                <option value="Karung">Karung</option>
              </select>
              {errors.unit && <p className="mt-1 text-sm text-red-600">{errors.unit}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Operator/PBM
            </label>
            <input
              type="text"
              value={data.operator}
              onChange={(e) => setData('operator', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Contoh: PT. Maju Jaya Logistik"
            />
            {errors.operator && (
              <p className="mt-1 text-sm text-red-600">{errors.operator}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jam</label>
            <input
              type="time"
              value={data.time}
              onChange={(e) => setData('time', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="Dalam Proses">Dalam Proses</option>
                <option value="Selesai">Selesai</option>
                <option value="Tertunda">Tertunda</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan (Opsional)
            </label>
            <textarea
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              rows="3"
              placeholder="Informasi tambahan mengenai aktivitas..."
            ></textarea>
            {errors.notes && (
              <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
            )}
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
              {processing ? 'Menyimpan...' : (isEditMode ? 'Update Aktivitas' : 'Simpan Aktivitas')}
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
