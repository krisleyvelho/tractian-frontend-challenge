import { CompanyAsset } from '@/app/types/generic';
import { Zap } from 'lucide-react';

interface ComponentStatusProps {
  status: CompanyAsset['status'];
  sensorType: CompanyAsset['sensorType'];
}

export function ComponentStatus({ sensorType, status }: ComponentStatusProps) {
  switch (status) {
    case 'alert':
      return <div className="size-2 bg-red-500 rounded-full"></div>;
    case 'operating':
      switch (sensorType) {
        case 'vibration':
          return <div className="size-2 bg-green-500 rounded-full"></div>;
        case 'energy':
          return <Zap className="fill-defaultGreen text-transparent size-4" />;
        default:
          return null;
      }
    default:
      return null;
  }
}
