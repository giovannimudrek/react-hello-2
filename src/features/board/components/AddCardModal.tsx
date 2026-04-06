import React, { useState, useEffect, useRef } from 'react';
import { ColumnId } from '../types/board.types';

interface AddCardModalProps {
  columnId: ColumnId;
  columnTitle: string;
  onConfirm: (columnId: ColumnId, title: string) => void;
  onCancel: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  columnId,
  columnTitle,
  onConfirm,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Focus input on mount */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel]);

  function handleSubmit() {
    if (!title.trim()) {
      setError(true);
      return;
    }
    onConfirm(columnId, title.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    /* Overlay — rgba(0,0,0,0.4), fixed inset-0 */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      {/*
        Modal: 440x310px, bg white, radius 12px,
        shadow 0px 20px 24px -4px rgba(10,13,18,0.2)
      */}
      <div
        style={{
          width: '440px',
          height: '310px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0px 20px 24px -4px rgba(10,13,18,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Title — Inter Semi Bold 18px, #0A0D12, left 24, top 24 */}
        <p
          id="modal-title"
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '18px',
            color: '#0A0D12',
            lineHeight: 'normal',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Criar novo card
        </p>

        {/* Subtitle — Inter Regular 13px, #535862, left 24, top 52, w 392 */}
        <p
          style={{
            position: 'absolute',
            top: '52px',
            left: '24px',
            width: '392px',
            height: '20px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: '#535862',
            lineHeight: 'normal',
            margin: 0,
          }}
        >
          Adicione um titulo para identificar o card na coluna.
        </p>

        {/* Divider — 1px #E9EAEB, top 84 */}
        <div
          style={{
            position: 'absolute',
            top: '84px',
            left: 0,
            width: '440px',
            height: '1px',
            backgroundColor: '#E9EAEB',
          }}
        />

        {/* Label — Inter Medium 14px, #414651, left 24, top 100 */}
        <label
          htmlFor="card-title-input"
          style={{
            position: 'absolute',
            top: '100px',
            left: '24px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: '#414651',
            lineHeight: 'normal',
            whiteSpace: 'nowrap',
          }}
        >
          Titulo do card *
        </label>

        {/*
          Input: 392x44px, left 24, top 124, radius 8px
          Default: border 1px #E9EAEB
          Error:   border 2px #C02C2C
        */}
        <input
          id="card-title-input"
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error && e.target.value.trim()) setError(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Digite o titulo do card..."
          style={{
            position: 'absolute',
            top: '124px',
            left: '24px',
            width: '392px',
            height: '44px',
            borderRadius: '8px',
            border: error ? '2px solid #C02C2C' : '1px solid #E9EAEB',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: error ? '#C02C2C' : '#0A0D12',
            padding: '0 12px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {/*
          Error message — Inter Medium 12px, #C02C2C, left 24, top 175
          Only visible after failed submit attempt
        */}
        {error && (
          <p
            style={{
              position: 'absolute',
              top: '175px',
              left: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              color: '#C02C2C',
              lineHeight: 'normal',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            O titulo nao pode ser vazio.
          </p>
        )}

        {/*
          Cancelar button: 185x40px, left 24, top 216,
          radius 8px, border 1px #7F56D9, bg white, text #7F56D9
        */}
        <button
          onClick={onCancel}
          style={{
            position: 'absolute',
            top: '216px',
            left: '24px',
            width: '185px',
            height: '40px',
            borderRadius: '8px',
            border: '1px solid #7F56D9',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            color: '#7F56D9',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Cancelar
        </button>

        {/*
          Criar card button: 185x40px, left 231, top 216,
          radius 8px, bg #7F56D9, text white
        */}
        <button
          onClick={handleSubmit}
          style={{
            position: 'absolute',
            top: '216px',
            left: '231px',
            width: '185px',
            height: '40px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#7F56D9',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Criar card
        </button>

        {/*
          Column indicator: 392x28px, left 24, top 265,
          bg #F4EBFF, radius 6px, text Inter Medium 12px #7F56D9
        */}
        <div
          style={{
            position: 'absolute',
            top: '265px',
            left: '24px',
            width: '392px',
            height: '28px',
            backgroundColor: '#F4EBFF',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '12px',
            boxSizing: 'border-box',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              color: '#7F56D9',
              lineHeight: 'normal',
              whiteSpace: 'nowrap',
            }}
          >
            Coluna: {columnTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
