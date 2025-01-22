'use client';

import { useTree } from '@/states/tree';
import { CircleXIcon, Search } from 'lucide-react';
import { useRef } from 'react';
import { recursiveTextFilterInTree } from '../tree/filters';

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ ...props }: SearchBarProps) {
  const { defaultTree, currentTree, setCurrentTree, toggleAllNodes } =
    useTree();
  const textSearchRef = useRef<HTMLInputElement>(null);

  function resetDefaultTree() {
    setCurrentTree(defaultTree);
    toggleAllNodes(defaultTree!, 'close');
    if (textSearchRef?.current?.value) {
      textSearchRef.current.value = '';
    }
  }

  function onTextSearch() {
    if (!currentTree) return;
    const text = textSearchRef?.current?.value.toUpperCase();
    if (!text && currentTree) {
      resetDefaultTree();
      return;
    }

    let fTree = recursiveTextFilterInTree(currentTree, text!);

    if (!fTree.length) {
      fTree = recursiveTextFilterInTree(defaultTree!, text!);
    }

    toggleAllNodes(fTree, 'open');
    setCurrentTree(fTree);
  }
  return (
    <div className="flex gap-4 items-center bg-white border-b border-defaultSlate ">
      <input type="text" ref={textSearchRef} onKeyUp={(e) => e.key === 'Enter' && onTextSearch()} {...props} />
      <div className="flex gap-2 items-center px-2">
        {textSearchRef?.current?.value && (
          <CircleXIcon
            className="text-title-active-color size-5  hover:cursor-pointer"
            onClick={() => resetDefaultTree()}
          />
        )}
        <Search
          className="text-title-active-color size-5  hover:cursor-pointer"
          onClick={onTextSearch}
        />
      </div>
    </div>
  );
}
