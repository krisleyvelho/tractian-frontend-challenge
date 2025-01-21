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
  gatewayId?: string
  id: string
  locationId: string
  name: string
  parentId: any
  sensorId?: string
  sensorType?: string
  status: string
}