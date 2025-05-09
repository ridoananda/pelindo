import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Button';

export default function ReportsIndex() {
  const [reportType, setReportType] = useState('logistics');

  const { data, setData, get, processing } = useForm({
    month: '',
    year: new Date().getFullYear(),
  });

  const handleReportTypeChange = (type) => {
    setReportType(type);
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();

    if (reportType === 'logistics') {
      get(route('reports.logistics', {
        month: data.month,
        year: data.year,
      }));
    } else if (reportType === 'ships') {
      get(route('reports.ships', {
        month: data.month,
        year: data.year,
      }));
    } else if (reportType === 'risks') {
      get(route('reports.risks', {
        month: data.month,
        year: data.year,
      }));
    }
  };

  return (
    <MainLayout>
      <Head title="Generate Laporan" />

      <PageHeader
        title="Generate Laporan"
      />

      <div className="p-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                type="button"
                onClick={() => handleReportTypeChange('logistics')}
                className={`px-4 py-2 rounded-md ${
                  reportType === 'logistics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Laporan Logistik
              </button>

              <button
                type="button"
                onClick={() => handleReportTypeChange('ships')}
                className={`px-4 py-2 rounded-md ${
                  reportType === 'ships'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Laporan Aktivitas Kapal
              </button>

              <button
                type="button"
                onClick={() => handleReportTypeChange('risks')}
                className={`px-4 py-2 rounded-md ${
                  reportType === 'risks'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Laporan Analisis Risiko
              </button>
            </div>

            <form onSubmit={handleGenerateReport}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Laporan
                  </label>
                  <input
                    type="text"
                    value={
                      reportType === 'logistics'
                        ? 'Laporan Logistik'
                        : reportType === 'ships'
                        ? 'Laporan Aktivitas Kapal'
                        : 'Laporan Analisis Risiko'
                    }
                    readOnly
                    className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Laporan
                  </label>
                  <input
                    type="text"
                    value={new Date().toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                    readOnly
                    className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Periode Laporan
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={data.month}
                      onChange={(e) => setData('month', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="">Semua Bulan</option>
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

                    <input
                      type="number"
                      value={data.year}
                      onChange={(e) => setData('year', e.target.value)}
                      min="2000"
                      max="2100"
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                  Generate Laporan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
