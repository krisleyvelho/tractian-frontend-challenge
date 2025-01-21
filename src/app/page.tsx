'use client';

import { useTree } from '@/states/tree';
import { Info, Zap } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { BreadCrumb } from './components/breadcrumb';
import { Button } from './components/button';
import { SearchBar } from './components/search-Bar';
import { SelectedItemList } from './components/selected-item-list';
import { Tree } from './components/tree';
import { recursiveFilterBySensorType } from './components/tree/filters';
import { TreeNode } from './types/generic';

type BtnListType = {
  id: keyof ActivatedFiltersType;
  name: string;
  icon: ReactNode;
  onClick?: VoidFunction;
};
type ActivatedFiltersType = {
  'energy-sensors': boolean;
  'critital-sensor-status': boolean;
};

type BackupCurrentTreeType = {
  [key in keyof ActivatedFiltersType]: TreeNode[] | undefined;
};

export default function Home() {
  const HeaderPage = () => {
    const [activatedFilters, setActivatedFilters] =
      useState<ActivatedFiltersType>({
        'critital-sensor-status': false,
        'energy-sensors': false,
      });
    const { currentTree, setCurrentTree, toggleAllNodes } = useTree();

    const [currentTreeBeforeFilter, setCurrentTreeBeforeFilter] =
      useState<BackupCurrentTreeType>({
        'critital-sensor-status': currentTree,
        'energy-sensors': currentTree,
      });

    function toggleFilterEnergySensor() {
      if (!activatedFilters['energy-sensors']) {
        setActivatedFilters((prev) => ({ ...prev, 'energy-sensors': true }));
        const fTree = recursiveFilterBySensorType(
          currentTree!,
          'sensorType',
          'energy'
        );
        setCurrentTreeBeforeFilter((prev) => ({
          ...prev,
          'energy-sensors': currentTree,
        }));
        setCurrentTree(fTree);
        toggleAllNodes(fTree, 'open');
        return;
      }
      setActivatedFilters((prev) => ({ ...prev, 'energy-sensors': false }));
      toggleAllNodes(currentTree!, 'close');
      setCurrentTree(currentTreeBeforeFilter['energy-sensors']);
    }

    function toggleCriticalSensorStatus() {
      if (!activatedFilters['critital-sensor-status']) {
        setActivatedFilters((prev) => ({
          ...prev,
          'critital-sensor-status': true,
        }));
        const fTree = recursiveFilterBySensorType(
          currentTree!,
          'status',
          'alert'
        );
        setCurrentTree(fTree);
        setCurrentTreeBeforeFilter((prev) => ({
          ...prev,
          'critital-sensor-status': currentTree,
        }));
        toggleAllNodes(fTree, 'open');
        return;
      }
      setActivatedFilters((prev) => ({
        ...prev,
        'critital-sensor-status': false,
      }));
      toggleAllNodes(currentTree!, 'close');
      setCurrentTree(currentTreeBeforeFilter['critital-sensor-status']);
    }

    const btnList: BtnListType[] = [
      {
        id: 'energy-sensors',
        name: 'Sensor de energia',
        icon: <Zap />,
        onClick: toggleFilterEnergySensor,
      },
      {
        name: 'Crítico',
        id: 'critital-sensor-status',
        icon: <Info />,
        onClick: toggleCriticalSensorStatus,
      },
    ];

    useEffect(() => {
      const btnListInicialSelected: typeof selectedEntity = {};
      btnList.forEach((btn) => (btnListInicialSelected[btn.id] = false));
    }, []);

    return (
      <div className="flex w-full justify-between ">
        <BreadCrumb />
        <div className="flex gap-4">
          {btnList.map(({ name, id, icon, onClick }) => {
            const active = !!activatedFilters[id];
            return (
              <Button
                key={id}
                icon={icon}
                className={`${
                  active
                    ? 'text-white bg-activeBlue hover:bg-activeBlue'
                    : 'bg-transparent border-[1px] border-defaultSlate !text-slate-700'
                }`}
                active={active}
                onClick={onClick}
              >
                {name}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col gap-4 overflow-y-auto">
      <HeaderPage />
      <div className="flex w-full gap-4 h-full ">
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
