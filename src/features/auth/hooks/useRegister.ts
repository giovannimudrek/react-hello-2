import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthServiceError, useAuth } from '../context/AuthContext';
import { AuthError } from '../types/auth.types';

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
}

interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

type RegisterUiError = 'EMAIL_ALREADY_EXISTS' | 'CONNECTION_ERROR' | null;

function validateName(name: string): string | undefined {
  if (!name.trim()) return 'Informe seu nome completo';
  return undefined;
}

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

export function useRegister() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<RegisterFormErrors>({});
  const [uiError, setUiError] = useState<RegisterUiError>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(field: keyof RegisterFormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      setUiError(null);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const passwordErr = validatePassword(form.password);

    if (nameErr || emailErr || passwordErr) {
      setFieldErrors({ name: nameErr, email: emailErr, password: passwordErr });
      return;
    }

    setFieldErrors({});
    setUiError(null);
    setIsLoading(true);

    try {
      await register(form.name, form.email, form.password);
      navigate('/board', { replace: true });
    } catch (err) {
      if (err instanceof AuthServiceError) {
        const code = err.code as AuthError;
        if (code === 'EMAIL_ALREADY_EXISTS') {
          setUiError('EMAIL_ALREADY_EXISTS');
          setFieldErrors({ email: 'E-mail ja cadastrado no sistema' });
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
