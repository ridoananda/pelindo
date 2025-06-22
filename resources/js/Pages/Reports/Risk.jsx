import { Head, router, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import { FaExclamationTriangle, FaChartBar, FaClipboardList, FaUser } from 'react-icons/fa';

export default function RiskReport({ risks, riskReports, riskStats, reportType, reportDate, reportPeriod, managerName }) {
  const { url: currentPath } = usePage();

  const riskColumns = [
    {
      key: 'type',
      label: 'Jenis Risiko',
      render: (item) => (
        <div className="flex items-center">
          <FaExclamationTriangle className="mr-2 text-red-600" />
          <span className="font-medium">{item.type}</span>
        </div>
      )
    },
    {
      key: 'impact',
      label: 'Dampak',
      render: (item) => (
        <span className="text-gray-600">{item.impact}</span>
      )
    },
    {
      key: 'status',
      label: 'Tingkat Risiko',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'Ekstrim'
            ? 'bg-red-100 text-red-800'
            : item.status === 'Tinggi'
            ? 'bg-orange-100 text-orange-800'
            : item.status === 'Menengah'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'recommendation',
      label: 'Rekomendasi',
      render: (item) => (
        <span className="text-gray-600 text-sm">
          {item.recommendation ? (item.recommendation.length > 50 ? item.recommendation.substring(0, 50) + '...' : item.recommendation) : '-'}
        </span>
      )
    }
  ];

  const reportColumns = [
    {
      key: 'report_date',
      label: 'Tanggal Laporan',
      render: (item) => (
        <div className="flex items-center text-sm">
          <FaClipboardList className="mr-2 text-gray-600" />
          <span>{item.report_date ? new Date(item.report_date).toLocaleDateString('id-ID') : '-'}</span>
        </div>
      )
    },
    {
      key: 'risk_type',
      label: 'Jenis Risiko',
      render: (item) => (
        <div className="flex items-center">
          <FaExclamationTriangle className="mr-2 text-red-600" />
          <span className="font-medium">{item.risk_type}</span>
        </div>
      )
    },
    {
      key: 'description',
      label: 'Deskripsi',
      render: (item) => (
        <span className="text-gray-600 text-sm">
          {item.description ? (item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description) : '-'}
        </span>
      )
    },
    {
      key: 'recommended_action',
      label: 'Tindakan yang Direkomendasikan',
      render: (item) => (
        <span className="text-gray-600 text-sm">
          {item.recommended_action ? (item.recommended_action.length > 100 ? item.recommended_action.substring(0, 100) + '...' : item.recommended_action) : '-'}
        </span>
      )
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = (format) => {
    const requestUrl = new URL(window.location.origin + currentPath);
    requestUrl.searchParams.set('format', format);

    const targetRoute = requestUrl.pathname + requestUrl.search;

    router.get(targetRoute, {}, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page) => {
        if (page.props.flash && page.props.flash.report_url) {
          window.open(page.props.flash.report_url, '_blank');
        } else if (page.props.flash && page.props.flash.error) {
          alert(`Error generating report: ${page.props.flash.error}`);
        } else {
          alert('Report generation requested. If download does not start, the server may not have provided a download URL.');
        }
      },
      onError: (errors) => {
        const firstErrorKey = Object.keys(errors)[0];
        const errorMessage = firstErrorKey ? errors[firstErrorKey] : 'Unknown error.';
        alert(`Failed to request downloadable report: ${errorMessage}`);
        console.error("Report download request errors:", errors);
      }
    });
  };

  const handleDownloadPDF = () => {
    handleDownload('pdf');
  };

  const handleDownloadExcel = () => {
    handleDownload('excel');
  };

  // Default riskStats if not provided
  const stats = riskStats || {
    total: risks.length,
    ekstrim: risks.filter(item => item.status === 'Ekstrim').length,
    tinggi: risks.filter(item => item.status === 'Tinggi').length,
    menengah: risks.filter(item => item.status === 'Menengah').length,
    rendah: risks.filter(item => item.status === 'Rendah').length,
  };

  return (
    <MainLayout>
      <Head title={reportType} />

      <PageHeader
        title={reportType}
        description={`Periode: ${reportPeriod} | Dibuat pada: ${reportDate}`}
        pattern="grid"
      />

      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Risiko</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FaChartBar className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ekstrim</p>
                <p className="text-2xl font-bold text-red-600">{stats.ekstrim}</p>
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">!</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tinggi</p>
                <p className="text-2xl font-bold text-orange-600">{stats.tinggi}</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">⚠</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Menengah</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.menengah}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-sm">◐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rendah</p>
                <p className="text-2xl font-bold text-green-600">{stats.rendah}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FaExclamationTriangle className="mr-2 text-red-600" />
              Daftar Risiko
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Menampilkan {risks.length} risiko untuk periode {reportPeriod}
            </p>
          </div>

          <Table
            columns={riskColumns}
            data={risks}
            emptyMessage="Tidak ada data risiko untuk periode ini."
          />
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FaClipboardList className="mr-2 text-blue-600" />
              Laporan Insiden Risiko
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Menampilkan {riskReports.length} laporan insiden untuk periode {reportPeriod}
            </p>
          </div>

          <Table
            columns={reportColumns}
            data={riskReports}
            emptyMessage="Tidak ada laporan insiden risiko untuk periode ini."
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="white" onClick={handlePrint}>
            Preview
          </Button>

          <Button onClick={handleDownloadPDF}>
            Download PDF
          </Button>

          <Button variant="secondary" onClick={handleDownloadExcel}>
            Download Excel
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
