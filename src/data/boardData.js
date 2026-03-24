// Board mock data — fiel ao design Figma "Ferramenta Trello" node 1:2
const BOARD_DATA = {
  board: {
    id: 'board-1',
    name: 'Task View',
    members: [
      { id: 'm1', name: 'Ana Silva',       initials: 'AS', color: '#7f56d9' },
      { id: 'm2', name: 'Bruno Costa',     initials: 'BC', color: '#039855' },
      { id: 'm3', name: 'Carla Mendes',    initials: 'CM', color: '#dc6803' },
      { id: 'm4', name: 'Diego Rocha',     initials: 'DR', color: '#d92d20' },
      { id: 'm5', name: 'Elisa Faria',     initials: 'EF', color: '#0086c9' },
      { id: 'm6', name: 'Fabio Lima',      initials: 'FL', color: '#e31b54' },
      { id: 'm7', name: 'Gabriela Nunes',  initials: 'GN', color: '#6938ef' }
    ],
    columns: [
      {
        id: 'col-backlog',
        name: 'Backlog',
        taskCount: 10,
        cards: [
          {
            id: 'card-1',
            title: 'Customer Support Expert',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
            dueDate: '4 Mar. 2026',
            subtasks: { completed: 4, total: 12 },
            tags: [
              { id: 't1', label: 'Urgente', variant: 'red' },
              { id: 't2', label: 'Interno',  variant: 'yellow' },
              { id: 't3', label: 'Feature',  variant: 'green' }
            ],
            assignees: ['m1', 'm2', 'm3'],
            attachmentCount: 8,
            commentCount: 8
          },
          {
            id: 'card-2',
            title: 'UI Design System Update',
            description: 'Atualizar os componentes do design system com os novos tokens de cor.',
            dueDate: '10 Mar. 2026',
            subtasks: { completed: 2, total: 8 },
            tags: [
              { id: 't4', label: 'Design',  variant: 'yellow' },
              { id: 't5', label: 'Interno', variant: 'green' }
            ],
            assignees: ['m2', 'm4'],
            attachmentCount: 3,
            commentCount: 5
          },
          {
            id: 'card-3',
            title: 'API Integration Planning',
            description: 'Mapear todos os endpoints necessarios para integracao com o backend.',
            dueDate: '15 Mar. 2026',
            subtasks: { completed: 0, total: 6 },
            tags: [
              { id: 't6', label: 'Urgente', variant: 'red' }
            ],
            assignees: ['m3', 'm5', 'm6'],
            attachmentCount: 2,
            commentCount: 12
          },
          {
            id: 'card-4',
            title: 'Database Schema Review',
            description: 'Revisar o schema do banco de dados para suportar os novos requisitos.',
            dueDate: '20 Mar. 2026',
            subtasks: { completed: 1, total: 4 },
            tags: [
              { id: 't7', label: 'Interno',  variant: 'yellow' },
              { id: 't8', label: 'Backend', variant: 'green' }
            ],
            assignees: ['m1', 'm7'],
            attachmentCount: 5,
            commentCount: 3
          }
        ]
      },
      {
        id: 'col-pendentes',
        name: 'Pendentes',
        taskCount: 2,
        cards: [
          {
            id: 'card-5',
            title: 'Mobile Responsive Layout',
            description: 'Implementar o layout responsivo para dispositivos moveis.',
            dueDate: '8 Mar. 2026',
            subtasks: { completed: 3, total: 7 },
            tags: [
              { id: 't9',  label: 'Urgente',  variant: 'red' },
              { id: 't10', label: 'Frontend', variant: 'green' }
            ],
            assignees: ['m2', 'm3', 'm4'],
            attachmentCount: 4,
            commentCount: 6
          },
          {
            id: 'card-6',
            title: 'User Authentication Flow',
            description: 'Desenvolver o fluxo completo de autenticacao com JWT.',
            dueDate: '12 Mar. 2026',
            subtasks: { completed: 5, total: 9 },
            tags: [
              { id: 't11', label: 'Interno', variant: 'yellow' }
            ],
            assignees: ['m5', 'm6'],
            attachmentCount: 1,
            commentCount: 9
          }
        ]
      },
      {
        id: 'col-concluidas',
        name: 'Concluidas',
        taskCount: 3,
        cards: [
          {
            id: 'card-7',
            title: 'Project Setup & Configuration',
            description: 'Configurar o ambiente de desenvolvimento e estrutura inicial.',
            dueDate: '1 Mar. 2026',
            subtasks: { completed: 6, total: 6 },
            tags: [
              { id: 't12', label: 'Feature', variant: 'green' }
            ],
            assignees: ['m1', 'm2'],
            attachmentCount: 2,
            commentCount: 4
          },
          {
            id: 'card-8',
            title: 'Stakeholder Presentation',
            description: 'Preparar e apresentar o progresso do projeto para os stakeholders.',
            dueDate: '2 Mar. 2026',
            subtasks: { completed: 4, total: 4 },
            tags: [
              { id: 't13', label: 'Interno', variant: 'yellow' },
              { id: 't14', label: 'Feature', variant: 'green' }
            ],
            assignees: ['m3', 'm7'],
            attachmentCount: 7,
            commentCount: 2
          },
          {
            id: 'card-9',
            title: 'Requirements Documentation',
            description: 'Documentar todos os requisitos funcionais e nao-funcionais.',
            dueDate: '28 Feb. 2026',
            subtasks: { completed: 8, total: 8 },
            tags: [
              { id: 't15', label: 'Urgente', variant: 'red' },
              { id: 't16', label: 'Docs',    variant: 'green' }
            ],
            assignees: ['m4', 'm5', 'm6', 'm1'],
            attachmentCount: 10,
            commentCount: 15
          }
        ]
      }
    ]
  }
};
