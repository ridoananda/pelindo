import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import theme from '@/theme';

const ThemedInputLabel = ({ htmlFor, value, className = '' }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-200 mb-1 ${className}`}>
        {value}
    </label>
);

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Atur Ulang Kata Sandi" />
            <h2 className="text-2xl font-bold text-center text-white mb-6">Atur Ulang Kata Sandi Anda</h2>

            <form onSubmit={submit} className="space-y-5">
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
                            className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-gray-600 bg-gray-500 text-gray-300 cursor-not-allowed shadow-sm placeholder-gray-400"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            readOnly
                            placeholder="nama@email.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2 text-red-400" />
                </div>

                <div>
                    <ThemedInputLabel htmlFor="password" value="Kata Sandi Baru" />
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
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Masukkan kata sandi baru"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2 text-red-400" />
                </div>

                <div>
                    <ThemedInputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi Baru" />
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
                            placeholder="Ulangi kata sandi baru"
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2 text-red-400" />
                </div>

                <div className="flex items-center justify-end mt-6">
                    <Button 
                        type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : 'Atur Ulang Kata Sandi'}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
