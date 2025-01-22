import { useSelectedCompany } from '@/states/company';
import { api } from '@/trpc/client';

export function BreadCrumb() {
  const { idSelectedCompany } = useSelectedCompany();
  const { data: companiesList } = api.companies.getCompanies.useQuery();

  const currentCompany = companiesList?.find(
    (company) => company.id === idSelectedCompany
  );
  return (
    <div className='flex gap-3 items-center '>
      <h2 className='font-bold text-xl text-title-active-color'>Ativos</h2>
      <span className='text-sm text-title-inactive-color'>{`/ ${currentCompany?.name}`}</span>
    </div>
  );
}
