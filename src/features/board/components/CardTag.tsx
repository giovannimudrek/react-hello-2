import React from 'react';
import { TagVariant } from '../types/board.types';

interface CardTagProps {
  variant: TagVariant;
  label?: string;
}

const TAG_CONFIG: Record<TagVariant, { bg: string; text: string; label: string }> = {
  feature:  { bg: '#DCEAFC', text: '#3882E0', label: 'Feature' },
  review:   { bg: '#FFF3D6', text: '#D4900D', label: 'Review' },
  teste:    { bg: '#D9F5E4', text: '#22A863', label: 'Teste' },
  design:   { bg: '#F4EBFF', text: '#7F56D9', label: 'Design' },
  devops:   { bg: '#D9F5E4', text: '#22A863', label: 'DevOps' },
  refactor: { bg: '#E9EAEB', text: '#535862', label: 'Refactor' },
  docs:     { bg: '#E9EAEB', text: '#535862', label: 'Docs' },
  default:  { bg: '#E9EAEB', text: '#535862', label: 'Task' },
};

export const CardTag: React.FC<CardTagProps> = ({ variant, label }) => {
  const config = TAG_CONFIG[variant] ?? TAG_CONFIG.default;
  const displayLabel = label ?? config.label;

  return (
    <span
      style={{
        backgroundColor: config.bg,
        color: config.text,
        display: 'inline-block',
        width: '76px',
        height: '20px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 600,
        lineHeight: '20px',
        paddingLeft: '4px',
        fontFamily: 'Inter, sans-serif',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {displayLabel}
    </span>
  );
};
