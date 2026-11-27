import RegisterForm from '@/features/auth/components/register-form';

export default function RegisterPage() {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-extrabold">Create an account</h1>

        <p className="text-sm text-muted-foreground">Start managing your inventory today.</p>
      </div>

      {/* Registration form */}
      <RegisterForm />

      {/* Login navigation */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <span className="font-semibold text-foreground">Sign in</span>
      </p>
    </div>
  );
}
