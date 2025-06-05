import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel'; // Will use custom styled label
// import PrimaryButton from '@/Components/PrimaryButton'; // Will use custom Button
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Button from '@/Components/Button'; // Added custom Button
import theme from '@/theme'; // Added theme

// Custom InputLabel to match theme
const ThemedInputLabel = ({ htmlFor, value, className = '' }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
        {value}
    </label>
);

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className={`text-xl font-semibold text-gray-800`}>
                    Informasi Profil
                </h2>
                <p className={`mt-1 text-sm text-gray-600`}>
                    Perbarui informasi profil dan alamat email akun Anda.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <ThemedInputLabel htmlFor="name" value="Nama" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <ThemedInputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className={`mt-2 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-md`}>
                            Alamat email Anda belum diverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className={`ml-1 underline text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            >
                                Klik di sini untuk mengirim ulang email verifikasi.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className={`mt-2 text-sm font-medium text-green-700 bg-green-50 p-3 rounded-md`}>
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <Button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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
                        <p className={`text-sm text-green-600 font-medium`}>
                            Berhasil disimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
