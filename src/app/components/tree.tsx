import { useSelectedCompany } from '@/states/company';
import { api } from '@/trpc/client';

interface TreeProps {}

export function Tree({}: TreeProps) {
  const { idSelectedCompany } = useSelectedCompany();

  const { data: locationList } = api.companies.locationsOfCompany.useQuery({
    companyId: idSelectedCompany!,
  });

  const { data: assetsList } = api.companies.assetsOfCompany.useQuery({
    companyId: idSelectedCompany!,
  });

  return (
    <div className="flex flex-col gap-2 max-h-full ">
      <div className="flex overflow-y-auto flex-col max-h-[350px] m-4">
        localizacao
        {locationList?.map(({ id, name, parentId }) => {
          return (
            <div key={id} className="ml-4">
              {name}
            </div>
          );
        })}
      </div>
      {/* <div>-
      assets
      {assetsList?.map(({ id, name, parentId }) => {
        return <div key={id} className='ml-4'>{name}</div>;
      })}
    </div> */}
    </div>
  );
}
