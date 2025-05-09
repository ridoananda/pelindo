import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function RisksIndex({ risks, riskStatus, riskReports }) {
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);

  const { data, setData, post, put, errors, reset, processing } = useForm({
    type: '',
    impact: '',
    status: '',
    recommendation: '',
  });

  const reportForm = useForm({
    report_date: '',
    risk_type: '',
    description: '',
    recommended_action: '',
  });

  const riskColumns = [
    {
      header: 'Jenis Risiko',
      accessor: 'type',
    },
    {
      header: 'Dampak',
      accessor: 'impact',
    },
    {
      header: 'Status',
      accessor: 'status',
    },
    {
      header: 'Rekomendasi Pelanggan',
      accessor: 'recommendation',
    },
  ];

  const openAddRiskModal = () => {
    reset();
    setIsEditMode(false);
    setIsRiskModalOpen(true);
  };

  const openReportModal = () => {
    reportForm.reset();
    setIsReportModalOpen(true);
  };

  const openEditRiskModal = (risk) => {
    setIsEditMode(true);
    setEditingRisk(risk);
    setData({
      type: risk.type,
      impact: risk.impact,
      status: risk.status,
      recommendation: risk.recommendation,
    });
    setIsRiskModalOpen(true);
  };

  const closeRiskModal = () => {
    setIsRiskModalOpen(false);
    reset();
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    reportForm.reset();
  };

  const handleRiskSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      put(route('risks.update', editingRisk.id), {
        onSuccess: () => {
          closeRiskModal();
        },
      });
    } else {
      post(route('risks.store'), {
        onSuccess: () => {
          closeRiskModal();
        },
      });
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();

    reportForm.post(route('risk-reports.store'), {
      onSuccess: () => {
        closeReportModal();
      },
    });
  };

  const handleDelete = (risk) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      router.delete(route('risks.destroy', risk.id));
    }
  };

  const renderStatusIndicator = () => {
    if (riskStatus === 'Risiko Tinggi') {
      return <div className="w-4 h-4 rounded-full bg-red-500"></div>;
    } else if (riskStatus === 'Risiko Sedang') {
      return <div className="w-4 h-4 rounded-full bg-yellow-500"></div>;
    } else {
      return <div className="w-4 h-4 rounded-full bg-green-500"></div>;
    }
  };

  // Count risks by status
  const countRisks = () => {
    const counts = {
      'Tinggi': 0,
      'Sedang': 0,
      'Rendah': 0
    };

    risks.forEach(risk => {
      if (risk.status.includes('Tinggi')) {
        counts['Tinggi']++;
      } else if (risk.status.includes('Sedang')) {
        counts['Sedang']++;
      } else if (risk.status.includes('Rendah')) {
        counts['Rendah']++;
      }
    });

    return counts;
  };

  // Group risk reports by month
  const getReportsByMonth = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const reportsByMonth = {};

    // Initialize all months with zero values
    months.forEach(month => {
      reportsByMonth[month] = { 'Tinggi': 0, 'Sedang': 0, 'Rendah': 0 };
    });

    // Count reports by month and status
    riskReports.forEach(report => {
      const date = new Date(report.report_date);
      const monthIndex = date.getMonth();
      const monthName = months[monthIndex];

      // Find associated risk to get status
      const relatedRisk = risks.find(risk => risk.type === report.risk_type);
      if (relatedRisk) {
        if (relatedRisk.status.includes('Tinggi')) {
          reportsByMonth[monthName]['Tinggi']++;
        } else if (relatedRisk.status.includes('Sedang')) {
          reportsByMonth[monthName]['Sedang']++;
        } else if (relatedRisk.status.includes('Rendah')) {
          reportsByMonth[monthName]['Rendah']++;
        }
      }
    });

    return reportsByMonth;
  };

  // Get data for chart
  const reportsData = getReportsByMonth();
  const months = Object.keys(reportsData);

  // Chart data based on actual database data
  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Risiko Tinggi',
        data: months.map(month => reportsData[month]['Tinggi']),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Risiko Sedang',
        data: months.map(month => reportsData[month]['Sedang']),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Risiko Rendah',
        data: months.map(month => reportsData[month]['Rendah']),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
        display: true,
        text: 'Tren Mitigasi Risiko',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <MainLayout>
      <Head title="Analisis Risiko" />

      <PageHeader
        title="Analisis Risiko"
        description={`Status Terkini: ${riskStatus}`}
      />

      <div className="p-4 md:p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Indikator Warna</h2>
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-2">
                  <input
                    type="radio"
                    id="green"
                    name="indicator"
                    className="h-4 w-4 accent-green-500"
                    checked={riskStatus === 'Risiko Rendah'}
                    readOnly
                  />
                </div>
                <label htmlFor="green" className="text-gray-700">
                  Hijau: Aman
                </label>
              </div>

              <div className="flex items-center">
                <div className="mr-2">
                  <input
                    type="radio"
                    id="yellow"
                    name="indicator"
                    className="h-4 w-4 accent-yellow-500"
                    checked={riskStatus === 'Risiko Sedang'}
                    readOnly
                  />
                </div>
                <label htmlFor="yellow" className="text-gray-700">
                  Kuning: Waspada
                </label>
              </div>

              <div className="flex items-center">
                <div className="mr-2">
                  <input
                    type="radio"
                    id="red"
                    name="indicator"
                    className="h-4 w-4 accent-red-500"
                    checked={riskStatus === 'Risiko Tinggi'}
                    readOnly
                  />
                </div>
                <label htmlFor="red" className="text-gray-700">
                  Merah: Berbahaya
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Diagram Mitigasi Risiko</h2>
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <Bar data={chartData} options={options} />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-0">Tabel Daftar Risiko</h2>
            <div className="flex flex-col md:flex-row gap-2">
              <Button onClick={openReportModal} variant="white">Buat Laporan</Button>
              <Button onClick={openAddRiskModal}>Tambah Risiko</Button>
            </div>
          </div>

          <Table
            columns={riskColumns}
            data={risks}
            actions={(row) => (
              <div className="flex justify-end space-x-2">
                <Button variant="white" size="sm" onClick={() => openEditRiskModal(row)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(row)}>
                  Hapus
                </Button>
              </div>
            )}
          />
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-0">Formulir Pelaporan Risiko</h2>
            <Button onClick={openReportModal} className="mb-2 md:mb-0">Buat Laporan Baru</Button>
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <form onSubmit={handleReportSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Laporan
                  </label>
                  <input
                    type="date"
                    value={reportForm.data.report_date}
                    onChange={(e) => reportForm.setData('report_date', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {reportForm.errors.report_date && (
                    <p className="mt-1 text-sm text-red-600">{reportForm.errors.report_date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Risiko
                  </label>
                  <select
                    value={reportForm.data.risk_type}
                    onChange={(e) => reportForm.setData('risk_type', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Pilih jenis risiko</option>
                    <option value="Operasional">Operasional</option>
                    <option value="Finansial">Finansial</option>
                    <option value="Keamanan">Keamanan</option>
                    <option value="Lingkungan">Lingkungan</option>
                  </select>
                  {reportForm.errors.risk_type && (
                    <p className="mt-1 text-sm text-red-600">{reportForm.errors.risk_type}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={reportForm.data.description}
                  onChange={(e) => reportForm.setData('description', e.target.value)}
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Deskripsikan laporan risiko"
                ></textarea>
                {reportForm.errors.description && (
                  <p className="mt-1 text-sm text-red-600">{reportForm.errors.description}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tindakan yang Direkomendasikan
                </label>
                <textarea
                  value={reportForm.data.recommended_action}
                  onChange={(e) => reportForm.setData('recommended_action', e.target.value)}
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Jelaskan tindakan yang harus diambil"
                ></textarea>
                {reportForm.errors.recommended_action && (
                  <p className="mt-1 text-sm text-red-600">{reportForm.errors.recommended_action}</p>
                )}
              </div>

              <div className="mt-6 text-right">
                <Button type="submit" disabled={reportForm.processing}>
                  Kirim Laporan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal show={isRiskModalOpen} onClose={closeRiskModal} title={isEditMode ? 'Edit Risiko' : 'Tambah Risiko'}>
        <form onSubmit={handleRiskSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Risiko
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
              Dampak
            </label>
            <input
              type="text"
              value={data.impact}
              onChange={(e) => setData('impact', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.impact && (
              <p className="mt-1 text-sm text-red-600">{errors.impact}</p>
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
              <option value="Risiko Rendah">Risiko Rendah</option>
              <option value="Risiko Sedang">Risiko Sedang</option>
              <option value="Risiko Tinggi">Risiko Tinggi</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rekomendasi
            </label>
            <textarea
              value={data.recommendation}
              onChange={(e) => setData('recommendation', e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
            {errors.recommendation && (
              <p className="mt-1 text-sm text-red-600">{errors.recommendation}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="white" onClick={closeRiskModal}>
              Batal
            </Button>
            <Button type="submit" disabled={processing}>
              {isEditMode ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal show={isReportModalOpen} onClose={closeReportModal} title="Laporan Risiko Baru">
        <form onSubmit={handleReportSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Laporan
            </label>
            <input
              type="date"
              value={reportForm.data.report_date}
              onChange={(e) => reportForm.setData('report_date', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {reportForm.errors.report_date && (
              <p className="mt-1 text-sm text-red-600">{reportForm.errors.report_date}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Risiko
            </label>
            <select
              value={reportForm.data.risk_type}
              onChange={(e) => reportForm.setData('risk_type', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Pilih jenis risiko</option>
              <option value="Operasional">Operasional</option>
              <option value="Finansial">Finansial</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Lingkungan">Lingkungan</option>
            </select>
            {reportForm.errors.risk_type && (
              <p className="mt-1 text-sm text-red-600">{reportForm.errors.risk_type}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              value={reportForm.data.description}
              onChange={(e) => reportForm.setData('description', e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Deskripsikan laporan risiko"
            ></textarea>
            {reportForm.errors.description && (
              <p className="mt-1 text-sm text-red-600">{reportForm.errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tindakan yang Direkomendasikan
            </label>
            <textarea
              value={reportForm.data.recommended_action}
              onChange={(e) => reportForm.setData('recommended_action', e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Jelaskan tindakan yang harus diambil"
            ></textarea>
            {reportForm.errors.recommended_action && (
              <p className="mt-1 text-sm text-red-600">{reportForm.errors.recommended_action}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="white" onClick={closeReportModal}>
              Batal
            </Button>
            <Button type="submit" disabled={reportForm.processing}>
              Kirim Laporan
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
