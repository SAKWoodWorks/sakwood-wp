'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Locale } from '@/i18n-config';
import { Button } from '@/components/ui';
import { useAuth } from '@/lib/context/AuthContext';

interface LoginFormProps {
  lang: Locale;
  dictionary: {
    auth: any;
    common: any;
  };
}

export function LoginForm({ lang, dictionary }: LoginFormProps) {
  const { auth, common } = dictionary;
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      router.push(`/${lang}/account`);
    } else {
      setError(result.error || auth.login_error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {auth.login_title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {auth.login_subtitle}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {auth.email_or_username}
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={auth.email_or_username}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {auth.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={auth.password}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {auth.remember_me}
                </label>
              </div>

              <div className="text-sm">
                <Link href={`/${lang}/forgot-password`} className="font-medium text-blue-600 hover:text-blue-500">
                  {auth.forgot_password}
                </Link>
              </div>
            </div>
          </div>

          <div>
            <Button
              variant="primary"
              size="md"
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : auth.login_button}
            </Button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">{auth.dont_have_account} </span>
            <Link href={`/${lang}/register`} className="font-medium text-blue-600 hover:text-blue-500 text-sm">
              {auth.register}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
