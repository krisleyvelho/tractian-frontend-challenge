'use client';

import { useSelectedCompany, useSelectEntity } from '@/states/company';
import { api } from '@/trpc/client';
import Image from 'next/image';
import GoldIcon from '@/assets/Gold.svg';
import TractianLogo from '@/assets/LOGO TRACTIAN.png';

import { Company } from '../../types/generic';
import { ImageAsIcon } from '../image-as-icon';
import { useTree } from '@/states/tree';
import { Button } from './button';

export default function Header() {
  const { data: companiesList } = api.companies.getCompanies.useQuery();

  const { setIdSelectedCompany, idSelectedCompany } = useSelectedCompany();
  const { setSelectedEntity } = useSelectEntity();
  const { resetTree } = useTree();

  const { invalidate: invalidateCompanies } = api.useUtils()?.companies;
  function onSelectCompany(id: Company['id']) {
    setIdSelectedCompany(id);
    invalidateCompanies();
    setSelectedEntity(undefined);
    resetTree();
  }

  return (
    <header className="flex w-full bg-darkBlue p-4 justify-between">
      <div className="flex justify-center items-center">
        <Image
          src={TractianLogo.src}
          alt="Tractian Logo"
          width={102}
          height={14}
        />
      </div>
      <div className="flex gap-4 items-center">
        {companiesList?.map(({ id, name }) => (
          <Button
            key={id}
            onClick={() => onSelectCompany(id)}
            icon={<ImageAsIcon icon={GoldIcon} className='size-4 '/>}
            data-selected={id === idSelectedCompany}
          >
            {name}
          </Button>
        ))}
      </div>
    </header>
  );
}
