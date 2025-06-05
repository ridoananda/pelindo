import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-white opacity-10" style={{
                    maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,40 C100,70 200,10 300,40 C400,70 500,10 600,40 C700,70 800,10 900,40 C1000,70 1100,10 1200,40 C1300,70 1400,10 1500,40 L1500,0 L0,0 Z\' fill=\'%23FFFFFF\'/%3E%3C/svg%3E")',
                    maskSize: '1500px 100%',
                    maskRepeat: 'repeat-x',
                    transform: 'translateY(-10px)'
                }}></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-white opacity-10" style={{
                    maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,40 C150,10 300,60 450,30 C600,0 750,40 900,20 C1050,0 1200,30 1350,20 L1500,40 L1500,0 L0,0 Z\' fill=\'%23FFFFFF\'/%3E%3C/svg%3E")',
                    maskSize: '1500px 100%',
                    maskRepeat: 'repeat-x',
                }}></div>
            </div>

            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden relative z-10">
                <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-5 flex flex-col items-center">
                    <Link href="/" className="block mb-2">
                        <img src="/logo.png" alt="Pelindo Logo" className="h-24 w-24 rounded-full border-4 border-white/30 shadow-lg" />
                    </Link>
                    <h1 className="text-white text-xl font-bold">PT. Pelabuhan Indonesia</h1>
                    <p className="text-blue-200 text-sm">Cabang Sibolga</p>
                </div>

                <div className="p-6">
                    {children}
                </div>

                <div className="px-6 py-3 bg-gray-50 text-center text-xs text-gray-500 border-t">
                    &copy; {new Date().getFullYear()} PT. Pelabuhan Indonesia - Cabang Sibolga
                </div>
            </div>
        </div>
    );
}
