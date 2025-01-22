'use client';

import { useSelectedCompany } from '@/states/company';
import { useTree } from '@/states/tree';
import { api } from '@/trpc/client';
import { useEffect } from 'react';
import { mountDefaultTree } from './mount-default-tree';
import { TreeItem } from './tree-item';

export function Tree() {
  const { idSelectedCompany } = useSelectedCompany();
  const {
    currentTree,

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
      const sortedTree = tree.sort((a) => (!!a.children?.length ? -1 : 1));
      setDefaultTree(sortedTree);
    }
  }, [locationList, assetsList, setDefaultTree]);

  if (!currentTree?.length)
    return (
      <div className="flex p-4 justify-center">
        Não foram encontrados ativos
      </div>
    );

  return (
    <div className="max-h-full overflow-y-auto">
      {currentTree?.map((item) => (
        <TreeItem item={item} key={item.id} />
      ))}
    </div>
  );
}
