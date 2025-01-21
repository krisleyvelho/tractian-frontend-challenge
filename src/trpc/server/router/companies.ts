import { z } from 'zod';
import { publicProcedure, createTRPCRouter, apiUrl } from '../trpc';
import { Company, CompanyAsset, CompanyLocation } from '@/app/types/generic';



export const companiesRouter = createTRPCRouter({
  getCompanies: publicProcedure.query(async ({ ctx }) => {
    const response = await fetch(`${apiUrl}/companies`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch companies: ${response.status} ${response.statusText}`
      );
    }

    let data: Company[] = await response.json();

    data = data.sort((a, b) => a.name.localeCompare(b.name));

    // For data to be equal to the design, i'm adding 'Unit' text to the name
    data = data.map((company) => ({
      ...company,
      name: `${company.name} Unit`,
    }));

    return data;
  }),
  locationsOfCompany: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(async ({ ctx, input: { companyId } }) => {
      const response = await fetch(
        `${apiUrl}/companies/${companyId}/locations`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch companies: ${response.status} ${response.statusText}`
        );
      }

      const data: CompanyLocation[] = await response.json();

      return data;
    }),
  assetsOfCompany: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(async ({ ctx, input: { companyId } }) => {
      const response = await fetch(`${apiUrl}/companies/${companyId}/assets`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch companies: ${response.status} ${response.statusText}`
        );
      }

      const data: CompanyAsset[] = await response.json();

      return data;
    }),
});
