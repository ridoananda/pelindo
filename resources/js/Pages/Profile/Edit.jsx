import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import PageHeader from '@/Components/PageHeader';
import theme from '@/theme';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Profil Pengguna" />

            <PageHeader
                title="Profil Pengguna"
                description="Kelola informasi profil, kata sandi, dan pengaturan akun Anda."
                pattern="waves"
            />

            <div className="py-12 px-4 md:px-8 lg:px-12 bg-gray-50">
                <div className="mx-auto max-w-3xl space-y-8">
                    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200`}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="space-y-6"
                        />
                    </div>

                    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200`}>
                        <UpdatePasswordForm className="space-y-6" />
                    </div>

                    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200`}>
                        <DeleteUserForm className="space-y-6" />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
