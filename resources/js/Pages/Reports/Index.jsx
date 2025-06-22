import { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Button';
import theme from '@/theme';
import { FaFileInvoice, FaShip, FaShieldAlt, FaCalendarAlt, FaFilter, FaPrint, FaBoxes } from 'react-icons/fa';

export default function ReportsIndex({ auth }) {
  const { flash } = usePage().props;
  const [reportType, setReportType] = useState('logistic');
  const [generatedReport, setGeneratedReport] = useState(null);

  const { data, setData, get, processing, errors } = useForm({
    month: '',
    year: new Date().getFullYear().toString(),
    reportFormat: 'pdf',
  });

  const reportTypes = [
    { key: 'logistic', name: 'Laporan Logistik', icon: <FaFileInvoice className="mr-2" />, color: theme.colors.primary[600] },
    { key: 'ships', name: 'Laporan Aktivitas Kapal', icon: <FaShip className="mr-2" />, color: theme.colors.secondary[600] },
    { key: 'cargo-activities', name: 'Laporan Bongkar Muat', icon: <FaBoxes className="mr-2" />, color: theme.colors.accent.info },
    { key: 'risks', name: 'Laporan Analisis Risiko', icon: <FaShieldAlt className="mr-2" />, color: theme.colors.accent.warning },
  ];

  const selectedReportConfig = reportTypes.find(rt => rt.key === reportType);

  const handleReportTypeChange = (type) => {
    setReportType(type);
    setGeneratedReport(null);
    setData(prevData => ({ ...prevData, month: '', year: new Date().getFullYear().toString() }));
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    setGeneratedReport(null);

    let queryParams = {
        format: data.reportFormat
    };
    if (data.year) {
        queryParams.year = data.year;
        if (data.month) {
            queryParams.month = data.month;
        }
    } else {
        alert('Harap pilih periode laporan (Tahun).');
        return;
    }

    const routeName = `reports.${reportType}`;

    get(route(routeName, queryParams), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page) => {
        if (page.props.flash && page.props.flash.error) {
            alert(page.props.flash.error);
        }
      },
      onError: (pageErrors) => {
        const firstErrorKey = Object.keys(pageErrors)[0];
        if (firstErrorKey && pageErrors[firstErrorKey]) {
            alert(`Error: ${pageErrors[firstErrorKey]}`);
        } else {
            alert('Terjadi kesalahan saat menghasilkan laporan. Periksa kembali input Anda atau coba lagi nanti.');
        }
        console.error("Report generation errors:", pageErrors);
      },
    });
  };

  useEffect(() => {
    if (flash && flash.report_url) {
        const reportName = reportTypes.find(rt => rt.key === reportType)?.name || "Laporan";
        const formatName = (data.reportFormat || 'file').toUpperCase();

        setGeneratedReport({
            name: `${reportName} (${formatName})`,
            url: flash.report_url,
            fileName: flash.file_name || `report.${data.reportFormat}`,
            generatedAt: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        });
    }
  }, [flash, reportType, data.reportFormat]);

  const yearOptions = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  const monthOptions = [
    { value: "", label: "Semua Bulan" }, { value: "1", label: "Januari" }, { value: "2", label: "Februari" },
    { value: "3", label: "Maret" }, { value: "4", label: "April" }, { value: "5", label: "Mei" },
    { value: "6", label: "Juni" }, { value: "7", label: "Juli" }, { value: "8", label: "Agustus" },
    { value: "9", label: "September" }, { value: "10", label: "Oktober" }, { value: "11", label: "November" },
    { value: "12", label: "Desember" }
  ];

  return (
    <MainLayout user={auth.user}>
      <Head title="Pusat Laporan" />

      <PageHeader
        title="Pusat Laporan Pelabuhan"
        description="Hasilkan dan kelola berbagai laporan operasional dan manajerial."
        pattern="compass"
      />

      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
              <FaFilter className="mr-2 text-blue-600" /> Pilih Jenis & Periode Laporan
            </h3>
            <p className="text-sm text-gray-500 mb-6">Pilih jenis laporan yang ingin Anda hasilkan dan tentukan periode waktunya.</p>

            <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-200 pb-6">
              {reportTypes.map(rt => (
                <button
                  key={rt.key}
                  type="button"
                  onClick={() => handleReportTypeChange(rt.key)}
                  style={{ '--report-color': rt.color }}
                  className={`flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${reportType === rt.key
                      ? 'text-white shadow-md'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-400'
                    }
                    ${reportType === rt.key ? 'bg-[var(--report-color)] hover:bg-opacity-90 focus:ring-[var(--report-color)]' : ''}
                  `}
                >
                  {rt.icon} {rt.name}
                </button>
              ))}
            </div>

            <form onSubmit={handleGenerateReport} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Laporan Dipilih</label>
                  <input
                    type="text"
                    value={selectedReportConfig?.name || 'Tidak ada'}
                    readOnly
                    className="w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed p-2.5"
                  />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Periode (Bulan & Tahun)</label>
                    <div className="flex space-x-2">
                        <select
                            name="month"
                            value={data.month}
                            onChange={(e) => setData('month', e.target.value)}
                            className="flex-grow w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                        >
                            {monthOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <select
                            name="year"
                            value={data.year}
                            onChange={(e) => setData('year', e.target.value)}
                            className="flex-grow w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5"
                        >
                            {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                    </div>
                    {errors.year && <p className="text-xs text-red-500 mt-1">{errors.year}</p>}
                    {errors.month && <p className="text-xs text-red-500 mt-1">{errors.month}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format Laporan</label>
                  <div className="flex space-x-3">
                    {['pdf', 'excel'].map(format => (
                      <button
                        key={format}
                        type="button"
                        onClick={() => setData('reportFormat', format)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all w-full
                          ${data.reportFormat === format
                            ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                          }`}
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                    type="submit"
                    disabled={processing}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                    icon={<FaPrint />}
                >
                  {processing ? 'Menghasilkan...' : 'Hasilkan Laporan'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {generatedReport && (
          <div className="mt-10 bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaFileInvoice className="mr-2 text-green-600" /> Laporan Berhasil Dihasilkan
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                <p><strong>Nama Laporan:</strong> {generatedReport.name}</p>
                <p><strong>Tanggal Dihasilkan:</strong> {generatedReport.generatedAt}</p>
                {generatedReport.params && (
                    <p><strong>Parameter:</strong> {Object.entries(generatedReport.params).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
                )}
                <Button
                    onClick={() => {
                        if (generatedReport && generatedReport.url) {
                            const link = document.createElement('a');
                            link.href = generatedReport.url;
                            link.download = generatedReport.fileName || `report.${data.reportFormat}`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        } else {
                            alert('URL laporan tidak tersedia atau tidak valid.');
                        }
                    }}
                    variant="secondary"
                    className="bg-green-600 hover:bg-green-700 text-white mt-3"
                    icon={<FaPrint />}
                >
                  Unduh Laporan
                </Button>
              </div>
            </div>
          </div>
        )}

        {flash && flash.error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {flash.error}</span>
            </div>
        )}
        {flash && flash.success && (
            <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Sukses!</strong>
                <span className="block sm:inline"> {flash.success}</span>
            </div>
        )}
      </div>
    </MainLayout>
  );
}
