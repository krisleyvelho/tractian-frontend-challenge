import { ReactNode } from 'react';
import { FileInput } from './file-input';

interface ItemProps {
  title: string;
  value: string | ReactNode;
}
function Item({ title, value }: ItemProps) {
  return (
    <div className="flex gap-2 items-left flex-col w-full">
      <h3 className="text-sm text-gray-900 font-semibold">{title}</h3>
      <div className="text-sm text-gray-500">{value}</div>
    </div>
  );
}

export function SelectedItemList() {
  const selectedEntity = {
    gatewayId: 'QLW221',
    id: '607a124af70f5b001e041c22',
    locationId: '607a11a07a51520020945cd6',
    name: 'Sensor 7 - energy',
    parentId: null,
    sensorId: 'PLC453',
    sensorType: 'energy',
    status: 'operating',
  };

  const iconByStatus: Record<string, any> = {
    operating: <div className="w-4 h-4 bg-green-500 rounded-full"></div>,
    broken: <div className="w-4 h-4 bg-red-500 rounded-full"></div>,
    unknown: <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>,
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex w-full p-2 gap-2 justify-start h-fit border-b-[1px] border-defaultSlate">
        {selectedEntity.name} {iconByStatus[selectedEntity.status]}
      </div>
      <div className="flex gap-4  p-2">
        <FileInput />
        <div className="flex flex-col h-[50%] justify-around gap-2">
          <Item title="Tipo de Equipamento" value={selectedEntity.sensorType} />
          <Item title="Responsável" value={'John'} />
        </div>
      </div>
      <div className="flex w-full border-t-[1px] border-defaultSlate p-2 gap-4 justify-start h-fit">
        <Item title="Sensor" value={selectedEntity.sensorId} />
        <Item title="Receptor" value={selectedEntity.gatewayId} />
      </div>
    </div>
  );
}
