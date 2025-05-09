import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const navItems = [
        {
            text: "Dashboard",
            route: "dashboard",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
        },
        {
            text: "Data Kapal",
            route: "ships.index",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
            ),
        },
        {
            text: "Bongkar Muat",
            route: "cargo-activities.index",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
            ),
        },
        {
            text: "Data Logistik",
            route: "logistics.index",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
            ),
        },
        {
            text: "Analisis Risiko",
            route: "risks.index",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
            ),
        },
        {
            text: "Produksi",
            route: "productions.index",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                </svg>
            ),
        },
        {
            text: "Generate Laporan",
            route: "reports.index",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Mobile Menu Button */}
            <div className="md:hidden bg-white p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/logo.png" className="w-10 h-10 rounded-full" />
                    <div className="ml-2">
                        <h2 className="text-sm font-semibold">
                            PT. Pelabuhan Indonesia
                        </h2>
                    </div>
                </div>
                <button onClick={toggleMobileMenu} className="text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {mobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Sidebar for both mobile and desktop */}
            <div
                className={`${
                    mobileMenuOpen ? "block" : "hidden"
                } md:block md:w-1/5 bg-white border-r`}
            >
                <div className="p-6 border-b hidden md:block">
                    <div className="flex items-center">
                        <img
                            src="/logo.png"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold">
                                PT. Pelabuhan
                            </h2>
                            <h3 className="text-md">Indonesia (persero)</h3>
                            <h4 className="text-sm">cabang sibolga</h4>
                        </div>
                    </div>
                </div>

                <nav className="py-4">
                    {navItems.map((item, index) => (
                        <div className="px-4 py-2" key={index}>
                            <Link
                                href={route(item.route)}
                                className="flex items-center px-4 py-2 rounded hover:bg-gray-100"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.icon}
                                {item.text}
                            </Link>
                        </div>
                    ))}
                </nav>

                <div className="mt-auto p-4 border-t">
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>

                {showLogoutConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h2 className="text-lg font-semibold mb-4">
                                Konfirmasi Logout
                            </h2>
                            <p className="mb-4">
                                Apakah Anda yakin ingin keluar?
                            </p>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Batal
                                </button>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1">{children}</div>
        </div>
    );
}
