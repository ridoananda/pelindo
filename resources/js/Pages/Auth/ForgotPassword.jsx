import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Button from '@/Components/Button';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import theme from '@/theme';

const ThemedInputLabel = ({ htmlFor, value, className = '' }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-200 mb-1 ${className}`}>
        {value}
    </label>
);

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi" />

            <div className="mb-6 text-sm text-gray-200 text-center">
                Lupa kata sandi Anda? Tidak masalah. Beri tahu kami alamat email Anda dan kami akan mengirimkan tautan pengaturan ulang kata sandi melalui email yang memungkinkan Anda memilih yang baru.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-400 bg-green-800 bg-opacity-50 p-3 rounded-md text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <ThemedInputLabel htmlFor="email" value="Alamat Email" />
                    <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaEnvelope className="h-5 w-5 text-gray-400" />
                        </span>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm placeholder-gray-400"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nama@email.com"
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2 text-red-400" />
                </div>

                <div className="flex flex-col items-center justify-end mt-6 space-y-4">
                    <Button 
                        type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                        disabled={processing}
                    >
                        {processing ? 'Mengirim...' : 'Kirim Tautan Reset Kata Sandi'}
                    </Button>
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-300 hover:text-blue-400 hover:underline flex items-center transition-colors duration-200"
                    >
                        <FaArrowLeft className="mr-1.5 h-3 w-3" />
                        Kembali ke Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
