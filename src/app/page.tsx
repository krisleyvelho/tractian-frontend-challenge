'use client';

import { Info, Zap } from 'lucide-react';
import { useState } from 'react';
import { BreadCrumb } from './components/breadcrumb';
import { Button } from './components/button';
import { Tree } from './components/tree';
import { SearchBar } from './components/search';
import { SelectedItemList } from './components/selected-item-list';

export default function Home() {
  const HeaderPage = () => {
    const [selectedEntity, setSelectedEntity] = useState<string | undefined>(
      undefined
    );

    const btnList = [
      { name: 'Sensor de energia', id: '1', icon: <Zap /> },
      { name: 'Crítico', id: '2', icon: <Info /> },
    ];

    return (
      <div className="flex w-full justify-between ">
        <BreadCrumb />
        <div className="flex gap-4">
          {btnList.map(({ name, id, icon }) => {
            const active = selectedEntity === id;
            return (
            <Button
              key={id}
              icon={icon}
              className={`${active ? 'text-white bg-activeBlue hover:bg-activeBlue' : 'bg-transparent border-[1px] border-defaultSlate !text-slate-700' }`}
              active={active}
              onClick={() => setSelectedEntity(id)}
            >
              {name}
            </Button>
          )})}
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col gap-4 overflow-y-auto">
      <HeaderPage />
      <div className="flex w-full gap-4 h-full">
        <div className="border-[1px] border-defaultSlate w-2/5 h-full overflow-y-auto">
          <SearchBar
            className="w-full p-2"
            placeholder="Buscar ativo ou local"
          />
          <Tree />
        </div>
        <div className="border-[1px] border-defaultSlate w-full">
          <SelectedItemList />
        </div>
      </div>
    </div>
  );
}
