'use client';

import { useSelectedCompany, useSelectEntity } from '@/states/company';
import { api } from '@/trpc/client';
import Image from 'next/image';
import GoldIcon from '../../assets/Gold.svg';
import TractianLogo from '../../assets/tractian-logo.png';

import { Company } from '../types/generic';
import { Button } from './button';
import { ImageAsIcon } from './image-as-icon';
import { useTree } from '@/states/tree';

export default function Header() {
  const { data: companiesList } = api.companies.getCompanies.useQuery();

  const { setIdSelectedCompany, idSelectedCompany } = useSelectedCompany();
  const { setSelectedEntity} = useSelectEntity()
  const { resetTree } = useTree();

  const { invalidate: invalidateCompanies } = api.useUtils()?.companies;
  function onSelectCompany(id: Company['id']) {
    setIdSelectedCompany(id);
    invalidateCompanies();
    setSelectedEntity(undefined)
    resetTree()
    
  }

  return (
    <header className="flex w-full bg-backgroundBlue p-4 justify-between">
      <Image
        src={TractianLogo.src}
        alt="Tractian Logo"
        width={205}
        height={1}
      />
      <div className="flex gap-4 items-center">
        {companiesList?.map(({ id, name }) => (
          <Button
            key={id}
            active={idSelectedCompany === id}
            onClick={() => onSelectCompany(id)}
            icon={<ImageAsIcon icon={GoldIcon} />}
          >
            {name}
          </Button>
        ))}
      </div>
    </header>
  );
}
