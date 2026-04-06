import { Link } from 'react-router-dom';
import { AlertBanner } from '../components/AlertBanner';
import { AuthCard } from '../components/AuthCard';
import { InputField } from '../components/InputField';
import { useLogin } from '../hooks/useLogin';

export function LoginPage() {
  const { form, fieldErrors, uiError, isLoading, handleChange, handleSubmit } =
    useLogin();

  const isConnectionError = uiError === 'CONNECTION_ERROR';
  const isCredentialError = uiError === 'INVALID_CREDENTIALS';

  const buttonLabel = isConnectionError ? 'Tentar novamente' : 'Entrar';

  return (
    <div
      style={{
        background: '#F5F5F7',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <AuthCard>
        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 600,
            color: '#0A0D12',
            lineHeight: 'normal',
          }}
        >
          Entrar na sua conta
        </h1>

        {/* Subtitle */}
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: 400,
            color: '#535862',
            lineHeight: 'normal',
          }}
        >
          Bem-vindo de volta! Insira suas credenciais para acessar o board.
        </p>

        {/* Alert Banner — form-level errors only */}
        {isCredentialError && (
          <AlertBanner
            variant="error"
            message="E-mail ou senha invalidos. Verifique suas credenciais e tente novamente."
          />
        )}
        {isConnectionError && (
          <AlertBanner
            variant="warning"
            message="Nao foi possivel conectar ao servidor. Verifique sua internet e tente novamente."
          />
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: 'contents' }}
        >
          <InputField
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            value={form.email}
            onChange={handleChange('email')}
            // Show red border on credential error but no inline message
            error={
              isCredentialError
                ? ''
                : fieldErrors.email
            }
            disabled={isLoading}
            autoComplete="email"
          />

          <InputField
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange('password')}
            error={
              isCredentialError
                ? ''
                : fieldErrors.password
            }
            disabled={isLoading}
            autoComplete="current-password"
          />

          {/* Primary Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: '#7F56D9',
              color: '#FCFAFF',
              borderRadius: '8px',
              height: '40px',
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: 600,
              width: '360px',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'opacity 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxSizing: 'border-box',
            }}
          >
            {isLoading && (
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  border: '2px solid rgba(252,250,255,0.4)',
                  borderTopColor: '#FCFAFF',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.7s linear infinite',
                }}
              />
            )}
            {buttonLabel}
          </button>
        </form>

        {/* Navigation link */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            justifyContent: 'center',
            fontSize: '14px',
            lineHeight: 'normal',
          }}
        >
          <span style={{ color: '#535862', fontWeight: 400 }}>
            Nao tem conta?{' '}
          </span>
          <Link
            to="/cadastro"
            style={{
              color: '#7F56D9',
              fontWeight: 600,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Cadastre-se
          </Link>
        </div>
      </AuthCard>

      {/* Spinner keyframes injected once */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
