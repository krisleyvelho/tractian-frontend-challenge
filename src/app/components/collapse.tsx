import { useTree } from '@/states/tree';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import { TreeNode } from '../types/generic';
import { ComponentItem } from './tree/component-item';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    <div className="rounded-md flex w-full flex-col flex-nowrap">
      <ComponentItem item={item} icon={icon} onClick={toggleCollapse}>
        {!isEmptyCollapse &&
          (!!treeOpenById[item.id] ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          ))}
      </ComponentItem>

      {!!treeOpenById[item.id] && (
        <div className="ml-3 py-2 flex justify-end border-l border-defaultSlate flex-col">
          {children}
        </div>
      )}
    </div>
  );
}
