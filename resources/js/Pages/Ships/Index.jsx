import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import theme from '@/theme';

export default function ShipsIndex({ ships }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingShip, setEditingShip] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [searchTerm, setSearchTerm] = useState('');

  const { data, setData, post, put, errors, reset, processing } = useForm({
    name: '',
    type: '',
    cargo: '',
    departure_time: '',
    arrival_time: '',
    status: '',
  });

  const columns = [
    {
      header: 'Nama Kapal',
      accessor: 'name',
    },
    {
      header: 'Jenis',
      accessor: 'type',
    },
    {
      header: 'Muatan',
      accessor: 'cargo',
    },
    {
      header: 'Perkiraan Waktu Berangkat',
      accessor: 'departure_time',
    },
    {
      header: 'Perkiraan Waktu Tiba',
      accessor: 'arrival_time',
    },
    {
      header: 'Status Kapal',
      accessor: 'status',
      cell: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Berlabuh' ? 'bg-green-100 text-green-800' :
          value === 'Berlayar' ? 'bg-blue-100 text-blue-800' :
          value === 'Perbaikan' ? 'bg-amber-100 text-amber-800' :
          value === 'Bongkar Muat' ? 'bg-indigo-100 text-indigo-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      ),
    },
  ];

  const filteredShips = ships.filter(ship =>
    ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    reset();
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (ship) => {
    setIsEditMode(true);
    setEditingShip(ship);
    setData({
      name: ship.name,
      type: ship.type,
      cargo: ship.cargo,
      departure_time: ship.departure_time,
      arrival_time: ship.arrival_time,
      status: ship.status,
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
      put(route('ships.update', editingShip.id), {
        onSuccess: () => {
          closeModal();
        },
      });
    } else {
      post(route('ships.store'), {
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  const handleDelete = (ship) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      router.delete(route('ships.destroy', ship.id));
    }
  };

  // Get a ship icon based on type
  const getShipIcon = (type) => {
    if (type.toLowerCase().includes('kargo')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          <rect x="4" y="14" width="16" height="6" rx="1" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2" />
        </svg>
      );
    } else if (type.toLowerCase().includes('penumpang')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="7" r="4" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        </svg>
      );
    } else if (type.toLowerCase().includes('tanker')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
  };

  return (
    <MainLayout>
      <Head title="Data Kapal" />

      <PageHeader
        title="Data Kapal"
        description="Kelola dan pantau data kapal yang beroperasi di pelabuhan"
        pattern="shipWheel"
        actions={
          <Button
            onClick={openAddModal}
            className="bg-white !text-blue-800 hover:bg-blue-100 hover:!text-white transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Kapal
          </Button>
        }
      />

      <div className="p-8 bg-gray-50">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-md ${viewMode === 'card' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <div className="ml-4 text-gray-700 font-medium">
                  Total: <span className="text-blue-700 font-semibold">{filteredShips.length}</span> kapal
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              <input
                type="text"
                  placeholder="Cari kapal..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {viewMode === 'table' ? (
              // Table View
              <div className="overflow-hidden rounded-xl border border-gray-200">
            <Table
              columns={columns}
                  data={filteredShips}
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
            ) : (
              // Card View
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShips.map((ship) => (
                  <div key={ship.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className={`p-4 ${
                      ship.status === 'Berlabuh' ? 'bg-gradient-to-r from-green-600 to-green-700' :
                      ship.status === 'Berlayar' ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                      ship.status === 'Perbaikan' ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                      ship.status === 'Bongkar Muat' ? 'bg-gradient-to-r from-indigo-600 to-indigo-700' :
                      'bg-gradient-to-r from-gray-600 to-gray-700'
                    } text-white`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{ship.name}</h3>
                          <p className="text-sm opacity-90">{ship.type}</p>
                        </div>
                        <div className="text-white opacity-70">
                          {getShipIcon(ship.type)}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Muatan</p>
                          <p className="font-medium">{ship.cargo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Status</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ship.status === 'Berlabuh' ? 'bg-green-100 text-green-800' :
                            ship.status === 'Berlayar' ? 'bg-blue-100 text-blue-800' :
                            ship.status === 'Perbaikan' ? 'bg-amber-100 text-amber-800' :
                            ship.status === 'Bongkar Muat' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {ship.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Waktu Berangkat</p>
                          <p className="font-medium">{ship.departure_time}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Waktu Tiba</p>
                          <p className="font-medium">{ship.arrival_time}</p>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-2 border-t">
                        <Button
                          variant="white"
                          size="sm"
                          onClick={() => openEditModal(ship)}
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
                          onClick={() => handleDelete(ship)}
                          className="bg-red-600 text-white hover:bg-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModal} title={isEditMode ? 'Edit Data Kapal' : 'Tambah Data Kapal'}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kapal
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis
            </label>
            <select
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Pilih Jenis Kapal</option>
              <option value="Kapal Kargo">Kapal Kargo</option>
              <option value="Kapal Penumpang">Kapal Penumpang</option>
              <option value="Kapal Tanker">Kapal Tanker</option>
              <option value="Kapal Peti Kemas">Kapal Peti Kemas</option>
              <option value="Kapal Pesiar">Kapal Pesiar</option>
              <option value="Kapal Patroli">Kapal Patroli</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Muatan
            </label>
            <input
              type="text"
              value={data.cargo}
              onChange={(e) => setData('cargo', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.cargo && (
              <p className="mt-1 text-sm text-red-600">{errors.cargo}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perkiraan Waktu Berangkat
            </label>
            <input
              type="time"
              value={data.departure_time}
              onChange={(e) => setData('departure_time', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.departure_time && (
              <p className="mt-1 text-sm text-red-600">{errors.departure_time}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perkiraan Waktu Tiba
            </label>
            <input
              type="time"
              value={data.arrival_time}
              onChange={(e) => setData('arrival_time', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.arrival_time && (
              <p className="mt-1 text-sm text-red-600">{errors.arrival_time}</p>
            )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Kapal
            </label>
            <select
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Pilih Status</option>
              <option value="Berlabuh">Berlabuh</option>
              <option value="Berlayar">Berlayar</option>
              <option value="Perbaikan">Perbaikan</option>
              <option value="Bongkar Muat">Bongkar Muat</option>
              <option value="Menunggu">Menunggu</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="white" onClick={closeModal} className="border border-gray-300">
              Batal
            </Button>
            <Button
              type="submit"
              disabled={processing}
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              {isEditMode ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
