import { useSelectEntity } from '@/states/company';
import { ReactNode } from 'react';
import { FileInput } from './file-input';
import { ComponentStatus } from './tree/component-status';

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
  const { selectedEntity } = useSelectEntity();

  if (!selectedEntity) {
    return <div>Selecione um ativo</div>;
  }

  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex w-full p-2 gap-2 justify-start h-fit border-b-[1px] border-defaultSlate">
        {selectedEntity.name} <ComponentStatus status={selectedEntity.status} />
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
