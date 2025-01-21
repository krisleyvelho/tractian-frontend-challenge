import { StaticImageData } from 'next/image';
import { ImageAsIcon } from '../image-as-icon';
import { useSelectEntity } from '@/states/company';
import { useEffect, useState } from 'react';
import { TreeNode } from '@/app/types/generic';
import { ComponentStatus } from './component-status';

interface ComponentItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: StaticImageData;
  active?: boolean;
  item: TreeNode;
}

export function ComponentItem({
  item,
  icon,
  children,
  className,
  ...props
}: ComponentItemProps) {
  const { selectedEntity } = useSelectEntity();
  const [transformImage, setTransformImage] = useState<boolean>(false);

  const imageWithWhiteEffect =
    transformImage || selectedEntity?.id === item.id
      ? 'invert(1000%) brightness(200%) saturate(0%)'
      : '';

  return (
    <button
      className={`flex hover:bg-activeBlue hover:text-white justify-between my-1 p-2 data-[selected=true]:bg-activeBlue data-[selected=true]:text-white w-full ${className}`}
      {...props}
      onMouseEnter={() => setTransformImage(true)}
      onMouseLeave={() => setTransformImage(false)}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <ImageAsIcon
            icon={icon}
            data-selected={selectedEntity?.id === item.id}
            style={{ filter: imageWithWhiteEffect }}
          />
        )}
        <span className="text-left">{item.name}</span>
        <ComponentStatus status={item.status} />
      </div>

      {children}
    </button>
  );
}
