import AssetImage from '@/assets/asset.png';
import ComponentImage from '@/assets/component.png';
import LocationImage from '@/assets/location.png';
import { useSelectedCompany, useSelectEntity } from '@/states/company';
import { useTree } from '@/states/tree';
import { api } from '@/trpc/client';
import { StaticImageData } from 'next/image';
import { useEffect } from 'react';
import {
  CompanyAsset,
  CompanyLocation,
  TreeNode
} from '../types/generic';
import { Collapse } from './collapse';
import { ComponentItem } from './tree/component-item';
import { mountDefaultTree } from './tree/mount-default-tree';

const iconsByDataType: Record<string, StaticImageData> = {
  asset: AssetImage,
  subAsset: AssetImage,
  component: ComponentImage,
  location: LocationImage,
};

export function Tree() {
  const { idSelectedCompany } = useSelectedCompany();
  const { setSelectedEntity, selectedEntity } = useSelectEntity();
  const {
    currentTree,
    setCurrentTree,
    setTreeOpenById,
    treeOpenById,
    setDefaultTree,
  } = useTree();

  const { data: locationList } = api.companies.locationsOfCompany.useQuery({
    companyId: idSelectedCompany!,
  });

  const { data: assetsList } = api.companies.assetsOfCompany.useQuery({
    companyId: idSelectedCompany!,
  });

  useEffect(() => {
    if (locationList && assetsList) {
      const tree = mountDefaultTree(locationList, assetsList);
      const sortedTree = tree.sort((a, b) => (!!a.children?.length ? -1 : 1));
      setDefaultTree(sortedTree);
    }
  }, [locationList, assetsList]);

  function onSelectEntity(entity: CompanyAsset | CompanyLocation) {
    if (entity.id === selectedEntity?.id) {
      setSelectedEntity(undefined);
      return;
    }
    setSelectedEntity(entity);
  }

  function TreeItem({ item }: TreeItemProps) {
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
          item.children?.map((child) => (
            <TreeItem item={child} key={child.id} />
          ))}
      </Collapse>
    );
  }

  if (!currentTree?.length) return <div className='flex p-4 justify-center'>Não foram encontrados ativos</div>;

  return (
    <div>
      {currentTree?.map((item) => (
        <TreeItem item={item} key={item.id} />
      ))}
    </div>
  );
}

interface TreeItemProps {
  item: TreeNode;
}
