import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';

export default function CargoActivitiesIndex({ cargoActivities }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const { data, setData, post, put, errors, reset, processing } = useForm({
    ship_name: '',
    type: '',
    quantity: '',
    operator: '',
    time: '',
    status: '',
  });

  const columns = [
    {
      header: 'Nama Kapal',
      accessor: 'ship_name',
    },
    {
      header: 'Jenis',
      accessor: 'type',
    },
    {
      header: 'Jumlah',
      accessor: 'quantity',
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
      render: (row) => {
        let statusClass = '';
        if (row.status === 'Selesai') {
          statusClass = 'text-green-500';
        } else if (row.status === 'Dalam proses') {
          statusClass = 'text-yellow-500';
        } else {
          statusClass = 'text-red-500';
        }
        return <span className={statusClass}>{row.status}</span>;
      }
    },
  ];

  const openAddModal = () => {
    reset();
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (activity) => {
    setIsEditMode(true);
    setEditingActivity(activity);
    setData({
      ship_name: activity.ship_name,
      type: activity.type,
      quantity: activity.quantity,
      operator: activity.operator,
      time: activity.time,
      status: activity.status,
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
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      router.delete(route('cargo-activities.destroy', activity.id));
    }
  };

  return (
    <MainLayout>
      <Head title="Bongkar Muat" />

      <PageHeader
        title="Bongkar Muat"
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

            <h3 className="text-lg font-semibold mb-4">Tabel Aktivitas Bongkar Muat</h3>

            <Table
              columns={columns}
              data={cargoActivities}
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

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-6">Indikator Warna</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-2">
                  <input type="radio" id="green" name="indicator" className="h-4 w-4 accent-green-500" />
                </div>
                <label htmlFor="green" className="text-gray-700">
                  Hijau: Selesai
                </label>
              </div>

              <div className="flex items-center">
                <div className="mr-2">
                  <input type="radio" id="yellow" name="indicator" className="h-4 w-4 accent-yellow-500" />
                </div>
                <label htmlFor="yellow" className="text-gray-700">
                  Kuning: Dalam proses
                </label>
              </div>

              <div className="flex items-center">
                <div className="mr-2">
                  <input type="radio" id="red" name="indicator" className="h-4 w-4 accent-red-500" />
                </div>
                <label htmlFor="red" className="text-gray-700">
                  Merah: Tertunda atau bermasalah
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModal} title={isEditMode ? 'Edit Aktivitas Bongkar Muat' : 'Tambah Aktivitas Bongkar Muat'}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kapal
            </label>
            <input
              type="text"
              value={data.ship_name}
              onChange={(e) => setData('ship_name', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.ship_name && (
              <p className="mt-1 text-sm text-red-600">{errors.ship_name}</p>
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
              Jumlah
            </label>
            <input
              type="text"
              value={data.quantity}
              onChange={(e) => setData('quantity', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Operator
            </label>
            <input
              type="text"
              value={data.operator}
              onChange={(e) => setData('operator', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.operator && (
              <p className="mt-1 text-sm text-red-600">{errors.operator}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jam
            </label>
            <input
              type="time"
              value={data.time}
              onChange={(e) => setData('time', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time}</p>
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
              <option value="Selesai">Selesai</option>
              <option value="Dalam proses">Dalam proses</option>
              <option value="Tertunda atau bermasalah">Tertunda atau bermasalah</option>
            </select>
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
