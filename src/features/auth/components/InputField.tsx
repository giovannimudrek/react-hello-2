import React from 'react';

interface InputFieldProps {
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  autoComplete,
}: InputFieldProps) {
  const hasError = Boolean(error);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <label
        style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#414651',
          lineHeight: 'normal',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        style={{
          width: '360px',
          boxSizing: 'border-box',
          background: '#FFFFFF',
          border: `1px solid ${hasError ? '#C0382D' : '#E9EAEB'}`,
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '16px',
          fontWeight: 400,
          color: '#0A0D12',
          lineHeight: 'normal',
          outline: 'none',
          transition: 'border-color 0.15s ease',
        }}
        onFocus={(e) => {
          if (!hasError) {
            e.currentTarget.style.borderColor = '#7F56D9';
          }
        }}
        onBlur={(e) => {
          if (!hasError) {
            e.currentTarget.style.borderColor = '#E9EAEB';
          }
        }}
      />
      {hasError && (
        <span
          style={{
            fontSize: '12px',
            fontWeight: 400,
            color: '#C0382D',
            lineHeight: 'normal',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
