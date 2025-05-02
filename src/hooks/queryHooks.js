import {useQuery} from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import URLS from "@/util/urls";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";

// Build query string from object "params" or value
function buildQueryString(params = null) {
  if (params === null) return "";
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && key !== "id") {
      searchParams.append(key, String(value));
    }
  });
  let queryString = searchParams.toString();
  queryString = queryString ? `?${queryString}` : "";
  console.log(params);
  if (params["id"] !== undefined) {
    queryString = `${params["id"]}${queryString}`;
  }
  return queryString;
}


// Create query
export const createQueryHook = (key, admin = false) => {
  return function useGenericQuery(params = null, options = {}) {
    const axios = admin ? useAxiosAdmin() : useAxiosPrivate();
    const queryKey = [URLS[key], ...Object.values(params ?? {})];

    return useQuery({
      queryKey,
      queryFn: async () => {
        const queryString = buildQueryString(params);
        const response = await axios.get(`${URLS[key]}${queryString}`);
        return response.data;
      },
      ...options,
    });
  };
}

// Hook exports
export const useManufacturersQuery = createQueryHook("Manufacturers");
export const useModelsQuery = createQueryHook("Models");
export const useBikesQuery = createQueryHook("Bikes");
export const useWheelSizesQuery = createQueryHook("WheelSizes");
export const useColorsQuery = createQueryHook("Colors");
export const useCategoriesQuery = createQueryHook("Categories");
export const useStatusesQuery = createQueryHook("Statuses");
export const useStatusesNotSoldQuery = createQueryHook("StatusesNotSold");
export const usePlacesQuery = createQueryHook("Places");
export const useEmployeesQuery = createQueryHook("Employees");
export const useUsersQuery = createQueryHook("Users", true);
export const useRepairsQuery = createQueryHook("Repairs");
export const useServicesQuery = createQueryHook("Services");
export const useUnitsQuery = createQueryHook("Units");
export const usePartsQuery = createQueryHook("Parts");
export const usePartCategoriesQuery = createQueryHook("PartCategories");
export const usePartTypesQuery = createQueryHook("PartTypes");
export const useServiceCategoriesQuery = createQueryHook("ServiceCategories");
export const useFavoritesQuery = createQueryHook("Favorites");
export const useSoldBikesQuery = createQueryHook("SoldBikes");
export const useServicesFromCategoryQuery = createQueryHook("ServicesFromCategory");
export const useFilteredPartsQuery = createQueryHook("FilteredParts");





