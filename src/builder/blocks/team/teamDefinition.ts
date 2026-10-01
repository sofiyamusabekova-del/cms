import { BlockDefinition } from '@/builder/registry/types';
import { TeamBlock } from './TeamBlock';

export const teamDefinition: BlockDefinition = {
  type: 'team',
  label: 'Команда',
  category: 'content',
  icon: 'Users',
  variants: [
    { id: 'grid', label: 'Сетка' },
  ],
  createDefault: () => ({
    id: `team-${crypto.randomUUID()}`,
    type: 'team',
    variant: 'grid',
    content: {
      title: { ru: 'Наша команда экспертов', en: 'Our Expert Team', uz: 'Bizning mutaxassislar jamoasi' },
      subtitle: { ru: 'Профессионалы, создающие будущее веб-разработки', en: 'Professionals shaping modern web', uz: 'Veb-ishlab chiqish mutaxassislari' },
    },
    styles: {},
  }),
  renderer: TeamBlock,
  inspector: { content: [], style: [] },
};
