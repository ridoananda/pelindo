import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';
import { FaLock } from 'react-icons/fa';
import theme from '@/theme';

const ThemedInputLabel = ({ htmlFor, value, className = '' }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-200 mb-1 ${className}`}>
        {value}
    </label>
);

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Kata Sandi" />

            <div className="mb-4 text-sm text-gray-200 text-center">
                Ini adalah area aman aplikasi. Harap konfirmasi kata sandi Anda sebelum melanjutkan.
            </div>

            <form onSubmit={submit} className="space-y-6">
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
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Masukkan kata sandi Anda"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2 text-red-400" />
                </div>

                <div className="flex items-center justify-end mt-6">
                    <Button 
                        type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                        disabled={processing}
                    >
                        {processing ? 'Mengkonfirmasi...' : 'Konfirmasi'}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
