import { CompanyAsset, CompanyLocation, TreeAsset, TreeLocation } from "@/app/types/generic";

  export function mountDefaultTree(
    locationList: CompanyLocation[],
    assetsList: CompanyAsset[]
  ) {
    const locationMap: Record<string, TreeLocation> = {};
    const assetMap: Record<string, TreeAsset> = {};
    const rootTree: (TreeLocation | TreeAsset)[] = [];

    locationList.forEach((location) => {
      locationMap[location.id] = {
        ...location,
        dataType: 'location',
        children: [],
      };
    });

    assetsList.forEach((asset) => {
      const currentAsset: TreeAsset = {
        ...asset,
        dataType: asset.parentId ? 'subAsset' : 'asset',
        children: [],
      };

      if (asset.sensorType) {
        currentAsset.dataType = 'component';
      }

      if (!asset.parentId && !asset.locationId) {
        rootTree.push(currentAsset);
      } else {
        assetMap[asset.id] = currentAsset;
      }
    });

    Object.values(assetMap)
      .sort((a, b) => (!!a.children?.length ? 1 : -1))
      .forEach((asset) => {
        if (asset.parentId && assetMap[asset.parentId]) {
          assetMap[asset.parentId].children!.push(asset);
        } else if (asset.locationId && locationMap[asset.locationId]) {
          locationMap[asset.locationId].children!.push(asset);
        }
      });

    Object.values(locationMap).forEach((location) => {
      if (location.parentId && locationMap[location.parentId]) {
        locationMap[location.parentId].children!.push(location);
      } else {
        rootTree.push(location);
      }
    });

    return rootTree;
  }