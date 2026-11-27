'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { registerSchema, type RegisterFormData } from '../schemas/auth.schema';
import { useRegister } from '../hooks/use-register';

export default function RegisterForm() {
  // Initialize form management and validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      companyName: '',
      email: '',
      password: ''
    }
  });

  // Initialize registration mutation
  const { mutate, isPending, isSuccess } = useRegister();

  // Disable form during submission and after success
  const isDisabled = isPending || isSuccess;

  // Submit validated registration data
  const onSubmit = (data: RegisterFormData) => {
    if (isDisabled) return;

    mutate(data, {
      onSuccess: () => {
        // Clear form fields after successful registration
        reset();

        // Display success notification
        toast.success('Account created successfully!');
      },

      onError: (error) => {
        // Handle backend and network errors
        const message = isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message ||
            (error.response
              ? 'Registration failed. Please try again.'
              : 'Unable to connect to the server. Please try again.')
          : 'Something went wrong. Please try again.';

        // Display error notification
        toast.error(message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate aria-busy={isPending}>
      {/* Full name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>

        <Input
          id="name"
          placeholder="John Doe"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isDisabled}
          {...register('name')}
        />

        {errors.name && (
          <p id="name-error" className="text-xs text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Company name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">Company name</Label>

        <Input
          id="companyName"
          placeholder="Your company"
          autoComplete="organization"
          aria-invalid={!!errors.companyName}
          aria-describedby={errors.companyName ? 'companyName-error' : undefined}
          disabled={isDisabled}
          {...register('companyName')}
        />

        {errors.companyName && (
          <p id="companyName-error" className="text-xs text-destructive">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Email address */}
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>

        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isDisabled}
          {...register('email')}
        />

        {errors.email && (
          <p id="email-error" className="text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : 'password-hint'}
          disabled={isDisabled}
          {...register('password')}
        />

        {errors.password ? (
          <p id="password-error" className="text-xs text-destructive">
            {errors.password.message}
          </p>
        ) : (
          <p id="password-hint" className="text-xs text-muted-foreground">
            Must be at least 15 characters.
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" className="h-10 w-full" disabled={isDisabled}>
        {isPending ? 'Creating account...' : isSuccess ? 'Account created' : 'Create account'}
      </Button>
    </form>
  );
}
