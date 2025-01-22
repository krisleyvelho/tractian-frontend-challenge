import { TreeNode } from '@/app/types/generic';

export function recursiveTextFilterInTree(
  tree: TreeNode[],
  text: string
): TreeNode[] {
  return tree
    .map((node) => {
      const matches = node.name.toUpperCase().includes(text);

      const filteredChildren = node.children
        ? recursiveTextFilterInTree(node.children, text)
        : [];

      if (matches) {
        return {
          ...node,
          children: node.children,
        };
      } else if (filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren,
        };
      }

      return false;
    })
    .filter(Boolean) as TreeNode[];
}

export function recursiveFilterBySensorType(
  tree: TreeNode[],
  key: keyof TreeNode,
  valueExpected: string
): TreeNode[] {
  return tree
    .map((node) => {
      const matches = node[key] === valueExpected;
      const filteredChildren = node.children
        ? recursiveFilterBySensorType(node.children, key, valueExpected)
        : [];

      if (matches || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren,
        };
      }

      return false;
    })
    .filter(Boolean) as TreeNode[];
}
