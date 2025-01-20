import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectedCompanyType {
  idSelectedCompany: string | undefined;
  setIdSelectedCompany: (
    idSelectedCompany: SelectedCompanyType['idSelectedCompany']
  ) => void;
}

export const useSelectedCompany = create<SelectedCompanyType>()(
  persist(
    (set) => ({
      idSelectedCompany: undefined,
      setIdSelectedCompany: (idSelectedCompany) =>
        set(() => ({ idSelectedCompany })),
    }),
    {
      name: 'companySelect',
      partialize: (state) => ({
        idSelectedCompany: state.idSelectedCompany,
      }),
    }
  )
);
