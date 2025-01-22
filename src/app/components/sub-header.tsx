'use client';

import { useTree } from '@/states/tree';
import { Info, Zap } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { TreeNode } from '../types/generic';
import { recursiveFilterBySensorType } from './tree/filters';
import { BreadCrumb } from './ui/breadcrumb';
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

type ToggleFilterFunctionType = (
  filterKey: keyof ActivatedFiltersType,
  filterField: keyof Pick<TreeNode, 'sensorType' | 'status'>,
  filterValue: string
) => void;

export function SubHeader() {
  const [activatedFilters, setActivatedFilters] =
    useState<ActivatedFiltersType>({
      'critital-sensor-status': false,
      'energy-sensors': false,
    });
  const { currentTree, setCurrentTree, toggleAllNodes, defaultTree } =
    useTree();

  const toggleSelectedFilter = useCallback(
    (key: keyof ActivatedFiltersType) => {
      setActivatedFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    [setActivatedFilters]
  );

  const toggleFilter: ToggleFilterFunctionType = useCallback(
    (filterKey, filterField, filterValue) => {
      if (!activatedFilters[filterKey]) {
        toggleSelectedFilter(filterKey);
        const fTree = recursiveFilterBySensorType(
          defaultTree!,
          filterField,
          filterValue
        );
        setCurrentTree({ ...currentTree, [filterKey]: fTree });
        toggleAllNodes(fTree, 'open');
        return;
      }
      toggleSelectedFilter(filterKey);
      toggleAllNodes(currentTree[filterKey], 'close');
      setCurrentTree({ ...currentTree, [filterKey]: [] });
    },
    [
      activatedFilters,
      currentTree,
      toggleSelectedFilter,
      setCurrentTree,
      toggleAllNodes,
      defaultTree,
    ]
  );

  const btnList: BtnListType[] = useMemo(
    () => [
      {
        id: 'energy-sensors',
        name: 'Sensor de energia',
        icon: (
          <Zap
            className="size-5 data-[selected=true]:text-white text-activeBlue"
            data-selected={!!activatedFilters['energy-sensors']}
          />
        ),
        onClick: () => toggleFilter('energy-sensors', 'sensorType', 'energy'),
      },
      {
        name: 'Crítico',
        id: 'critital-sensor-status',
        icon: (
          <Info
            className="size-5 data-[selected=true]:text-white text-activeBlue"
            data-selected={!!activatedFilters['critital-sensor-status']}
          />
        ),
        onClick: () =>
          toggleFilter('critital-sensor-status', 'status', 'alert'),
      },
    ],
    [toggleFilter, activatedFilters]
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
