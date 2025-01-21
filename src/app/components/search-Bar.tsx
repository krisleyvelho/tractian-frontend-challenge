import { useTree } from '@/states/tree';
import { Search } from 'lucide-react';
import { useRef } from 'react';
import { Button } from './button';
import { recursiveTextFilterInTree } from './tree/filters';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchBar({ ...props }: SearchBarProps) {
  const { defaultTree, currentTree, setCurrentTree, toggleAllNodes } =
    useTree();
  const textSearchRef = useRef<HTMLInputElement>(null);

  function onTextSearch() {
    if (!currentTree) return;
    const text = textSearchRef?.current?.value.toUpperCase();

    if (!text && currentTree) {
      toggleAllNodes(defaultTree!, 'close');

      setCurrentTree(defaultTree);
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
    <div className="flex gap-4 items-center bg-white focus:outline-none focus-visible:outline-none ">
      <input type="text" ref={textSearchRef} {...props} />
      <Button
        className="bg-transparent hover:bg-transparent text-black"
        onClick={onTextSearch}
      >
        <Search className="text-title-active-color" />
      </Button>
    </div>
  );
}
