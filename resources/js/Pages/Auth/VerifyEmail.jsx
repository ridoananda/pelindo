// import PrimaryButton from '@/Components/PrimaryButton'; // Replaced
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@/Components/Button'; // Added custom Button
import theme from '@/theme'; // Added theme
import { FaPaperPlane, FaSignOutAlt } from 'react-icons/fa'; // Added icons

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />
            
            <h2 className="text-2xl font-bold text-center text-white mb-6">Verifikasi Alamat Email Anda</h2>

            <div className="mb-5 text-sm text-gray-200 text-center">
                Terima kasih telah mendaftar! Sebelum memulai, dapatkah Anda memverifikasi alamat email Anda dengan mengklik tautan yang baru saja kami kirimkan melalui email kepada Anda? Jika Anda tidak menerima email tersebut, kami dengan senang hati akan mengirimkan email lainnya.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-5 font-medium text-sm text-green-400 bg-green-800 bg-opacity-50 p-3 rounded-md text-center">
                    Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button 
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2.5 px-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                        disabled={processing}
                        icon={<FaPaperPlane />}
                    >
                        {processing ? 'Mengirim Ulang...' : 'Kirim Ulang Email Verifikasi'}
                    </Button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full sm:w-auto flex items-center justify-center rounded-md text-sm text-gray-300 hover:text-red-400 hover:underline py-2.5 px-4 transition-colors duration-200 border border-gray-600 hover:border-red-500"
                    >
                        <FaSignOutAlt className="mr-1.5 h-4 w-4" />
                        Keluar
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
