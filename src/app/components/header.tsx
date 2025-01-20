'use client';

import { useSelectedCompany } from '@/states/company';
import { api } from '@/trpc/client';
import Image from 'next/image';
import TractianLogo from '../../assets/tractian-logo.png';
import GoldIcon from '../../assets/Gold.svg';

import { Button } from './button';
import { SvgImage } from '@/utils/svg-image';

export default function Header() {
  const { data: companiesList } = api.companies.getCompanies.useQuery();

  const { setIdSelectedCompany, idSelectedCompany } = useSelectedCompany();

  

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
            onClick={() => setIdSelectedCompany(id)}
            icon={<SvgImage svg={GoldIcon} />}
          >
              {name}
          </Button>
        ))}
      </div>
    </header>
  );
}
