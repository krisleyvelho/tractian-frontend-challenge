import { useSelectedCompany } from '@/states/company';
import { api } from '@/trpc/client';
import { useEffect, useState } from 'react';
import { CompanyLocation } from '../types/generic';
import { Collapse } from './collapse';

export function Tree() {
  const { idSelectedCompany } = useSelectedCompany();

  const [treeLocation, setTreeLocation] = useState([]);

  const { data: locationList } = api.companies.locationsOfCompany.useQuery({
    companyId: idSelectedCompany!,
  });

  const { data: assetsList } = api.companies.assetsOfCompany.useQuery({
    companyId: idSelectedCompany!,
  });

  function mountTreeLocation(locationList: CompanyLocation[]) {
    if (!locationList) return [];

    const sortedList = locationList.sort((a, b) => (!!a.parentId ? 1 : -1));
    const tree: Record<string, any> = {};

    sortedList.forEach((location) => {
      if (!location.parentId) {
        tree[location.id] = { ...location, children: [] };
      } else if (location.parentId && tree[location.parentId]) {
        tree[location.parentId].children.push(location);
      }
    });

    return Object.values(tree);
  }

  useEffect(() => {
    if (!locationList) return;
    const tree = mountTreeLocation(locationList);
    console.log('🚀 ~ useEffect ~ tree:', tree);
    setTreeLocation(tree);

  }, [locationList, assetsList]);
  return (
    <div>
      {treeLocation.map((location) => {
        return (
          <Collapse title={location.name} key={location.id}>
            {location?.children?.map((location, index) => (
              <Collapse title={location.name} key={index}></Collapse>
            ))}
          </Collapse>
        );
      })}
    </div>
  );
}
