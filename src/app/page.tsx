import { SelectedItemList } from './components/selected-item-list';
import { TreeMenu } from './components/tree/treeMenu';

export default function Home() {
  return (
    <div className="overflow-y-auto flex gap-4 size-full">
      <TreeMenu />
      <SelectedItemList />
    </div>
  );
}
