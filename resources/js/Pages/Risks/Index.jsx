import { useState, useEffect, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import Toast from '@/Components/Toast';
import RiskForm from '@/Components/Risks/RiskForm';
import RiskReportForm from '@/Components/Risks/RiskReportForm';
import RiskAssessmentForm from '@/Components/Risks/RiskAssessmentForm';
import DeleteConfirmationModal from '@/Components/Risks/DeleteConfirmationModal';
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

export default function RisksIndex({ risks, riskStatus, riskReports, riskStats, riskAssessments, fmeaAnalysisSummary, flash }) {
  // Modal states
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit states
  const [editingRisk, setEditingRisk] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [editingAssessment, setEditingAssessment] = useState(null);

  // Delete states
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJob, setFilterJob] = useState('Semua');
  const [activeTab, setActiveTab] = useState('risks');

  // Toast states
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'info'
  });

  // Toast functions
  const showToast = (message, type = 'info') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast({
      isVisible: false,
      message: '',
      type: 'info'
    });
  };

  // Show flash message on component mount
  useEffect(() => {
    if (flash?.success) {
      showToast(flash.success, 'success');
    } else if (flash?.error) {
      showToast(flash.error, 'error');
    }
  }, [flash]);

  // Columns for risks table
  const riskColumns = [
    {
      header: 'No.',
      accessor: null,
      cell: (value, row, index) => index + 1
    },
    { header: 'Jenis Risiko', accessor: 'type' },
    { header: 'Dampak', accessor: 'impact' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          value === 'Tinggi' ? 'bg-red-500 text-white' :
          'bg-green-500 text-white'
        }`}>
          {value}
        </span>
      )
    },
    {
      header: 'Rekomendasi',
      accessor: 'recommendation',
      cell: (value) => (
        <div className="max-w-xs whitespace-normal break-words text-sm">
          {value}
        </div>
      )
    },
    {
      header: 'Aksi',
      accessor: null,
      cell: (value, row) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => openEditRiskModal(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openDeleteModal(row, 'risk')}
            className="text-red-600 hover:text-red-800"
          >
            Hapus
          </Button>
        </div>
      )
    },
  ];

  // Columns for risk reports table
  const reportColumns = [
    {
      header: 'No.',
      accessor: null,
      cell: (value, row, index) => index + 1
    },
    {
      header: 'Tanggal',
      accessor: 'report_date',
      cell: (value) => new Date(value).toLocaleDateString('id-ID')
    },
    { header: 'Jenis Risiko', accessor: 'risk_type' },
    {
      header: 'Deskripsi',
      accessor: 'description',
      cell: (value) => (
        <div className="max-w-xs whitespace-normal break-words text-sm">
          {value}
        </div>
      )
    },
    {
      header: 'Tindakan',
      accessor: 'recommended_action',
      cell: (value) => (
        <div className="max-w-xs whitespace-normal break-words text-sm">
          {value}
        </div>
      )
    },
    {
      header: 'Aksi',
      accessor: null,
      cell: (value, row) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => openEditReportModal(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openDeleteModal(row, 'report')}
            className="text-red-600 hover:text-red-800"
          >
            Hapus
          </Button>
        </div>
      )
    },
  ];

  // Columns for assessment data table
  const assessmentColumns = [
            {
      header: 'No.',
      accessor: null,
      cell: (value, row, index) => index + 1
    },
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
    {
      header: 'RPN',
      accessor: null,
      cell: (value, row) => {
        const rpn = row.severity * row.occurrence * row.detection;
        const riskLevel = rpn >= 150 ? 'Tinggi' : 'Normal';
        return (
          <div className="text-center">
            <div className="font-bold text-lg">{rpn}</div>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              riskLevel === 'Tinggi' ? 'bg-red-500 text-white' :
              'bg-green-500 text-white'
            }`}>
              {riskLevel}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Aksi',
      accessor: null,
      cell: (value, row) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => openEditAssessmentModal(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openDeleteModal(row, 'assessment')}
            className="text-red-600 hover:text-red-800"
          >
            Hapus
          </Button>
        </div>
      )
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
        assessment.risk_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.risk_description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesJob = filterJob === 'Semua' || assessment.respondent_job === filterJob;

      return matchesSearch && matchesJob;
    });
  }, [riskAssessments, searchTerm, filterJob]);

  // Chart data for Risk Level Distribution
  const riskLevelDistribution = useMemo(() => {
    const distribution = { 'Tinggi': 0, 'Normal': 0 };
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
          '#10b981', // Green for Normal
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
          item.tingkat_risiko === 'Tinggi' ? '#ef4444' : '#10b981'
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

  // Modal handlers
  const openAddRiskModal = () => {
    setEditingRisk(null);
    setIsRiskModalOpen(true);
  };

  const openEditRiskModal = (risk) => {
    setEditingRisk(risk);
    setIsRiskModalOpen(true);
  };

  const openAddReportModal = () => {
    setEditingReport(null);
    setIsReportModalOpen(true);
  };

  const openEditReportModal = (report) => {
    setEditingReport(report);
    setIsReportModalOpen(true);
  };

  const openAddAssessmentModal = () => {
    setEditingAssessment(null);
    setIsAssessmentModalOpen(true);
  };

  const openEditAssessmentModal = (assessment) => {
    setEditingAssessment(assessment);
    setIsAssessmentModalOpen(true);
  };

  const openDeleteModal = (item, type) => {
    setDeleteItem(item);
    setDeleteType(type);
    setIsDeleteModalOpen(true);
  };

  const closeAllModals = () => {
    setIsRiskModalOpen(false);
    setIsReportModalOpen(false);
    setIsAssessmentModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingRisk(null);
    setEditingReport(null);
    setEditingAssessment(null);
    setDeleteItem(null);
    setDeleteType('');
  };

  const handleDelete = () => {
    if (!deleteItem || !deleteType) return;

    setIsDeleting(true);

    let routeName = '';
    let itemId = '';
    let successMessage = '';

    switch (deleteType) {
      case 'risk':
        routeName = 'risks.destroy';
        itemId = deleteItem.id;
        successMessage = 'Data risiko berhasil dihapus';
        break;
      case 'report':
        routeName = 'risk-reports.destroy';
        itemId = deleteItem.id;
        successMessage = 'Laporan risiko berhasil dihapus';
        break;
      case 'assessment':
        routeName = 'risk-assessments.destroy';
        itemId = deleteItem.id;
        successMessage = 'Assessment FMEA berhasil dihapus';
        break;
      default:
        return;
    }

    router.delete(route(routeName, itemId), {
      onSuccess: () => {
        closeAllModals();
        setIsDeleting(false);
        showToast(successMessage, 'success');
      },
      onError: () => {
        setIsDeleting(false);
        showToast('Terjadi kesalahan saat menghapus data', 'error');
      }
    });
  };

  const getDeleteModalProps = () => {
    if (!deleteItem || !deleteType) return {};

    switch (deleteType) {
      case 'risk':
        return {
          title: 'Hapus Data Risiko',
          message: 'Apakah Anda yakin ingin menghapus data risiko ini?',
          itemName: deleteItem.type,
        };
      case 'report':
        return {
          title: 'Hapus Laporan Risiko',
          message: 'Apakah Anda yakin ingin menghapus laporan risiko ini?',
          itemName: deleteItem.risk_type,
        };
      case 'assessment':
        return {
          title: 'Hapus Assessment FMEA',
          message: 'Apakah Anda yakin ingin menghapus assessment FMEA ini?',
          itemName: deleteItem.risk_code,
        };
      default:
        return {};
    }
  };

  return (
    <MainLayout>
      <Head title="Manajemen Risiko - Analisis Risiko" />

      <PageHeader
        title="Manajemen Risiko"
        subtitle="Kelola dan pantau risiko operasional pelabuhan"
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Risiko', current: true },
        ]}
      />

      <div className="p-8 bg-gray-50">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Risiko</p>
                <p className="text-2xl font-bold text-gray-900">{riskStats?.total || 0}</p>
              </div>
            </div>
          </div>


          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Risiko Tinggi</p>
                <p className="text-2xl font-bold text-orange-600">{riskStats?.tinggi || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Status Keseluruhan</p>
                <p className={`text-2xl font-bold ${
                  riskStatus === 'Tinggi' ? 'text-red-600' :
                  'text-green-600'
                }`}>
                  {riskStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

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

        {/* Main Content with Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('risks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'risks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Data Risiko
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Laporan Risiko
              </button>
              <button
                onClick={() => setActiveTab('assessments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'assessments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Assessment FMEA
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
            {/* Risks Tab */}
            {activeTab === 'risks' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Data Risiko</h3>
                    <p className="text-sm text-gray-500">Kelola data risiko operasional pelabuhan</p>
                  </div>
                  <Button
                    onClick={openAddRiskModal}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Risiko
                  </Button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <Table columns={riskColumns} data={risks || []} />
                </div>
              </>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Laporan Risiko</h3>
                    <p className="text-sm text-gray-500">Kelola laporan kejadian risiko</p>
                  </div>
                  <Button
                    onClick={openAddReportModal}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Laporan
                  </Button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <Table columns={reportColumns} data={riskReports || []} />
                </div>
              </>
            )}

            {/* Assessments Tab */}
            {activeTab === 'assessments' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Assessment FMEA</h3>
                    <p className="text-sm text-gray-500">Kelola penilaian FMEA (Failure Mode and Effect Analysis)</p>
                  </div>
                  <Button
                    onClick={openAddAssessmentModal}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Assessment
                  </Button>
                </div>

                {/* Search and Filter */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Cari berdasarkan nama, kode, atau deskripsi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <select
                      value={filterJob}
                      onChange={(e) => setFilterJob(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Semua">Semua Posisi</option>
                      <option value="Manajer Bistek Operasional">Manajer Bistek Operasional</option>
                      <option value="Petugas Lapangan Operasional">Petugas Lapangan Operasional</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <Table columns={assessmentColumns} data={filteredAssessments} />
                </div>
              </>
            )}

            {/* Analysis Tab */}
            {activeTab === 'analysis' && (
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

              {/* High Risk Mitigation Section */}
              <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200 p-6">
                <h4 className="text-xl font-bold text-red-900 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  HASIL FMEA TINGKAT RISIKO OPERASIONAL PELABUHAN
                </h4>
                <p className="text-red-800 mb-6 font-medium">
                  Hasil mitigasi risiko dengan tingkat risiko tertinggi berdasarkan perhitungan RPN.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg shadow-sm">
                    <thead className="bg-red-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Kode</th>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Mode Kegagalan</th>
                        <th className="px-4 py-3 text-center font-semibold text-sm">RPN</th>
                        <th className="px-4 py-3 text-left font-semibold text-sm">Mitigasi Risiko</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">M01</span>
                        </td>
                        <td className="px-4 py-4 text-gray-900">Data peti kemas tidak tercatat atau salah</td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">196,92</span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 text-sm">
                          Wajibkan semua petugas menerima dokumen muatan resmi dari pihak pelayaran sebelum kegiatan dimulai.
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">M04</span>
                        </td>
                        <td className="px-4 py-4 text-gray-900">Jadwal kapal tumpang tindih</td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">151,25</span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 text-sm">
                          Terapkan sistem jadwal berbasis shift harian tetap dan larangan perubahan mendadak tanpa persetujuan.
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">M05</span>
                        </td>
                        <td className="px-4 py-4 text-gray-900">Kapal pandu tidak tersedia saat dibutuhkan</td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">153,90</span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 text-sm">
                          Buat sistem giliran kerja dan siaga (standby) bagi kapal pandu di jam sibuk atau waktu padat sandar.
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">M07</span>
                        </td>
                        <td className="px-4 py-4 text-gray-900">Laporan tidak terkirim tepat waktu</td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">156,24</span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 text-sm">
                          Tetapkan jam batas pelaporan harian di SOP dan beri teguran resmi jika melewati batas waktu.
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">M08</span>
                        </td>
                        <td className="px-4 py-4 text-gray-900">Data kapal dan peti kemas tidak sinkron</td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">197,39</span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 text-sm">
                          Buat tim verifikasi gabungan dari divisi kapal dan logistik yang bertugas mencocokkan data sebelum bongkar.
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">M09</span>
                        </td>
                        <td className="px-4 py-4 text-gray-900">Kecelakaan kerja saat bongkar muat</td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">155,02</span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 text-sm">
                          Wajibkan briefing keselamatan sebelum shift dimulai dan pengawasan langsung oleh mandor tiap kegiatan.
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">M20</span>
                        </td>
                        <td className="px-4 py-4 text-gray-900">Informasi status kapal tidak seragam</td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">155,60</span>
                        </td>
                        <td className="px-4 py-4 text-gray-700 text-sm">
                          Buat daftar istilah status kapal resmi dan adakan pelatihan setiap bulan untuk semua petugas operasional.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        show={isRiskModalOpen}
        onClose={closeAllModals}
        title={editingRisk ? 'Edit Data Risiko' : 'Tambah Data Risiko'}
        maxWidth="lg"
      >
        <RiskForm
          risk={editingRisk}
          onClose={closeAllModals}
          isEdit={!!editingRisk}
        />
      </Modal>

      <Modal
        show={isReportModalOpen}
        onClose={closeAllModals}
        title={editingReport ? 'Edit Laporan Risiko' : 'Tambah Laporan Risiko'}
        maxWidth="lg"
      >
        <RiskReportForm
          report={editingReport}
          onClose={closeAllModals}
          isEdit={!!editingReport}
        />
      </Modal>

      <Modal
        show={isAssessmentModalOpen}
        onClose={closeAllModals}
        title={editingAssessment ? 'Edit Assessment FMEA' : 'Tambah Assessment FMEA'}
        maxWidth="xl"
      >
        <RiskAssessmentForm
          assessment={editingAssessment}
          onClose={closeAllModals}
          isEdit={!!editingAssessment}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeAllModals}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        {...getDeleteModalProps()}
      />

      {/* Toast Notification */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </MainLayout>
  );
}
