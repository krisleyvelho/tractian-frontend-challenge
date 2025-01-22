import { Tree } from '.';
import { SearchBar } from '../ui/search-Bar';

export function TreeMenu() {
  return (
    <div className="overflow-y-auto flex flex-col border-[1px] border-defaultSlate rounded-sm w-1/3">
      <SearchBar className="w-full p-3" placeholder="Buscar Ativo ou Local" />
      <div className="size-full overflow-y-auto">
        <div>
          <Tree />
        </div>
      </div>
    </div>
  );
}
