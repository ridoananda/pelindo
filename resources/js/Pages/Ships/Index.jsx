import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';

export default function ShipsIndex({ ships }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingShip, setEditingShip] = useState(null);

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
    },
  ];

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

  return (
    <MainLayout>
      <Head title="Data Kapal" />

      <PageHeader
        title="Data Kapal"
        actions={
          <Button onClick={openAddModal}>
            Tambah Data +
          </Button>
        }
      />

      <div className="p-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Cari..."
                className="px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Button>
            </div>

            <h3 className="text-lg font-semibold mb-4">Tabel Data Kapal</h3>

            <Table
              columns={columns}
              data={ships}
              actions={(row) => (
                <div className="flex justify-end space-x-2">
                  <Button variant="white" size="sm" onClick={() => openEditModal(row)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(row)}>
                    Hapus
                  </Button>
                </div>
              )}
            />
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
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis
            </label>
            <input
              type="text"
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
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
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.cargo && (
              <p className="mt-1 text-sm text-red-600">{errors.cargo}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perkiraan Waktu Berangkat
            </label>
            <input
              type="time"
              value={data.departure_time}
              onChange={(e) => setData('departure_time', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.arrival_time && (
              <p className="mt-1 text-sm text-red-600">{errors.arrival_time}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Kapal
            </label>
            <input
              type="text"
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="white" onClick={closeModal}>
              Batal
            </Button>
            <Button type="submit" disabled={processing}>
              {isEditMode ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
