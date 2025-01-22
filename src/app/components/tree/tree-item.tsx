import { CompanyAsset, TreeNode } from '@/app/types/generic';
import AssetImage from '@/assets/asset.png';
import ComponentImage from '@/assets/component.png';
import LocationImage from '@/assets/location.png';
import { StaticImageData } from 'next/image';
import { ComponentItem } from './component-item';
import { useSelectEntity } from '@/states/company';
import { useTree } from '@/states/tree';
import { Collapse } from '../collapse';

interface TreeItemProps {
  item: TreeNode;
}

const iconsByDataType: Record<string, StaticImageData> = {
  asset: AssetImage,
  subAsset: AssetImage,
  component: ComponentImage,
  location: LocationImage,
};

export function TreeItem({ item }: TreeItemProps) {
  const { setSelectedEntity, selectedEntity } = useSelectEntity();
  const { setTreeOpenById, treeOpenById } = useTree();

  function onSelectEntity(entity: CompanyAsset) {
    if (entity.id === selectedEntity?.id) {
      setSelectedEntity(undefined);
      return;
    }
    setSelectedEntity(entity);
  }

  const icon = iconsByDataType[item.dataType];
  const itemHasChildren = !!item?.children?.[0];

  if (item.dataType === 'component') {
    return (
      <ComponentItem
        item={item}
        icon={icon}
        data-selected={selectedEntity?.id === item.id}
        onClick={(e) => {
          e.preventDefault();
          onSelectEntity(item);
        }}
      />
    );
  }

  function onCollapseOpenChange(open: boolean) {
    setTreeOpenById({ ...treeOpenById, [item.id]: open });
  }

  return (
    <Collapse item={item} icon={icon} onOpenChange={onCollapseOpenChange}>
      {itemHasChildren &&
        item.children?.map((child) => <TreeItem item={child} key={child.id} />)}
    </Collapse>
  );
}
