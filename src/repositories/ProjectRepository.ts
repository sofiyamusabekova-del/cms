import { SiteProject } from '@/types';

export interface ProjectRepository {
  load(projectId?: string): Promise<SiteProject | null>;
  save(project: SiteProject): Promise<void>;
  reset(projectId?: string): Promise<void>;
}
