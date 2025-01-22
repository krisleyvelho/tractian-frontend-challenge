'use client';

import { useTree } from '@/states/tree';
import { Info, Zap } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { TreeNode } from '../types/generic';
import { BreadCrumb } from './ui/breadcrumb';
import { recursiveFilterBySensorType } from './tree/filters';
import { Button } from './ui/button';

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

export function SubHeader() {
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

  const toggleFilterEnergySensor = useCallback(() => {
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
  }, [
    activatedFilters,
    currentTree,
    currentTreeBeforeFilter,
    setCurrentTree,
    toggleAllNodes,
  ]);

  const toggleCriticalSensorStatus = useCallback(() => {
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
  }, [
    activatedFilters,
    currentTree,
    currentTreeBeforeFilter,
    toggleAllNodes,
    setCurrentTree,
  ]);

  const btnList: BtnListType[] = useMemo(
    () => [
      {
        id: 'energy-sensors',
        name: 'Sensor de energia',
        icon: <Zap className='size-5 data-[selected=true]:text-white text-activeBlue' data-selected={!!activatedFilters['energy-sensors']} />,
        onClick: toggleFilterEnergySensor,
      },
      {
        name: 'Crítico',
        id: 'critital-sensor-status',
        icon: <Info className='size-5 data-[selected=true]:text-white text-activeBlue' data-selected={!!activatedFilters['critital-sensor-status']}/>,
        onClick: toggleCriticalSensorStatus,
      },
    ],
    [toggleCriticalSensorStatus, toggleFilterEnergySensor, activatedFilters]
  );

  useEffect(() => {
    const btnListInicialSelected: Record<string, boolean> = {};
    btnList.forEach((btn) => (btnListInicialSelected[btn.id] = false));
  }, [btnList]);

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
              data-selected={active}
              onClick={onClick}
              variant={'ghost'}
              size={'md'}
            >
              {name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
