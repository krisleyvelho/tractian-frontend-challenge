'use client';

import { TreeNode } from '@/app/types/generic';
import { useSelectedCompany } from '@/states/company';
import { useTree } from '@/states/tree';
import { api } from '@/trpc/client';
import { useEffect, useState } from 'react';
import { mountFilteredTree } from './filters';
import { mountDefaultTree } from './mount-default-tree';
import { TreeItem } from './tree-item';

export function Tree() {
  const { idSelectedCompany } = useSelectedCompany();
  const {
    defaultTree,
    currentTree,

    setDefaultTree,
  } = useTree();

  const [currentTreeShow, setCurrentTreeShow] = useState<TreeNode[]>([]);
  const [isProcessingTree, setIsProcessingTree] = useState(false);

  const { data: locationList, isLoading: isLoadingLocation } =
    api.companies.locationsOfCompany.useQuery({
      companyId: idSelectedCompany!,
    });

  const { data: assetsList, isLoading: isLoadingAssets } =
    api.companies.assetsOfCompany.useQuery({
      companyId: idSelectedCompany!,
    });

  useEffect(() => {
    if (locationList && assetsList) {
      const tree = mountDefaultTree(locationList, assetsList);
      const sortedTree = tree.sort((a) => (!!a.children?.length ? -1 : 1));
      setDefaultTree(sortedTree);
    }
  }, [locationList, assetsList, setDefaultTree]);

  useEffect(() => {
    const {
      'critital-sensor-status': crititalSensorStatus,
      'energy-sensors': energySensors,
      text,
    } = currentTree;
    setIsProcessingTree(true);

    if (crititalSensorStatus.length || energySensors.length || text.length) {
      setCurrentTreeShow(mountFilteredTree(currentTree));

      setIsProcessingTree(false);
      return;
    }

    setCurrentTreeShow(defaultTree!);
    setIsProcessingTree(false);
  }, [currentTree, defaultTree]);

  if (isProcessingTree) return <div>Processando dados...</div>;

  if (isLoadingLocation || isLoadingAssets)
    return <div>Carregando dados...</div>;

  if (!currentTreeShow?.length || !defaultTree?.length)
    return <div>Não há dados para mostrar</div>;

  return (
    <div className="max-h-full overflow-y-auto">
      {currentTreeShow?.map((item) => (
        <TreeItem item={item} key={item.id} />
      ))}
    </div>
  );
}
