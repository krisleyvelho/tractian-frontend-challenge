export interface Company {
  id: string;
  name: string;
}

export interface CompanyLocation {
  id: string;
  name: string;
  parentId?: string;
}

export interface CompanyAsset {
  gatewayId?: string;
  id: string;
  locationId: string;
  name: string;
  parentId?: string;
  sensorId?: string;
  sensorType?: string;
  status?: string;
}
export interface TreeAsset extends CompanyAsset {
  children?: TreeNode[];
  dataType: 'asset' | 'subAsset' | 'component';
}

export interface TreeLocation extends CompanyLocation {
  children?: TreeNode[];
  dataType: 'location';
}

export type TreeNode = (TreeLocation | TreeAsset) & Partial<CompanyAsset>;
