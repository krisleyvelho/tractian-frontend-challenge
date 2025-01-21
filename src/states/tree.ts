import { TreeNode } from '@/app/types/generic';
import { create } from 'zustand';

interface TreeType {
  defaultTree: TreeNode[] | undefined;
  setDefaultTree: (tree: TreeType['defaultTree']) => void;
  currentTree: TreeNode[] | undefined;
  setCurrentTree: (currentTree: TreeType['currentTree']) => void;
  treeOpenById: Record<string, boolean>;
  setTreeOpenById: (treeOpenById: TreeType['treeOpenById']) => void;
  incrementTreeOpenById: (data: TreeType['treeOpenById']) => void;
  toggleAllNodes: (tree: TreeNode[], action: 'open' | 'close') => boolean[];
  resetTree: VoidFunction;
}

export const useTree = create<TreeType>()((set, get) => ({
  defaultTree: undefined,
  setDefaultTree: (defaultTree) => set(() => ({ defaultTree, currentTree: defaultTree })),
  currentTree: undefined,
  setCurrentTree: (tree) => set(() => ({ currentTree: tree })),
  treeOpenById: {},
  setTreeOpenById: (treeOpenById) => set((partial) => ({ treeOpenById })),
  incrementTreeOpenById: (data) =>
    set((partial) => {
      const newValue = { ...partial.treeOpenById, ...data };
      return { ...partial, treeOpenById: newValue };
    }),
  toggleAllNodes: (tree, action) => {
    const incrementTreeOpenById = get().incrementTreeOpenById;
    const toggleNodes = (nodes: TreeNode[], action: 'open' | 'close'): boolean[] => {
      return nodes.map((node) => {
        incrementTreeOpenById({ [node.id]: action === 'open' });
        if (node.children?.[0]) {
          toggleNodes(node.children, action);
        }
        return true;
      });
    };
    return toggleNodes(tree, action);
  },
  resetTree: () => {
    set(() => ({ currentTree: undefined, defaultTree: undefined, treeOpenById: {} }));
  },
}));

