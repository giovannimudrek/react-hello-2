interface AlertBannerProps {
  variant: 'error' | 'warning';
  message: string;
}

export function AlertBanner({ variant, message }: AlertBannerProps) {
  const styles =
    variant === 'error'
      ? {
          background: '#FFF3F3',
          border: '1px solid #F4C7C5',
          color: '#C03829',
        }
      : {
          background: '#FFF8E9',
          border: '1px solid #F3D2A3',
          color: '#985B08',
        };

  return (
    <div
      style={{
        ...styles,
        borderRadius: '8px',
        padding: '10px 12px',
        width: '360px',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 'normal',
        boxSizing: 'border-box',
      }}
    >
      {message}
    </div>
  );
}
