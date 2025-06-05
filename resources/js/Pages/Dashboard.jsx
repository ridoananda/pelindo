import MainLayout from "@/Layouts/MainLayout";
import DashboardWidget from "@/Components/DashboardWidget";
import PageHeader from "@/Components/PageHeader";
import { Head } from "@inertiajs/react";
import theme from "@/theme";
import { useState } from "react";

export default function Dashboard({
    shipCount,
    logisticCount,
    cargoActivityCount,
    riskStatus,
}) {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="relative">
                <div
                    className="absolute inset-0 h-40 bg-blue-900"
                    style={{
                        backgroundImage: theme.patterns.waves,
                        backgroundSize: "cover",
                        opacity: 0.9
                    }}
                ></div>

                <div className="relative pt-8 pb-6 px-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Selamat Datang di Portal Pelabuhan
                    </h1>
                    <p className="text-blue-100 max-w-xl">
                        Sistem informasi terintegrasi untuk pengelolaan dan pemantauan aktivitas pelabuhan
                    </p>
                </div>
            </div>

            <div className="p-8 bg-gray-50">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardWidget
                        title="Jumlah Kapal"
                        value={shipCount}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                />
                            </svg>
                        }
                        trend="up"
                        percentage="12"
                        color="blue"
                    />

                    <DashboardWidget
                        title="Jumlah Logistik"
                        value={logisticCount}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        }
                        trend="up"
                        percentage="8"
                        color="teal"
                    />

                    <DashboardWidget
                        title="Aktivitas Bongkar Muat"
                        value={cargoActivityCount}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                                />
                            </svg>
                        }
                        trend="up"
                        percentage="15"
                        color="indigo"
                    />

                    <DashboardWidget
                        title="Status Risiko"
                        value={riskStatus}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        }
                        trend="down"
                        percentage="5"
                        color="amber"
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                                    activeTab === "profile"
                                        ? "border-blue-700 text-blue-700"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                Profil Perusahaan
                            </button>
                            <button
                                onClick={() => setActiveTab("facilities")}
                                className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                                    activeTab === "facilities"
                                        ? "border-blue-700 text-blue-700"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                Fasilitas
                            </button>
                            <button
                                onClick={() => setActiveTab("vision")}
                                className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                                    activeTab === "vision"
                                        ? "border-blue-700 text-blue-700"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                Visi & Misi
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === "profile" && (
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3 mb-4 md:mb-0">
                                    <div className="bg-blue-900 rounded-xl overflow-hidden shadow-lg">
                                        <div className="p-6 text-center">
                                            <img
                                                src="/logo.png"
                                                alt="Pelindo Logo"
                                                className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-white/20"
                                            />
                                            <h3 className="text-xl font-bold text-white mb-1">PT. Pelabuhan Indonesia</h3>
                                            <p className="text-blue-200">Cabang Sibolga</p>
                                        </div>
                                        <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-4 text-center">
                                            <p className="text-sm text-blue-100">Melayani dengan Kehandalan & Profesionalisme</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Profil Perusahaan</h2>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        PT. Pelabuhan Indonesia (Persero) Cabang Sibolga
                                        adalah bagian dari Pelindo Group yang beroperasi
                                        sebagai penyedia jasa kepelabuhanan di wilayah
                                        Pantai Barat Sumatera. Sebagai pelabuhan strategis,
                                        cabang Sibolga berperan penting dalam mendukung arus
                                        perdagangan, logistik, dan distribusi barang,
                                        khususnya untuk wilayah Sumatera Utara.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Dengan pengalaman dan jaringan yang luas, Pelindo Sibolga
                                        terus berkomitmen meningkatkan pelayanan demi
                                        mendukung pertumbuhan ekonomi nasional dan regional.
                                        Pelayanan kami berfokus pada keandalan, keamanan, dan efisiensi
                                        untuk memastikan kelancaran operasional maritim dan kepuasan
                                        pelanggan.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === "facilities" && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Fasilitas Pelabuhan</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <div className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Dermaga</h3>
                                        <p className="text-sm text-gray-600">Dermaga modern untuk berbagai jenis kapal dengan panjang optimal</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <div className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Gudang Penyimpanan</h3>
                                        <p className="text-sm text-gray-600">Gudang penyimpanan barang dengan keamanan dan pengaturan suhu</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <div className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Terminal Peti Kemas</h3>
                                        <p className="text-sm text-gray-600">Terminal peti kemas dengan sistem pengelolaan modern</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Pelindo Sibolga dilengkapi dengan berbagai fasilitas
                                    modern untuk mendukung operasional pelabuhan yang
                                    efisien, antara lain dermaga yang memadai untuk
                                    berbagai jenis kapal, area bongkar muat yang luas,
                                    gudang penyimpanan, terminal peti kemas, serta
                                    sistem teknologi informasi terintegrasi untuk
                                    memastikan kelancaran arus barang.
                                </p>
                            </div>
                        )}

                        {activeTab === "vision" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 text-white shadow-lg">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold mb-4">Visi</h2>
                                    <p className="text-blue-100 leading-relaxed">
                                        Menjadi pusat logistik dan pelabuhan terkemuka
                                        di Pantai Barat Sumatera yang berdaya saing
                                        global, mendorong pertumbuhan ekonomi daerah,
                                        serta menjadi penghubung perdagangan
                                        internasional yang andal dan efisien.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-lg">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold mb-4 text-gray-800">Misi</h2>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                                            <span className="text-gray-700">Menyediakan layanan pelabuhan yang berkualitas tinggi dengan mengutamakan kecepatan, keamanan, dan kepuasan pelanggan.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                                            <span className="text-gray-700">Mengoptimalkan pemanfaatan infrastruktur dan teknologi untuk meningkatkan efisiensi operasional.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                                            <span className="text-gray-700">Mengembangkan sumber daya manusia yang profesional dan berintegritas guna mendukung kinerja perusahaan.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                                            <span className="text-gray-700">Menjalin kemitraan strategis dengan pemangku kepentingan untuk menciptakan nilai tambah bagi masyarakat dan perekonomian nasional.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs mr-2 mt-0.5">5</span>
                                            <span className="text-gray-700">Berkomitmen pada prinsip keberlanjutan dan tanggung jawab sosial dalam setiap operasional perusahaan.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
