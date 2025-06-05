import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import Button from '@/Components/Button';
import theme from '@/theme';

const ThemedInputLabel = ({ htmlFor, value, className = '' }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
        {value}
    </label>
);

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (err) => {
                if (err.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (err.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className={`text-xl font-semibold text-gray-800`}>
                    Ubah Kata Sandi
                </h2>
                <p className={`mt-1 text-sm text-gray-600`}>
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <ThemedInputLabel
                        htmlFor="current_password"
                        value="Kata Sandi Saat Ini"
                    />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <ThemedInputLabel htmlFor="password" value="Kata Sandi Baru" />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <ThemedInputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi Baru"
                    />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <Button 
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Kata Sandi'}
                    </Button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <p className={`text-sm text-green-600 font-medium`}>Berhasil disimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
