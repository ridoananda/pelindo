import { useState, useEffect, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import theme from '@/theme';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function RisksIndex({ risks, riskStatus, riskReports, riskStats, riskAssessments, fmeaAnalysisSummary }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJob, setFilterJob] = useState('Semua');
  const [activeTab, setActiveTab] = useState('assessments'); // 'assessments' or 'analysis'

  const { data, setData, post, put, errors, reset, processing } = useForm({
    respondent_name: '',
    respondent_job: 'Manajer Bistek Operasional',
    risk_code: '',
    risk_description: '',
    severity: 1,
    occurrence: 1,
    detection: 1,
  });

  // Columns for assessment data table
  const assessmentColumns = [
            {
      header: 'No.',
      accessor: null,
      cell: (value, row, index) => index + 1
    },
    { header: 'Nama Responden', accessor: 'respondent_name' },
    { header: 'Pekerjaan Responden', accessor: 'respondent_job', cell: (value) =>
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{value}</span>
    },
    { header: 'Kode', accessor: 'risk_code', cell: (value) =>
      <span className="font-mono font-bold text-purple-700">{value}</span>
    },
    { header: 'Severity', accessor: 'severity', cell: (value) =>
      <span className={`font-bold px-2 py-1 rounded ${value >= 7 ? 'bg-red-100 text-red-800' : value >= 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{value}</span>
    },
    { header: 'Occurrence', accessor: 'occurrence', cell: (value) =>
      <span className={`font-bold px-2 py-1 rounded ${value >= 7 ? 'bg-red-100 text-red-800' : value >= 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{value}</span>
    },
    { header: 'Detection', accessor: 'detection', cell: (value) =>
      <span className={`font-bold px-2 py-1 rounded ${value >= 7 ? 'bg-red-100 text-red-800' : value >= 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{value}</span>
    },
  ];

  // Columns for analysis summary table
  const summaryColumns = [
    { header: 'Kode', accessor: 'kode', cell: (value) =>
      <span className="font-mono font-bold text-purple-700">{value}</span>
    },
    { header: 'Deskripsi', accessor: 'deskripsi', cell: (value) =>
      <div className="max-w-xs whitespace-normal break-words text-sm">{value}</div>
    },
    { header: 'Avg S', accessor: 'avg_severity', cell: (value) =>
      <span className="font-bold text-blue-600">{value}</span>
    },
    { header: 'Avg O', accessor: 'avg_occurrence', cell: (value) =>
      <span className="font-bold text-green-600">{value}</span>
    },
    { header: 'Avg D', accessor: 'avg_detection', cell: (value) =>
      <span className="font-bold text-orange-600">{value}</span>
    },
    { header: 'RPN', accessor: 'avg_rpn', cell: (value) =>
      <span className="font-extrabold text-lg text-gray-800">{value}</span>
    },
    {
      header: 'Tingkat Risiko',
      accessor: 'tingkat_risiko',
      cell: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          value === 'Tinggi' ? 'bg-red-500 text-white' :
          value === 'Sedang' ? 'bg-yellow-500 text-white' :
          'bg-green-500 text-white'
        }`}>
          {value}
        </span>
      )
    },
  ];

  const filteredAssessments = useMemo(() => {
    if (!riskAssessments || !Array.isArray(riskAssessments)) return [];

    return riskAssessments.filter(assessment => {
      const matchesSearch =
        assessment.respondent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.risk_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.risk_description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesJob = filterJob === 'Semua' || assessment.respondent_job === filterJob;

      return matchesSearch && matchesJob;
    });
  }, [riskAssessments, searchTerm, filterJob]);

  // Chart data for Risk Level Distribution
  const riskLevelDistribution = useMemo(() => {
    const distribution = { 'Tinggi': 0, 'Sedang': 0, 'Rendah': 0 };
    if (fmeaAnalysisSummary && Array.isArray(fmeaAnalysisSummary)) {
      fmeaAnalysisSummary.forEach(item => {
        if (distribution.hasOwnProperty(item.tingkat_risiko)) {
          distribution[item.tingkat_risiko]++;
        }
      });
    }
    return distribution;
  }, [fmeaAnalysisSummary]);

  const pieChartData = {
    labels: Object.keys(riskLevelDistribution),
    datasets: [
      {
        data: Object.values(riskLevelDistribution),
        backgroundColor: [
          '#ef4444', // Red for Tinggi
          '#f59e0b', // Yellow for Sedang
          '#10b981', // Green for Rendah
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
      },
    ],
  };

  // Chart data for RPN Distribution
  const rpnChartData = {
    labels: (fmeaAnalysisSummary && Array.isArray(fmeaAnalysisSummary)) ? fmeaAnalysisSummary.slice(0, 10).map(item => item.kode) : [], // Top 10 risks
    datasets: [
      {
        label: 'Risk Priority Number (RPN)',
        data: (fmeaAnalysisSummary && Array.isArray(fmeaAnalysisSummary)) ? fmeaAnalysisSummary.slice(0, 10).map(item => item.avg_rpn) : [],
        backgroundColor: (fmeaAnalysisSummary && Array.isArray(fmeaAnalysisSummary)) ? fmeaAnalysisSummary.slice(0, 10).map(item =>
          item.tingkat_risiko === 'Tinggi' ? '#ef4444' :
          item.tingkat_risiko === 'Sedang' ? '#f59e0b' : '#10b981'
        ) : [],
        borderColor: '#374151',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: theme.colors.neutral[700],
          font: { size: 12 }
        }
      },
      title: { display: false },
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
      respondent_name: '',
      respondent_job: 'Manajer Bistek Operasional',
      risk_code: '',
      risk_description: '',
      severity: 1,
      occurrence: 1,
      detection: 1,
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (assessment) => {
    setIsEditMode(true);
    setEditingAssessment(assessment);
    setData({
      respondent_name: assessment.respondent_name,
      respondent_job: assessment.respondent_job,
      risk_code: assessment.risk_code,
      risk_description: assessment.risk_description,
      severity: assessment.severity,
      occurrence: assessment.occurrence,
      detection: assessment.detection,
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
      put(route('risk-assessments.update', editingAssessment.id), {
        onSuccess: () => closeModal(),
      });
    } else {
      post(route('risk-assessments.store'), {
        onSuccess: () => closeModal(),
      });
    }
  };

  const handleDelete = (assessment) => {
    if (confirm(`Apakah Anda yakin ingin menghapus assessment ${assessment.respondent_name} untuk kode ${assessment.risk_code}?`)) {
      router.delete(route('risk-assessments.destroy', assessment.id));
    }
  };

  return (
    <MainLayout>
      <Head title="FMEA Analysis - Analisis Risiko" />

      <PageHeader
        title="FMEA (Failure Mode and Effects Analysis)"
        description="Analisis komprehensif risiko operasional pelabuhan menggunakan metode FMEA dengan pendekatan Risk Priority Number (RPN)"
        pattern="shipWheel"
        actions={
          <Button onClick={openAddModal} className="bg-white !text-blue-800 hover:!bg-blue-100 hover:text-white transition-colors shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Assessment
          </Button>
        }
      />

      <div className="p-8 bg-gray-50">
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Tingkat Risiko</h3>
            <div className="h-64">
              {Object.values(riskLevelDistribution).some(val => val > 0) ? (
                <Pie data={pieChartData} options={chartOptions} />
              ) : (
                <p className="text-gray-500 text-center pt-24">Tidak ada data untuk ditampilkan</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 10 Risk Priority Number (RPN)</h3>
            <div className="h-64">
              {(fmeaAnalysisSummary && fmeaAnalysisSummary.length > 0) ? (
                <Bar data={rpnChartData} options={chartOptions} />
              ) : (
                <p className="text-gray-500 text-center pt-24">Tidak ada data untuk ditampilkan</p>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('assessments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'assessments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Data Penilaian Responden
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analysis'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Hasil Analisis FMEA
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'assessments' ? (
              // Assessment Data Table
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Data Penilaian Responden</h3>
                <p className="text-sm text-gray-500 mb-4">Kumpulan data penilaian risiko dari berbagai responden</p>

                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 space-y-3 md:space-y-0">
                  <div className="flex space-x-3">
                    <select
                      value={filterJob}
                      onChange={(e) => setFilterJob(e.target.value)}
                      className="py-2 pl-3 pr-8 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm"
                    >
                      <option value="Semua">Semua Jabatan</option>
                      <option value="Manajer Bistek Operasional">Manajer Bistek Operasional</option>
                      <option value="Petugas Lapangan Operasional">Petugas Lapangan Operasional</option>
                    </select>
                  </div>

                  <div className="relative w-full md:w-2/5">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Cari nama responden, kode risiko..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <Table
                    columns={assessmentColumns}
                    data={filteredAssessments}
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
              </>
            ) : (
              // Analysis Summary Table
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Hasil Analisis FMEA</h3>
                <p className="text-sm text-gray-500 mb-4">Ringkasan analisis risiko berdasarkan rata-rata penilaian responden</p>

                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Keterangan Metode FMEA
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded-md border-l-4 border-blue-500">
                      <strong className="text-blue-900">Severity (S):</strong>
                      <p className="text-blue-800 mt-1">Seberapa parah dampak jika risiko terjadi</p>
                    </div>
                    <div className="bg-white p-3 rounded-md border-l-4 border-green-500">
                      <strong className="text-green-900">Occurrence (O):</strong>
                      <p className="text-green-800 mt-1">Seberapa sering risiko kemungkinan terjadi</p>
                    </div>
                    <div className="bg-white p-3 rounded-md border-l-4 border-orange-500">
                      <strong className="text-orange-900">Detection (D):</strong>
                      <p className="text-orange-800 mt-1">Seberapa mudah risiko dapat dideteksi</p>
                    </div>
                  </div>
                  <div className="mt-3 text-center bg-white p-2 rounded-md">
                    <strong className="text-gray-900">Risk Priority Number (RPN) = S × O × D</strong>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <Table columns={summaryColumns} data={fmeaAnalysisSummary || []} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Assessment Modal */}
      <Modal show={isModalOpen} onClose={closeModal} title={isEditMode ? 'Edit Assessment' : 'Tambah Assessment Baru'} maxWidth="2xl">
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Responden</label>
              <input
                type="text"
                value={data.respondent_name}
                onChange={(e) => setData('respondent_name', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                placeholder="Masukkan nama responden"
              />
              {errors.respondent_name && <p className="text-red-500 text-sm mt-1">{errors.respondent_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan Responden</label>
              <select
                value={data.respondent_job}
                onChange={(e) => setData('respondent_job', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
              >
                <option value="Manajer Bistek Operasional">Manajer Bistek Operasional</option>
                <option value="Petugas Lapangan Operasional">Petugas Lapangan Operasional</option>
              </select>
              {errors.respondent_job && <p className="text-red-500 text-sm mt-1">{errors.respondent_job}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Risiko</label>
              <input
                type="text"
                value={data.risk_code}
                onChange={(e) => setData('risk_code', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                placeholder="Contoh: M01"
              />
              {errors.risk_code && <p className="text-red-500 text-sm mt-1">{errors.risk_code}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Risiko</label>
              <input
                type="text"
                value={data.risk_description}
                onChange={(e) => setData('risk_description', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                placeholder="Deskripsi risiko"
              />
              {errors.risk_description && <p className="text-red-500 text-sm mt-1">{errors.risk_description}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severity (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={data.severity}
                onChange={(e) => setData('severity', parseInt(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
              />
              {errors.severity && <p className="text-red-500 text-sm mt-1">{errors.severity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occurrence (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={data.occurrence}
                onChange={(e) => setData('occurrence', parseInt(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
              />
              {errors.occurrence && <p className="text-red-500 text-sm mt-1">{errors.occurrence}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detection (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={data.detection}
                onChange={(e) => setData('detection', parseInt(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
              />
              {errors.detection && <p className="text-red-500 text-sm mt-1">{errors.detection}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Batal
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? 'Menyimpan...' : (isEditMode ? 'Perbarui' : 'Simpan')}
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
