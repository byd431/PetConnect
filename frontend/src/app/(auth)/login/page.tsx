import { LoginForm } from '@/features/user-auth/components/LoginForm';
import { MainLayout } from '@/components/layout/MainLayout';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <LoginForm />
      </div>
    </MainLayout>
  );
}
