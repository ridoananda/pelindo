import { useState } from 'react';
import Input from '@/Components/Input';

/**
 * Komponen untuk mengelola analisis resiko berdasarkan kategori operasional pelabuhan
 * Berdasarkan data FMEA dari PT. Pelabuhan Indonesia (Persero) Sibolga Branch
 */
export default function RiskManagementTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Data kategori resiko berdasarkan FMEA analysis
  const riskCategories = [
    {
      id: 'container',
      name: 'Bongkar Muat Peti Kemas',
      icon: '📦',
      color: 'bg-blue-100 text-blue-800',
      risks: [
        {
          id: 1,
          code: 'M01',
          failureMode: 'Data peti kemas tidak tercatat atau salah',
          effect: 'Kesalahan pencatatan stok, keterlambatan bongkar muat',
          cause: 'Kelalaian petugas, tidak ada verifikasi dokumen',
          severity: 'Tinggi',
          rpn: 196.92
        },
        {
          id: 2,
          code: 'M02',
          failureMode: 'Penempatan peti kemas tidak sesuai posisi',
          effect: 'Sulit dicari saat distribusi, waktu pengiriman molor',
          cause: 'Tidak adanya panduan penempatan, koordinasi antar shift lemah',
          severity: 'Sedang',
          rpn: 145.50
        },
        {
          id: 3,
          code: 'M03',
          failureMode: 'Kerusakan alat bongkar (crane/forklift)',
          effect: 'Proses bongkar muat terhenti, menimbulkan antrean kapal',
          cause: 'Alat tidak dirawat berkala, usia alat tua',
          severity: 'Tinggi',
          rpn: 178.30
        }
      ]
    },
    {
      id: 'pilotage',
      name: 'Pelayanan Kapal Pandu & Sandar',
      icon: '🚢',
      color: 'bg-green-100 text-green-800',
      risks: [
        {
          id: 4,
          code: 'M04',
          failureMode: 'Jadwal kapal tumpang tindih',
          effect: 'Keterlambatan masuk/sandar kapal, kapal menunggu berjam di perairan',
          cause: 'Tidak ada protokol komunikasi standar',
          severity: 'Tinggi',
          rpn: 151.25
        },
        {
          id: 5,
          code: 'M05',
          failureMode: 'Kapal pandu tidak tersedia saat dibutuhkan',
          effect: 'Kapal menunggu lama, biaya operasional meningkat',
          cause: 'Jumlah kapal pandu terbatas, tidak ada sistem giliran',
          severity: 'Tinggi',
          rpn: 153.90
        }
      ]
    },
    {
      id: 'logistics',
      name: 'Manajemen Logistik',
      icon: '📋',
      color: 'bg-purple-100 text-purple-800',
      risks: [
        {
          id: 6,
          code: 'M06',
          failureMode: 'Penumpukan barang tidak rapi',
          effect: 'Barang sulit dicari, risiko kerusakan meningkat',
          cause: 'Tidak ada sistem zona penempatan, tata letak tidak ditentukan',
          severity: 'Sedang',
          rpn: 128.75
        },
        {
          id: 7,
          code: 'M07',
          failureMode: 'Barang tidak terpantau',
          effect: 'Barang hilang atau tercecer',
          cause: 'Logistik tidak koordinatif',
          severity: 'Sedang',
          rpn: 135.20
        }
      ]
    },
    {
      id: 'administration',
      name: 'Administrasi dan Pelaporan',
      icon: '📊',
      color: 'bg-orange-100 text-orange-800',
      risks: [
        {
          id: 8,
          code: 'M08',
          failureMode: 'Laporan tidak terkirim tepat waktu',
          effect: 'Evaluasi manajemen dan pengambilan keputusan terlambat',
          cause: 'Input data dari divisi berbeda tidak cocok',
          severity: 'Tinggi',
          rpn: 156.24
        },
        {
          id: 9,
          code: 'M09',
          failureMode: 'Data kapal dan peti kemas tidak sinkron',
          effect: 'Kebingungan koordinasi, keterlambatan operasi',
          cause: 'Koordinasi lemah antar level kerja, tidak ada konfirmasi tugas',
          severity: 'Tinggi',
          rpn: 197.39
        }
      ]
    },
    {
      id: 'coordination',
      name: 'Koordinasi Antar Unit Operasional',
      icon: '🤝',
      color: 'bg-indigo-100 text-indigo-800',
      risks: [
        {
          id: 10,
          code: 'M10',
          failureMode: 'Informasi status kapal tidak seragam',
          effect: 'Kebingungan koordinasi antar unit',
          cause: 'Tidak ada standar komunikasi yang jelas',
          severity: 'Sedang',
          rpn: 155.60
        }
      ]
    },
    {
      id: 'safety',
      name: 'Keselamatan Kerja',
      icon: '🛡️',
      color: 'bg-red-100 text-red-800',
      risks: [
        {
          id: 11,
          code: 'M11',
          failureMode: 'Kecelakaan kerja saat bongkar muat',
          effect: 'Cedera pekerja, penghentian sementara operasional',
          cause: 'Tidak ada sistem monitoring cuaca yang konsisten, tidak ada antisipasi',
          severity: 'Tinggi',
          rpn: 155.02
        }
      ]
    }
  ];

  // Filter data berdasarkan pencarian dan kategori
  const filteredCategories = riskCategories.filter(category => {
    const matchesCategory = selectedCategory === 'Semua' || category.id === selectedCategory;
    const matchesSearch = category.risks.some(risk =>
      risk.failureMode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.effect.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesCategory && (searchTerm === '' || matchesSearch);
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Tinggi':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Sedang':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rendah':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRPNColor = (rpn) => {
    if (rpn >= 150) return 'text-red-600 font-bold';
    if (rpn >= 100) return 'text-orange-600 font-bold';
    return 'text-green-600 font-bold';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Manajemen Analisis Risiko FMEA</h3>
          <p className="text-sm text-gray-500">Kelola dan pantau risiko operasional berdasarkan analisis FMEA</p>
        </div>
      </div>

      {/* Tim FMEA Analysis */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Tim FMEA Analysis
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Tim FMEA Analysis di PT. Pelabuhan Indonesia (Persero) Sibolga Branch terdiri dari peneliti, manajer operasional, dan petugas operasional pelabuhan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Peneliti */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-semibold text-blue-800 mb-2">Peneliti</h5>
            <div className="space-y-1">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Indah Novita Jambak</span>
              </div>
            </div>
          </div>

          {/* Manajer Operasional */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-semibold text-green-800 mb-2">Manajer Operasional</h5>
            <div className="space-y-1">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Subiyanto</span>
              </div>
            </div>
          </div>

          {/* Petugas Operasional */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 className="font-semibold text-purple-800 mb-2">Petugas Operasional (15 orang)</h5>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {[
                'Samabudi Giawa', 'Rosihin Anwar', 'Abner Sitompul', 'Hotland Hutagalung',
                'Yanuari Halawa', 'Gomgom Wisastro Ujung', 'Jhonny Tua Siambaton',
                'Banje Gusra Panggabean', 'Minar Butar-butar', 'Frannes Francois Lumbantobing',
                'Santo Riris Marito Hutagalung', 'Irfan Situmeang', 'Ahmad Mulyadi Sitompul',
                'Rulli Sihite', 'Riston Sitohang'
              ].map((name, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cakupan FMEA */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Cakupan FMEA
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Cakupan FMEA didefinisikan untuk memfokuskan analisis pada proses inti dengan potensi risiko yang signifikan.
          Dalam penelitian ini, cakupan dibatasi pada aktivitas operasional pelabuhan yang meliputi:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: '📦',
              title: 'Pencatatan Data Peti Kemas',
              description: 'Memastikan keakuratan informasi peti kemas'
            },
            {
              icon: '🚢',
              title: 'Penjadwalan Kapal',
              description: 'Mengatur kelancaran sandar dan berangkat kapal'
            },
            {
              icon: '🧭',
              title: 'Pelayanan Kapal Pandu',
              description: 'Memastikan keselamatan manuver kapal'
            },
            {
              icon: '📋',
              title: 'Pengelolaan Logistik',
              description: 'Mengelola alur barang dan inventori'
            },
            {
              icon: '📊',
              title: 'Penyusunan Laporan Administrasi',
              description: 'Menyediakan informasi akurat dan tepat waktu untuk pengambilan keputusan manajerial'
            }
          ].map((scope, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">{scope.icon}</span>
                <div>
                  <h5 className="font-semibold text-blue-800 mb-1">{scope.title}</h5>
                  <p className="text-sm text-gray-600">{scope.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Catatan:</strong> Area-area ini dipilih karena memiliki kerentanan tinggi terhadap kesalahan dan keterlambatan
            yang dapat berdampak langsung pada kinerja operasional pelabuhan.
          </p>
        </div>
      </div>

      {/* Filter dan Pencarian */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            type="text"
            placeholder="Cari berdasarkan mode kegagalan, dampak, atau penyebab..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
          >
            <option value="Semua">Semua Kategori</option>
            {riskCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistik Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Risiko Tinggi</p>
              <p className="text-2xl font-bold text-red-600">
                {riskCategories.reduce((acc, cat) =>
                  acc + cat.risks.filter(r => r.severity === 'Tinggi').length, 0
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Risiko Sedang</p>
              <p className="text-2xl font-bold text-yellow-600">
                {riskCategories.reduce((acc, cat) =>
                  acc + cat.risks.filter(r => r.severity === 'Sedang').length, 0
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Risiko</p>
              <p className="text-2xl font-bold text-blue-600">
                {riskCategories.reduce((acc, cat) => acc + cat.risks.length, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Kategori</p>
              <p className="text-2xl font-bold text-purple-600">{riskCategories.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daftar Kategori dan Risiko */}
      <div className="space-y-6">
        {filteredCategories.map(category => (
          <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`${category.color} border-b p-6`}>
              <div className="flex items-center text-lg font-semibold">
                <span className="text-2xl mr-3">{category.icon}</span>
                {category.name}
                <span className="ml-auto bg-white bg-opacity-50 px-3 py-1 rounded-full text-sm font-medium">
                  {category.risks.length} risiko
                </span>
              </div>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kode
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mode Kegagalan
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dampak Kegagalan
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Penyebab Kegagalan
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RPN
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {category.risks.map(risk => (
                      <tr key={risk.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200 font-mono">
                            {risk.code}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs">
                            {risk.failureMode}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-700 max-w-xs">
                            {risk.effect}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-700 max-w-xs">
                            {risk.cause}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-lg font-bold ${getRPNColor(risk.rpn)}`}>
                            {risk.rpn}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

