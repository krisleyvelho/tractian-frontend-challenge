'use client';

import { Info, Zap } from 'lucide-react';
import { BreadCrumb } from './components/breadcrumb';
import { Button } from './components/button';
import { SearchBar } from './components/search';
import { Tree } from './components/tree';

export default function Home() {
  const HeaderPage = () => {
    return (
      <div className="flex w-full justify-between ">
        <BreadCrumb />
        <div className="flex gap-4">
          <Button
            icon={<Zap />}
            className="bg-transparent border-[1px] border-title-inactive-color text-slate-700"
          >
            Sensor de energia
          </Button>
          <Button
            icon={<Info />}
            className="bg-transparent border-[1px] border-title-inactive-color text-slate-700"
          >
            Crítico
          </Button>
        </div>
      </div>
    );
  };

  return (
    // <div className="flex w-full flex-col gap-4 bg-red-400 overflow-y-auto">
    <div className="flex w-full flex-col gap-4 overflow-y-auto">
      <HeaderPage />
      <div className="flex w-full gap-4 h-full">
        <div className="border-[1px] border-slate-500 w-2/5 h-full overflow-y-auto">
          <SearchBar className='w-full p-2' placeholder='Buscar ativo ou local' />
          <Tree />
        </div>
        <div className="border-[1px] border-slate-500 w-full"> container 2</div>
      </div>
    </div>
  );
}
