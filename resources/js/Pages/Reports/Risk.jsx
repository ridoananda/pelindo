import { Head, router, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';

export default function RiskReport({ risks, riskReports, reportType, reportDate, reportPeriod, managerName }) {
  const { url: currentPath } = usePage();

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
      header: 'Rekomendasi',
      accessor: 'recommendation',
    }
  ];

  const reportColumns = [
    {
      header: 'Tanggal Laporan',
      accessor: 'report_date',
    },
    {
      header: 'Jenis Risiko',
      accessor: 'risk_type',
    },
    {
      header: 'Deskripsi',
      accessor: 'description',
    },
    {
      header: 'Tindakan yang Direkomendasikan',
      accessor: 'recommended_action',
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

  return (
    <MainLayout>
      <Head title={reportType} />

      <PageHeader
        title={reportType}
      />

      <div className="p-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Jenis Laporan:</p>
                  <p className="font-semibold">{reportType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Tanggal Laporan:</p>
                  <p className="font-semibold">{reportDate}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Periode Laporan:</p>
                  <p className="font-semibold">{reportPeriod}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Daftar Risiko</h3>
                <Table
                  columns={riskColumns}
                  data={risks}
                />

                <h3 className="text-lg font-semibold mt-8 mb-4">Laporan Insiden Risiko</h3>
                <Table
                  columns={reportColumns}
                  data={riskReports}
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-600">Nama Manajer Operasional:</p>
                  <p className="font-semibold">{managerName}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
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
        </div>
      </div>
    </MainLayout>
  );
}
