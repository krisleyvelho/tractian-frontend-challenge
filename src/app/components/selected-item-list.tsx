'use client';

import SensorIcon from '@/assets/wifi_tethering.svg';
import { useSelectEntity } from '@/states/company';
import { RouterIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { FileInput } from './tree/file-input';
import { ComponentStatus } from './tree/component-status';
import { Separator } from './ui/separator';
import { ImageAsIcon } from './image-as-icon';

interface ItemProps {
  title: string;
  value: string | ReactNode;
  icon?: ReactNode;
}

function Item({ title, value, icon }: ItemProps) {
  return (
    <div className="flex gap-2 items-left flex-col w-full">
      <h3 className="text-base font-inter text-title-active-color font-semibold">
        {title}
      </h3>
      <div className="text-muted-gray font-inter font-normal text-base flex gap-2 items-center justify-start">
        {icon && <>{icon}</>}
        {value}
      </div>
    </div>
  );
}

export function SelectedItemList() {
  const { selectedEntity } = useSelectEntity();

  if (!selectedEntity) {
    return (
      <div className="border-[1px] border-defaultSlate rounded-sm size-full justify-center items-center text-center">
        Selecione um ativo
      </div>
    );
  }

  return (
    <div className="flex w-full h-full flex-col border-[1px] border-defaultSlate rounded-sm">
      <div className="flex w-full py-3 px-4 gap-2 justify-start h-fit border-b-[1px] border-defaultSlate items-center">
        <span className="font-semibold text-title-active-color text-lg ">
          {selectedEntity.name}
        </span>
        <ComponentStatus status={selectedEntity.status} sensorType={selectedEntity.sensorType} />
      </div>
      <div className="flex flex-col p-6 gap-6">
        <div className="flex gap-4 w-full">
          <FileInput />
          <div className="flex flex-col h-full justify-center gap-2 w-full items-center">
            <Item
              title="Tipo de Equipamento"
              value={selectedEntity.sensorType}
            />
            <Separator />
            <Item
              title="Responsável"
              value={'John'}
              icon={
                <div className="rounded-full text-center bg-activeBlue text-white text-sm size-5">
                  J
                </div>
              }
            />
          </div>
        </div>
        <div className="flex w-full flex-col ">
          <Separator />
          <div className="flex p-2 gap-4 justify-start h-fit">
            <Item
              title="Sensor"
              value={selectedEntity.sensorId}
              icon={<ImageAsIcon icon={SensorIcon} />}
            />

            <Item
              title="Receptor"
              value={selectedEntity.gatewayId}
              icon={<RouterIcon className="size-5 text-activeBlue" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
