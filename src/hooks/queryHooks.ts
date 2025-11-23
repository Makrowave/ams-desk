import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import useAxiosPrivate from './useAxiosPrivate';
import URLS from '../util/urls';
import useAxiosAdmin from './useAxiosAdmin';

// Build query string from object "params" or value
function buildQueryString(
  params: Record<
    string,
    string | null | undefined | number | boolean
  > | null = null,
) {
  if (params === null) return '';
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && key !== 'id') {
      searchParams.append(key, String(value));
    }
  });
  let queryString = searchParams.toString();
  queryString = queryString ? `?${queryString}` : '';
  if (params['id'] !== undefined) {
    queryString = `${params['id']}${queryString}`;
  }
  return queryString;
}

// Create query
export const createQueryHook =
  <K extends keyof typeof URLS = keyof typeof URLS>(key: K, admin = false) =>
  <TData = unknown>(
    params: Record<
      string,
      string | undefined | null | number | boolean
    > | null = null,
    options?: Partial<UseQueryOptions<TData, AxiosError, TData>>,
  ) => {
    const axios = admin ? useAxiosAdmin() : useAxiosPrivate();
    const queryKey = [URLS[key], ...Object.values(params ?? {})];

    return useQuery<TData, AxiosError>({
      queryKey,
      queryFn: async () => {
        const queryString = buildQueryString(params);
        const response = await axios.get<TData>(`${URLS[key]}${queryString}`);
        return response.data;
      },
      ...options,
    });
  };

// Hook exports
export const useManufacturersQuery = createQueryHook('Manufacturers');
export const useModelsQuery = createQueryHook('Models');
export const useBikesQuery = createQueryHook('Bikes');
export const useWheelSizesQuery = createQueryHook('WheelSizes');
export const useColorsQuery = createQueryHook('Colors');
export const useCategoriesQuery = createQueryHook('Categories');
export const useStatusesQuery = createQueryHook('Statuses');
export const usePlacesQuery = createQueryHook('Places');
export const usePlacesNotStorageQuery = createQueryHook('PlacesNotStorage');
export const useEmployeesQuery = createQueryHook('Employees');
export const useUsersQuery = createQueryHook('Users', true);
export const useRepairsQuery = createQueryHook('Repairs');
export const useServicesQuery = createQueryHook('Services');
export const useUnitsQuery = createQueryHook('Units');
export const usePartsQuery = createQueryHook('Parts');
export const usePartCategoriesQuery = createQueryHook('PartCategories');
export const usePartTypesQuery = createQueryHook('PartTypes');
export const useServiceCategoriesQuery = createQueryHook('ServiceCategories');
export const useFavoritesQuery = createQueryHook('Favorites');
export const useSoldBikesQuery = createQueryHook('SoldBikes');
export const useServicesFromCategoryQuery = createQueryHook(
  'ServicesFromCategory',
);
export const useFilteredPartsQuery = createQueryHook('FilteredParts');
export const useInvoiceQuery = createQueryHook('Invoice');
export const useInvoicesQuery = createQueryHook('Invoices');

export const useDeliveriesQuery = createQueryHook('Deliveries');
export const useDeliveryQuery = createQueryHook('Delivery');
