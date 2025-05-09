import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';

export default function ProductionsIndex({ productions }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduction, setEditingProduction] = useState(null);

  const { data, setData, post, put, errors, reset, processing } = useForm({
    production_date: '',
    production_type: '',
    grain_type: '',
    grain_weight: '',
  });

  const columns = [
    {
      header: 'Tanggal Produksi',
      accessor: 'production_date',
    },
    {
      header: 'Jenis Produksi',
      accessor: 'production_type',
    },
    {
      header: 'Jenis Gebah',
      accessor: 'grain_type',
    },
    {
      header: 'Berat Gebah',
      accessor: 'grain_weight',
      render: (row) => `${row.grain_weight} Kg`,
    },
  ];

  const openAddModal = () => {
    reset();
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
        onSuccess: () => {
          closeModal();
        },
      });
    } else {
      post(route('productions.store'), {
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  const handleDelete = (production) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      router.delete(route('productions.destroy', production.id));
    }
  };

  return (
    <MainLayout>
      <Head title="Produksi" />

      <PageHeader
        title="Produksi"
        description="Daftar semua produksi yang tersedia."
        actions={
          <Button onClick={openAddModal}>
            tambah
          </Button>
        }
      />

      <div className="p-8">
        <Table
          columns={columns}
          data={productions}
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

      <Modal show={isModalOpen} onClose={closeModal} title={isEditMode ? 'Edit Produksi' : 'Tambah Produksi'}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Produksi
            </label>
            <input
              type="date"
              value={data.production_date}
              onChange={(e) => setData('production_date', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.production_date && (
              <p className="mt-1 text-sm text-red-600">{errors.production_date}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Produksi
            </label>
            <input
              type="text"
              value={data.production_type}
              onChange={(e) => setData('production_type', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.production_type && (
              <p className="mt-1 text-sm text-red-600">{errors.production_type}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Gebah
            </label>
            <input
              type="text"
              value={data.grain_type}
              onChange={(e) => setData('grain_type', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.grain_type && (
              <p className="mt-1 text-sm text-red-600">{errors.grain_type}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Berat Gebah (Kg)
            </label>
            <input
              type="number"
              value={data.grain_weight}
              onChange={(e) => setData('grain_weight', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.grain_weight && (
              <p className="mt-1 text-sm text-red-600">{errors.grain_weight}</p>
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
