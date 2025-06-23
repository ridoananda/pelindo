import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Define navigation items based on user role
    const getNavItems = () => {
        const commonItems = [
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
        ];

        const operatorOnlyItems = [
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
        ];

        const sharedItems = [
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

        // Return different nav items based on user role
        if (auth.user?.role === 'operator') {
            return [...commonItems, ...operatorOnlyItems, ...sharedItems];
        } else if (auth.user?.role === 'manager') {
            return [...commonItems, ...sharedItems];
        }

        // Default fallback for any other case
        return commonItems;
    };

    const navItems = getNavItems();

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Mobile Menu Button */}
            <div className="md:hidden bg-gradient-to-r from-blue-900 to-blue-800 p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center">
                    <img src="/logo.png" className="h-12 w-full" />
                    <div className="ml-2">
                        <h2 className="text-sm font-semibold text-white">
                            PT. Pelabuhan Indonesia
                        </h2>
                        <p className="text-xs text-blue-100">Sibolga</p>
                    </div>
                </div>
                <button onClick={toggleMobileMenu} className="text-white hover:bg-blue-700 p-2 rounded-lg transition-all">
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
                className={`md:w-1/5 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl z-10 relative flex flex-col ${mobileMenuOpen ? 'flex' : 'hidden'} md:flex`}
            >
                <div className="p-5 border-b border-blue-700 flex flex-col">
                    <img src="/logo.png" className="h-12" />
                    <div className="mt-2">
                        <h2 className="font-bold text-lg text-white">PT. Pelindo</h2>
                        <p className="text-sm text-blue-200">Cabang Sibolga</p>
                    </div>
                </div>

                <div className="p-2 flex-grow">
                    <div className="space-y-1">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={route(item.route)}
                                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                                    route().current(item.route)
                                        ? "bg-blue-700 text-white font-medium shadow-md"
                                        : "text-blue-100 hover:bg-blue-700/50"
                                }`}
                            >
                                {item.icon}
                                {item.text}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-blue-700 bg-blue-900">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center mr-2">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{auth.user.name}</p>
                            <p className="text-xs text-blue-200">{auth.user.email}</p>
                            <p className="text-xs text-blue-300 font-medium">
                                {auth.user.role === 'operator' ? 'Operator' : 'Manager'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full bg-blue-700 hover:bg-blue-600 text-white rounded-lg py-2 mt-2 transition-colors flex items-center justify-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Top Header - Desktop only */}
                <div className="hidden md:flex justify-between items-center bg-white border-b shadow-sm p-4">
                    <div className="flex items-center">
                        <div className="bg-blue-900 text-white p-2 rounded-lg shadow-md mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {route().current('dashboard') ? 'Dashboard' :
                             route().current('ships.index') ? 'Data Kapal' :
                             route().current('cargo-activities.index') ? 'Bongkar Muat' :
                             route().current('logistics.index') ? 'Data Logistik' :
                             route().current('risks.index') ? 'Analisis Risiko' :
                             route().current('productions.index') ? 'Produksi' :
                             route().current('reports.index') ? 'Generate Laporan' : 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            <span className="animate-pulse mr-1">●</span>
                            Online
                        </div>
                        <div className="relative group">
                            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-700">{auth.user.name}</p>
                                    <p className="text-xs text-gray-500">{auth.user.email}</p>
                                    <p className="text-xs text-blue-600 font-medium">
                                        {auth.user.role === 'operator' ? 'Operator' : 'Manager'}
                                    </p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50">
                                <Link
                                    href={route('profile.edit')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                >
                                    Profile Settings
                                </Link>
                                <button
                                    onClick={() => setShowLogoutConfirm(true)}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="flex-1">
                    {children}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-center mb-4 text-blue-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                            Konfirmasi Logout
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                            Apakah Anda yakin ingin keluar dari sistem?
                        </p>
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition-colors"
                            >
                                Batal
                            </button>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
