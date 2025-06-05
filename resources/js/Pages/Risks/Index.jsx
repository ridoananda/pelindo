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
import { FaTrash } from 'react-icons/fa';
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

export default function RisksIndex({ risks, riskStatus, riskReports }) {
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [searchTermRisks, setSearchTermRisks] = useState('');
  const [filterRiskStatus, setFilterRiskStatus] = useState('Semua');
  const [searchTermReports, setSearchTermReports] = useState('');
  const [filterReportYear, setFilterReportYear] = useState(new Date().getFullYear().toString());

  const { data, setData, post, put, errors, reset, processing } = useForm({
    type: '', // Formerly risk_name, maps to DB risks.type
    likelihood: 'Sedang',
    impact: 'Sedang', // Maps to DB risks.impact
    risk_level: 'Menengah', // Calculated, its value sent as 'status' to DB risks.status
    recommendation: '', // Formerly mitigation_strategy, maps to DB risks.recommendation
  });

  const reportForm = useForm({
    report_date: new Date().toISOString().slice(0,10),
    risk_type: '', // New field, maps to DB risk_reports.risk_type (replaces risk_id)
    description: '', // Maps to DB risk_reports.description
    recommended_action: '', // Maps to DB risk_reports.recommended_action
  });

  // Define colors for risk levels
  const riskLevelColors = {
    'Rendah': 'bg-green-100 text-green-800',
    'Menengah': 'bg-yellow-100 text-yellow-800',
    'Tinggi': 'bg-orange-100 text-orange-800',
    'Ekstrim': 'bg-red-100 text-red-800',
  };

  const riskColumns = [
    { header: 'Nama Risiko/Jenis', accessor: 'type' },
    { header: 'Potensi Dampak', accessor: 'impact' },
    {
      header: 'Tingkat Risiko',
      accessor: 'status',
      cell: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskLevelColors[value] || 'bg-gray-100 text-gray-800'}`}>
          {value}
        </span>
      ),
    },
    { header: 'Rekomendasi Mitigasi', accessor: 'recommendation' },
  ];

  const riskReportColumns = [
    {
      header: 'Tanggal Laporan',
      accessor: 'report_date',
      cell: (value) => new Date(value).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric'})
    },
    {
      header: 'Jenis Risiko Terkait', // Changed label
      accessor: 'risk_type'
    },
    { header: 'Deskripsi Insiden', accessor: 'description', cell: (value) => <div className="whitespace-normal break-words max-w-xs">{value}</div> },
    {
      header: 'Rekomendasi Tindakan',
      accessor: 'recommended_action',
      cell: (value) => <div className="whitespace-normal break-words max-w-xs">{value}</div>
    }
  ];

  // Calculate risk level based on likelihood and impact (example logic)
  const calculateRiskLevel = (likelihood, impact) => {
    const scores = { 'Rendah': 1, 'Sedang': 2, 'Tinggi': 3, 'Sangat Tinggi': 4 };
    const likelihoodScore = scores[likelihood] || 1;
    const impactScore = scores[impact] || 1;
    const totalScore = likelihoodScore * impactScore;

    if (totalScore <= 2) return 'Rendah';
    if (totalScore <= 4) return 'Menengah';
    if (totalScore <= 8) return 'Tinggi';
    return 'Ekstrim';
  };

  useEffect(() => {
    if (data.likelihood && data.impact) {
      setData('risk_level', calculateRiskLevel(data.likelihood, data.impact));
    }
  }, [data.likelihood, data.impact]);

  const openAddRiskModal = () => {
    reset(); // Resets 'data' form
    setData({
        type: '',
        likelihood: 'Sedang',
        impact: 'Sedang',
        risk_level: calculateRiskLevel('Sedang', 'Sedang'), // This is correct, value will be sent as 'status'
        recommendation: '',
    });
    setIsEditMode(false);
    setIsRiskModalOpen(true);
  };

  const openReportModal = () => {
    reportForm.reset();
    reportForm.setData({
        report_date: new Date().toISOString().slice(0,10),
        risk_type: '', // Changed from risk_id
        description: '',
        recommended_action: '',
    })
    setIsReportModalOpen(true);
  };

  const openEditRiskModal = (risk) => {
    setIsEditMode(true);
    setEditingRisk(risk);
    // Assuming 'risk' object from backend has fields: type, impact, status (for risk level), recommendation
    setData({
      type: risk.type || '',
      likelihood: risk.likelihood || 'Sedang', // Likelihood might not come from DB, so default
      impact: risk.impact || 'Sedang',
      risk_level: risk.status || calculateRiskLevel(risk.likelihood || 'Sedang', risk.impact || 'Sedang'), // risk.status from DB is the risk level
      recommendation: risk.recommendation || '',
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
    // Ensure risk_level (calculated) is sent as 'status' for the DB
    const finalData = {
        type: data.type,
        impact: data.impact,
        status: data.risk_level, // data.risk_level holds the calculated 'Rendah', 'Menengah', etc.
        recommendation: data.recommendation,
        // likelihood is not sent
    };
    if (isEditMode) {
      put(route('risks.update', editingRisk.id), { data: finalData, onSuccess: () => closeRiskModal() });
    } else {
      post(route('risks.store'), { data: finalData, onSuccess: () => closeRiskModal() });
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // reportForm.data already matches the schema: report_date, risk_type, description, recommended_action
    reportForm.post(route('risk-reports.store'), {
      onSuccess: () => closeReportModal(),
    });
  };

  const handleDeleteRisk = (risk) => {
    if (confirm(`Apakah Anda yakin ingin menghapus risiko: ${risk.risk_name}?`)) {
      router.delete(route('risks.destroy', risk.id));
    }
  };

  const handleDeleteReport = (report) => {
    if (confirm(`Apakah Anda yakin ingin menghapus laporan insiden tanggal ${new Date(report.report_date).toLocaleDateString('id-ID')}?`)) {
      // Assuming a route like 'risk-reports.destroy' exists
      router.delete(route('risk-reports.destroy', report.id)); 
    }
  };

  const filteredRisks = useMemo(() => {
    return risks.filter(risk => {
      const searchTermLower = searchTermRisks.toLowerCase();
      const matchesSearch =
        (risk.type?.toLowerCase() ?? '').includes(searchTermLower) ||
        (risk.impact?.toLowerCase() ?? '').includes(searchTermLower) ||
        (risk.recommendation?.toLowerCase() ?? '').includes(searchTermLower);

      // Assuming filterRiskStatus now refers to the risk level (e.g., 'Sedang', 'Tinggi')
      // which is stored in risk.status from the seeder data.
      const matchesStatus = filterRiskStatus === 'Semua' || (risk.status?.toLowerCase() ?? '') === filterRiskStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [risks, searchTermRisks, filterRiskStatus]);

  const filteredRiskReports = useMemo(() => {
    return riskReports
      .filter(report => new Date(report.report_date).getFullYear().toString() === filterReportYear)
      .filter(report => {
        const searchTermLower = searchTermReports.toLowerCase();
        return (
            (report.description?.toLowerCase() ?? '').includes(searchTermLower) ||
            (report.risk_type?.toLowerCase() ?? '').includes(searchTermLower) ||
            (report.recommended_action?.toLowerCase() ?? '').includes(searchTermLower)
        );
    });
  }, [riskReports, searchTermReports, filterReportYear]);

  // Data for Risk Level Distribution Chart (Pie Chart)
  const riskLevelDistribution = useMemo(() => {
    const canonicalDistribution = { 'Rendah': 0, 'Menengah': 0, 'Tinggi': 0, 'Ekstrim': 0 };
    filteredRisks.forEach(risk => {
      let level = risk.status;
      if (level === 'Sedang') { // Consolidate 'Sedang' into 'Menengah'
        level = 'Menengah';
      }
      if (canonicalDistribution.hasOwnProperty(level)) {
        canonicalDistribution[level]++;
      } else if (level) {
        // Optional: Log if other unexpected levels appear, though they won't be charted unless added to canonicalDistribution
        // console.warn(`Unexpected risk status for chart: ${level}`);
      }
    });
    return canonicalDistribution;
  }, [filteredRisks]);

  const pieChartData = {
    labels: Object.keys(riskLevelDistribution),
    datasets: [
      {
        data: Object.values(riskLevelDistribution),
        backgroundColor: [
          theme.colors.accent.success,
          theme.colors.accent.warning,
          theme.colors.primary[500], // Orange for Tinggi
          theme.colors.accent.danger, // Red for Ekstrim
        ],
        borderColor: theme.colors.neutral.white,
        borderWidth: 2,
      },
    ],
  };

  // Data for Risk Reports Over Time (Bar Chart)
  const monthlyReportData = useMemo(() => {
    // const months = Array(12).fill(0).map(() => ({ Baru: 0, Investigasi: 0, Selesai: 0 })); // Old structure
    const months = Array(12).fill(0); // Simplified: just count of reports per month
    filteredRiskReports.forEach(report => {
      const month = new Date(report.report_date).getMonth();
      // months[month][report.report_status] = (months[month][report.report_status] || 0) + 1; // Old logic
      months[month] = (months[month] || 0) + 1;
    });
    return months;
  }, [filteredRiskReports]);

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [
      // { label: 'Baru', data: monthlyReportData.map(m => m.Baru), backgroundColor: theme.colors.accent.info }, // REMOVED
      // { label: 'Investigasi', data: monthlyReportData.map(m => m.Investigasi), backgroundColor: theme.colors.secondary[500] }, // REMOVED
      // { label: 'Selesai', data: monthlyReportData.map(m => m.Selesai), backgroundColor: theme.colors.primary[700] }, // REMOVED
      { label: 'Jumlah Laporan', data: monthlyReportData, backgroundColor: theme.colors.primary[600] }, // Simplified dataset
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: theme.colors.neutral[700] } },
      title: { display: false },
    },
    scales: { y: { beginAtZero: true, ticks: { color: theme.colors.neutral[600] }, grid: { color: theme.colors.neutral[200] } }, x: { ticks: { color: theme.colors.neutral[600] }, grid: { display: false } } },
  };

  const overallRiskLevel = useMemo(() => {
    if (risks.some(r => r.status === 'Ekstrim')) return { level: 'Ekstrim', color: 'red-600', icon: '🔥', textColor: 'text-white', toColor: 'red-800' };
    if (risks.some(r => r.status === 'Tinggi')) return { level: 'Tinggi', color: 'orange-500', icon: '🔶', textColor: 'text-gray-800', toColor: 'orange-700' };
    if (risks.some(r => r.status === 'Menengah')) return { level: 'Menengah', color: 'yellow-500', icon: '⚠️', textColor: 'text-gray-800', toColor: 'yellow-700' };
    if (risks.some(r => r.status === 'Rendah')) return { level: 'Rendah', color: 'green-500', icon: '✅', textColor: 'text-gray-800', toColor: 'green-700' };
    return { level: 'Rendah', color: 'green-500', icon: '✅', textColor: 'text-gray-800', toColor: 'green-700' };
  }, [risks]);

  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <MainLayout>
      <Head title="Analisis Risiko" />

      <PageHeader
        title="Analisis & Manajemen Risiko"
        description={`Identifikasi, evaluasi, dan mitigasi potensi risiko di operasional pelabuhan.`}
        pattern="shipWheel"
        actions={
          <div className="flex space-x-2">
            <Button onClick={openAddRiskModal} className="bg-white text-blue-800 hover:bg-blue-100 transition-colors shadow-md">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Identifikasi Risiko Baru
            </Button>
            <Button onClick={openReportModal} variant="secondary" className="bg-teal-600 hover:bg-teal-700 text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Lapor Insiden
            </Button>
          </div>
        }
      />

      <div className="p-8 bg-gray-50">
        {/* Overall Risk & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className={`lg:col-span-1 bg-gradient-to-br from-${overallRiskLevel.color} to-${overallRiskLevel.toColor} p-6 rounded-xl shadow-lg ${overallRiskLevel.textColor} flex flex-col justify-center items-center`}>
            <div className="text-6xl mb-3">{overallRiskLevel.icon}</div>
            <h3 className="text-xl font-bold mb-1">Status Risiko Keseluruhan</h3>
            <p className={`text-3xl font-black tracking-tight`}>{overallRiskLevel.level}</p>
            <p className={`text-sm mt-1 ${overallRiskLevel.textColor === 'text-white' ? 'opacity-80' : 'opacity-75'}`}>Berdasarkan data risiko aktif saat ini.</p>
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Tingkat Risiko Aktif</h3>
             <div className="h-64 md:h-72">
                {filteredRisks.length > 0 ? 
                    <Pie data={pieChartData} options={{...chartOptions, plugins: {...chartOptions.plugins, legend: {position: 'right'}}}} /> 
                    : <p className="text-gray-500 text-center pt-10">Tidak ada data risiko aktif untuk ditampilkan.</p> }
            </div>
          </div>
                </div>

        {/* Risks Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Daftar Identifikasi Risiko</h3>
            <p className="text-sm text-gray-500 mb-4">Kelola semua risiko yang telah teridentifikasi.</p>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 space-y-3 md:space-y-0">
              <div className="relative w-full md:w-2/5">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input type="text" placeholder="Cari nama risiko, kategori, PIC..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm" value={searchTermRisks} onChange={(e) => setSearchTermRisks(e.target.value)} />
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <Table columns={riskColumns} data={filteredRisks} actions={(row) => (
                <div className="flex justify-end space-x-2">
                  <Button variant="white" size="sm" onClick={() => openEditRiskModal(row)} className="border border-gray-300 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteRisk(row)} className="bg-red-600 text-white hover:bg-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Hapus
                  </Button>
                </div>
              )} />
            </div>
          </div>
        </div>

        {/* Risk Reports Table & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">Laporan Insiden Risiko</h3>
                    <p className="text-sm text-gray-500 mb-4">Daftar semua insiden yang dilaporkan terkait risiko.</p>
                     <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 space-y-3 md:space-y-0">
                        <div>
                            <label htmlFor="report-year-filter" className="sr-only">Tahun Laporan</label>
                            <select id="report-year-filter" value={filterReportYear} onChange={(e) => setFilterReportYear(e.target.value)} className="py-2 pl-3 pr-8 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm">
                                {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <div className="relative w-full md:w-2/5">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input type="text" placeholder="Cari laporan..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm" value={searchTermReports} onChange={(e) => setSearchTermReports(e.target.value)} />
                        </div>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <Table columns={riskReportColumns} data={filteredRiskReports} actions={(row) => (
                            <div className="flex justify-end">
                                <Button variant="danger" size="xs" onClick={() => handleDeleteReport(row)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md text-xs">
                                    <FaTrash />
                                </Button>
                            </div>
                        )} />
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tren Laporan Insiden ({filterReportYear})</h3>
                <div className="h-80 md:h-96">
                     {filteredRiskReports.length > 0 ? 
                        <Bar data={barChartData} options={chartOptions} /> 
                        : <p className="text-gray-500 text-center pt-10">Tidak ada data laporan insiden untuk ditampilkan pada tahun {filterReportYear}.</p>}
          </div>
              </div>
        </div>

          </div>

      {/* Risk Identification Modal */}
      <Modal show={isRiskModalOpen} onClose={closeRiskModal} title={isEditMode ? 'Edit Identifikasi Risiko' : 'Identifikasi Risiko Baru'} maxWidth="2xl">
        <form onSubmit={handleRiskSubmit} className="space-y-4 p-1">
                <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama/Jenis Risiko</label> 
            <input type="text" value={data.type} onChange={(e) => setData('type', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5" placeholder="Contoh: Kerusakan Alat Berat"/>
            {errors.type && <p className="error-message">{errors.type}</p>}
                </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kemungkinan Terjadi (Likelihood)</label>
              <select value={data.likelihood} onChange={(e) => setData('likelihood', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5">
                <option value="Rendah">Rendah (Rare)</option>
                <option value="Sedang">Sedang (Possible)</option>
                <option value="Tinggi">Tinggi (Likely)</option>
              </select>
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dampak Jika Terjadi (Impact)</label>
              <select value={data.impact} onChange={(e) => setData('impact', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5">
                <option value="Rendah">Rendah (Insignificant)</option>
                <option value="Sedang">Sedang (Minor)</option>
                <option value="Tinggi">Tinggi (Moderate)</option>
                <option value="Sangat Tinggi">Sangat Tinggi (Major/Catastrophic)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat Risiko (Otomatis)</label>
            <input
              type="text"
              value={data.risk_level} // This holds the calculated level e.g. 'Menengah'
              readOnly
              className="w-full rounded-md border-gray-300 bg-gray-100 shadow-sm p-2.5 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rekomendasi Mitigasi</label>
            <textarea value={data.recommendation} onChange={(e) => setData('recommendation', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5" rows="3" placeholder="Rencana tindakan untuk mengurangi kemungkinan atau dampak risiko..."></textarea>
            {errors.recommendation && <p className="error-message">{errors.recommendation}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="white" onClick={closeRiskModal} className="border border-gray-300">Batal</Button>
            <Button type="submit" disabled={processing} className="bg-blue-700 hover:bg-blue-800 text-white">
              {processing ? 'Menyimpan...' : (isEditMode ? 'Update Risiko' : 'Simpan Risiko')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Risk Report Modal */}
      <Modal show={isReportModalOpen} onClose={closeReportModal} title="Lapor Insiden Baru" maxWidth="xl">
        <form onSubmit={handleReportSubmit} className="space-y-4 p-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pelaporan</label>
            <input type="date" value={reportForm.data.report_date} onChange={(e) => reportForm.setData('report_date', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"/>
            {reportForm.errors.report_date && <p className="error-message">{reportForm.errors.report_date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Risiko Terkait</label>
            <input type="text" value={reportForm.data.risk_type} onChange={(e) => reportForm.setData('risk_type', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5" placeholder="Contoh: Risiko Operasional Pelabuhan"/>
            {reportForm.errors.risk_type && <p className="error-message">{reportForm.errors.risk_type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Kejadian</label>
            <textarea value={reportForm.data.description} onChange={(e) => reportForm.setData('description', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5" rows="4" placeholder="Jelaskan insiden yang terjadi, kapan, dimana, dan siapa yang terlibat..."></textarea>
            {reportForm.errors.description && <p className="error-message">{reportForm.errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rekomendasi Tindakan</label>
            <textarea value={reportForm.data.recommended_action} onChange={(e) => reportForm.setData('recommended_action', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5" rows="3" placeholder="Rekomendasi tindakan untuk menangani insiden..."></textarea>
            {reportForm.errors.recommended_action && <p className="error-message">{reportForm.errors.recommended_action}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="white" onClick={closeReportModal} className="border border-gray-300">Batal</Button>
            <Button type="submit" disabled={reportForm.processing} className="bg-teal-600 hover:bg-teal-700 text-white">
              {reportForm.processing ? 'Mengirim...' : 'Kirim Laporan'}
            </Button>
          </div>
        </form>
        <style jsx global>{`
          .input-class {
            display: block;
            width: 100%;
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            border-width: 1px;
            border-color: #D1D5DB; /* gray-300 */
            border-radius: 0.375rem; /* rounded-md */
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          }
          .input-class:focus {
            border-color: #60A5FA; /* blue-300 */
            outline: 2px solid transparent;
            outline-offset: 2px;
            --tw-ring-color: #93C5FD; /* blue-200 */
            --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
          }
          .error-message {
            margin-top: 0.25rem;
            font-size: 0.875rem;
            color: #EF4444; /* red-600 */
          }
        `}</style>
      </Modal>
    </MainLayout>
  );
}
