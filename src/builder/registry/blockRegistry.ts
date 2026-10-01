import { PageBlock } from '@/types';
import { BlockDefinition } from './types';

class BlockRegistry {
  private definitions: Map<string, BlockDefinition> = new Map();

  registerBlock(definition: BlockDefinition): void {
    this.definitions.set(definition.type, definition);
  }

  getBlockDefinition(type: string): BlockDefinition | undefined {
    return this.definitions.get(type);
  }

  getAllBlocks(): BlockDefinition[] {
    return Array.from(this.definitions.values());
  }

  getBlocksByCategory(category: string): BlockDefinition[] {
    return this.getAllBlocks().filter((def) => def.category === category);
  }

  createBlock(type: string, variant?: string): PageBlock {
    const def = this.getBlockDefinition(type);
    if (!def) {
      return {
        id: `block-${crypto.randomUUID()}`,
        type,
        variant: variant || 'default',
        content: {},
        styles: {},
      };
    }

    const block = def.createDefault();
    if (variant) {
      block.variant = variant;
    }
    // Ensure unique ID
    block.id = `block-${crypto.randomUUID()}`;
    return block;
  }
}

export const blockRegistry = new BlockRegistry();

export const registerBlock = (def: BlockDefinition) => blockRegistry.registerBlock(def);
export const getBlockDefinition = (type: string) => blockRegistry.getBlockDefinition(type);
export const getAllBlocks = () => blockRegistry.getAllBlocks();
export const getBlocksByCategory = (category: string) => blockRegistry.getBlocksByCategory(category);
export const createBlock = (type: string, variant?: string) => blockRegistry.createBlock(type, variant);
