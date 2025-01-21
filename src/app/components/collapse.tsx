import { useTree } from '@/states/tree';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import { TreeNode } from '../types/generic';
import { ComponentItem } from './tree/component-item';

type CollapseProps = {
  item: TreeNode;
  children?: ReactNode;
  icon?: StaticImageData;
  onOpenChange?: (open: boolean) => void;
};

export function Collapse({
  item,
  children,
  icon,
  onOpenChange,
}: CollapseProps) {
  const { treeOpenById } = useTree();
  const isEmptyCollapse = !children;

  const toggleCollapse = () => {
    onOpenChange?.(!treeOpenById[item.id]);
  };

  return (
    <div className="rounded-md shadow-md flex w-full flex-col flex-nowrap ">
      <ComponentItem item={item} icon={icon} onClick={toggleCollapse}>
        {!isEmptyCollapse && <span>{!!treeOpenById[item.id] ? '▲' : '▼'}</span>}
      </ComponentItem>

      {!!treeOpenById[item.id] && (
        <div className="ml-4 py-2 flex justify-end bg-white  flex-col">
          {children}
        </div>
      )}
    </div>
  );
}
