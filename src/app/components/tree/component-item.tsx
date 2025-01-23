'use client';

import { CompanyAsset, TreeNode } from '@/app/types/generic';
import { useSelectEntity } from '@/states/company';
import { StaticImageData } from 'next/image';
import { useState } from 'react';
import { ImageAsIcon } from '../image-as-icon';
import { ComponentStatus } from './component-status';
import { Button } from '../ui/button';

interface ComponentItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: StaticImageData;
  active?: boolean;
  item: TreeNode | CompanyAsset;
}

export function ComponentItem({
  item,
  icon,
  children,
  ...props
}: ComponentItemProps) {
  const { selectedEntity } = useSelectEntity();
  const [transformImage, setTransformImage] = useState<boolean>(false);

  const imageWithWhiteEffect =
    transformImage || selectedEntity?.id === item.id
      ? 'invert(1000%) brightness(200%) saturate(0%)'
      : '';

  return (
    <Button
      onMouseLeave={() => setTransformImage(false)}
      onMouseEnter={() => setTransformImage(true)}
      size={'none'}
      variant={'itemTree'}
      className="font-normal p-1 whitespace-normal"
      {...props}
    >
      {children}

      <div className="flex items-center justify-start w-full px-1 gap-2">
        {icon && (
          <ImageAsIcon
            icon={icon}
            data-selected={selectedEntity?.id === item.id}
            style={{ filter: imageWithWhiteEffect }}
            className="w-7 h-7"
          />
        )}
        <span className="text-left font-roboto text-sm">{item.name}</span>
        <ComponentStatus status={item.status} sensorType={item.sensorType} />
      </div>
    </Button>
  );
}
