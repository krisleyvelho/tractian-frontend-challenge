import { SearchBar } from './components/ui/search-Bar';
import { SelectedItemList } from './components/selected-item-list';
import { Tree } from './components/tree';

/* export default function Home() {
  return (
    <div className="flex w-full gap-4 h-full overflow-hidden">
      <div className="border-[1px] border-defaultSlate w-2/5 h-full" id='limit'>
        <SearchBar className="w-full p-3" placeholder="Buscar Ativo ou Local" />
        <div className='h-max bg-blue-400 overflow-y-auto'>
          <Tree />
        </div>
      </div>
      <div className="border-[1px] border-defaultSlate w-full">
        <SelectedItemList />
      </div>
    </div>
  );
} */

const TreeMenu = () => {
  return (
    <div className="overflow-y-auto flex flex-col border-[1px] border-defaultSlate rounded-sm">
      <SearchBar className="w-full p-3" placeholder="Buscar Ativo ou Local" />
      <div className="size-full overflow-y-auto">
        <div>
          <Tree />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="overflow-y-auto flex gap-4 h-full">
      <TreeMenu />
      <SelectedItemList />
    </div>
  );
}
