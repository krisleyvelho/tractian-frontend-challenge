import { CompanyAsset } from "@/app/types/generic";

interface ComponentStatusProps {
  status: CompanyAsset['status'];
}

export function ComponentStatus({ status }: ComponentStatusProps) {
  switch (status) {
    case 'alert':
      return <div className="size-2 bg-red-500 rounded-full"></div>;
    case 'operating':
      return <div className="size-2 bg-green-500 rounded-full"></div>;
    default:
      return null;
  }
}
