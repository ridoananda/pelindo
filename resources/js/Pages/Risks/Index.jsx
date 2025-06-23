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
  const [activeTab, setActiveTab] = useState('analysis'); // Changed from 'assessments' to 'analysis'

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
        title="Manajemen Risiko"
        subtitle="Kelola dan pantau risiko operasional pelabuhan"
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Risiko', current: true },
        ]}
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
            {/* Analysis Summary Table */}
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
