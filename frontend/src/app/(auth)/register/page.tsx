import { RegisterForm } from '@/features/user-auth/components/RegisterForm';
import { MainLayout } from '@/components/layout/MainLayout';

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-10">
        <RegisterForm />
      </div>
    </MainLayout>
  );
}
