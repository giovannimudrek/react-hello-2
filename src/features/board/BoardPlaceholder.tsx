import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';

export function BoardPlaceholder() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F5F5F7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        gap: '16px',
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#0A0D12',
          margin: 0,
        }}
      >
        Kanban Board
      </h1>
      {user && (
        <p style={{ color: '#535862', fontSize: '14px', margin: 0 }}>
          Bem-vindo, {user.name}!
        </p>
      )}
      <button
        onClick={handleLogout}
        style={{
          background: '#7F56D9',
          color: '#FCFAFF',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 18px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Sair
      </button>
    </div>
  );
}
