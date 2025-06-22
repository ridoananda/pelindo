import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';
import { FaUser, FaEnvelope, FaLock, FaUserTie } from 'react-icons/fa';
import theme from '@/theme';

const ThemedInputLabel = ({ htmlFor, value, className = '' }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-200 mb-1 ${className}`}>
        {value}
    </label>
);

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'operator', // default role
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun Baru" />

            <h2 className="text-2xl font-bold text-center text-white mb-6">Buat Akun Pelabuhan Anda</h2>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <ThemedInputLabel htmlFor="name" value="Nama Lengkap" />
                    <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaUser className="h-5 w-5 text-gray-400" />
                        </span>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm placeholder-gray-400"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Masukkan nama lengkap Anda"
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2 text-red-400" />
                </div>

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
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="nama@email.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2 text-red-400" />
                </div>

                <div>
                    <ThemedInputLabel htmlFor="role" value="Pilih Role" />
                    <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaUserTie className="h-5 w-5 text-gray-400" />
                        </span>
                        <select
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                        >
                            <option value="operator">Operator - Akses Lengkap</option>
                            <option value="manager">Manager - Akses Terbatas</option>
                        </select>
                    </div>
                    <InputError message={errors.role} className="mt-2 text-red-400" />
                    <p className="mt-1 text-xs text-gray-400">
                        {data.role === 'operator'
                            ? 'Operator memiliki akses ke semua fitur sistem'
                            : 'Manager hanya dapat mengakses analisis risiko dan laporan'
                        }
                    </p>
                </div>

                <div>
                    <ThemedInputLabel htmlFor="password" value="Kata Sandi" />
                    <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaLock className="h-5 w-5 text-gray-400" />
                        </span>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm placeholder-gray-400"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Minimal 8 karakter"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2 text-red-400" />
                </div>

                <div>
                    <ThemedInputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" />
                     <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaLock className="h-5 w-5 text-gray-400" />
                        </span>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm placeholder-gray-400"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            placeholder="Ulangi kata sandi Anda"
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2 text-red-400" />
                </div>

                <div className="flex flex-col items-center justify-between mt-8 space-y-4">
                    <Button
                        type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                        disabled={processing}
                    >
                        {processing ? 'Mendaftar...' : 'Daftar Sekarang'}
                    </Button>
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-300 hover:text-blue-400 hover:underline transition-colors duration-200"
                    >
                        Sudah punya akun? Masuk di sini
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
