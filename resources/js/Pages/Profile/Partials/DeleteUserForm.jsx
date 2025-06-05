import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Button from '@/Components/Button';
import theme from '@/theme';

const ThemedInputLabel = ({ htmlFor, value, className = '' }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
        {value}
    </label>
);

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="mb-6">
                <h2 className={`text-xl font-semibold text-red-700`}>
                    Hapus Akun
                </h2>
                <p className={`mt-1 text-sm text-gray-600`}>
                    Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Sebelum menghapus akun Anda, harap unduh data atau informasi apa pun yang ingin Anda simpan.
                </p>
            </header>

            <Button 
                variant="danger" 
                onClick={confirmUserDeletion}
                className="bg-red-600 hover:bg-red-700 text-white"
            >
                Hapus Akun Saya
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="lg">
                <form onSubmit={deleteUser} className="p-6 bg-white rounded-lg shadow-xl">
                    <h2 className={`text-xl font-semibold text-gray-800 mb-2`}>
                        Apakah Anda yakin ingin menghapus akun Anda?
                    </h2>
                    <p className={`text-sm text-gray-600`}>
                        Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Harap masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun Anda secara permanen.
                    </p>

                    <div className="mt-6">
                        <ThemedInputLabel
                            htmlFor="password_delete_account"
                            value="Kata Sandi"
                        />
                        <TextInput
                            id="password_delete_account"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            isFocused
                            placeholder="Kata Sandi Anda"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-8 flex justify-end space-x-3">
                        <Button 
                            variant="white"
                            onClick={closeModal}
                            className="border border-gray-300 hover:bg-gray-100 text-gray-700"
                            type="button"
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="danger"
                            className="bg-red-600 hover:bg-red-700 text-white ml-3" 
                            disabled={processing}
                            type="submit"
                        >
                            {processing ? 'Menghapus...' : 'Hapus Akun Permanen'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
