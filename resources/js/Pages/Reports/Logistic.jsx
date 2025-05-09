import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageHeader from '@/Components/PageHeader';
import Table from '@/Components/Table';
import Button from '@/Components/Button';

export default function LogisticReport({ logistics, reportType, reportDate, reportPeriod, managerName }) {
  const columns = [
    {
      header: 'Nama Barang',
      accessor: 'name',
    },
    {
      header: 'Kategori',
      accessor: 'category',
    },
    {
      header: 'Tanggal',
      accessor: 'date',
    },
    {
      header: 'Status',
      accessor: 'status',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // This would be implemented with a PDF library
    alert('Download PDF functionality would be implemented here');
  };

  const handleDownloadExcel = () => {
    // This would be implemented with an Excel library
    alert('Download Excel functionality would be implemented here');
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
                <Table
                  columns={columns}
                  data={logistics}
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
