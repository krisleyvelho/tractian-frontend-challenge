import Image, { StaticImageData } from 'next/image';
import React, { ReactNode, useState } from 'react';

type CollapseProps = {
  title: string;
  children?: ReactNode;
  icon?: StaticImageData;
};

export function Collapse({ title, children, icon }: CollapseProps)  {
  const [isOpen, setIsOpen] = useState(false);
  const isEmptyCollapse = !children;

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border rounded-md shadow-md">
      <button
        onClick={isEmptyCollapse ? undefined : toggleCollapse}
        className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        <div className="flex justify-between items-center">
          <div className='flex items-center gap-4'>

          {icon && (
            <Image
            src={icon?.src}
            alt="icon"
            width={icon?.width}
            height={icon?.height}
            />
          )}
          <span>{title}</span>
          </div>
          {!isEmptyCollapse && <span>{isOpen ? '▲' : '▼'}</span>}
        </div>
      </button>
      {isOpen && <div className="px-4 py-2 bg-white border-t">{children}</div>}
    </div>
  );
};


