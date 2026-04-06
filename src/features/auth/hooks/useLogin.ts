import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthServiceError, useAuth } from '../context/AuthContext';
import { AuthError } from '../types/auth.types';

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

type LoginUiError = 'INVALID_CREDENTIALS' | 'CONNECTION_ERROR' | null;

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return 'Informe seu e-mail';
  const RFC_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!RFC_EMAIL.test(email)) return 'Insira um e-mail valido (ex: nome@email.com)';
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) return 'Informe sua senha';
  if (password.length < 6) return 'A senha deve ter no minimo 6 caracteres';
  return undefined;
}

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormState>({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<LoginFormErrors>({});
  const [uiError, setUiError] = useState<LoginUiError>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(field: keyof LoginFormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear field error on change
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      // Clear banner error on any input
      setUiError(null);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const emailErr = validateEmail(form.email);
    const passwordErr = validatePassword(form.password);

    if (emailErr || passwordErr) {
      setFieldErrors({ email: emailErr, password: passwordErr });
      return;
    }

    setFieldErrors({});
    setUiError(null);
    setIsLoading(true);

    try {
      await login(form.email, form.password);
      navigate('/board', { replace: true });
    } catch (err) {
      if (err instanceof AuthServiceError) {
        const code = err.code as AuthError;
        if (code === 'INVALID_CREDENTIALS') {
          setUiError('INVALID_CREDENTIALS');
          // Mark both fields with red border — no inline message, only banner
          setFieldErrors({ email: '', password: '' });
        } else {
          setUiError('CONNECTION_ERROR');
        }
      } else {
        setUiError('CONNECTION_ERROR');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    fieldErrors,
    uiError,
    isLoading,
    handleChange,
    handleSubmit,
  };
}
