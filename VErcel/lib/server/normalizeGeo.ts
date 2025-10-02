import { RealGeoDataService, resolveStateName, resolveLgaName, resolveWardName, resolvePollingUnitName } from "@/lib/services/realGeoDataService";

export type GeoInput = {
  state?: string | null;
  lga?: string | null;
  ward?: string | null;
  pollingUnit?: string | null;
};

export type NormalizedGeo = {
  state: { code: string | null; name: string | null };
  lga: { code: string | null; name: string | null };
  ward: { code: string | null; name: string | null };
  pollingUnit: { code: string | null; name: string | null };
  isComplete: boolean;
};

export async function normalizeGeo(input: GeoInput): Promise<NormalizedGeo> {
  // Ensure geo data is loaded
  try {
    await RealGeoDataService.loadGeoData();
  } catch (error) {
    // Return input values as-is if geo data loading fails
    return {
      state: { code: input.state || null, name: input.state || null },
      lga: { code: input.lga || null, name: input.lga || null },
      ward: { code: input.ward || null, name: input.ward || null },
      pollingUnit: { code: input.pollingUnit || null, name: input.pollingUnit || null },
      isComplete: Boolean(input.state && input.lga && input.ward && input.pollingUnit),
    };
  }
  const stateRes = input.state ? resolveStateName(input.state) : null;
  const stateCode = stateRes?.code ?? null;
  const stateName = stateRes?.name ?? (input.state ?? null);

  const lgaRes = input.lga && stateName
    ? resolveLgaName(stateCode ?? stateName, input.lga)
    : null;
  const lgaCode = lgaRes?.code ?? null;
  const lgaName = lgaRes?.name ?? (input.lga ?? null);

  const wardRes = input.ward && (lgaCode || lgaName) && (stateCode || stateName)
    ? resolveWardName(stateCode ?? stateName ?? '', lgaCode ?? lgaName ?? '', input.ward ?? '')
    : null;
  const wardCode = wardRes?.code ?? null;
  const wardName = wardRes?.name ?? (input.ward ?? null);

  const puRes = input.pollingUnit && (wardCode || wardName) && (lgaCode || lgaName) && (stateCode || stateName)
    ? resolvePollingUnitName(stateCode ?? stateName ?? '', lgaCode ?? lgaName ?? '', wardCode ?? wardName ?? '', input.pollingUnit ?? '')
    : null;
  const puCode = puRes?.code ?? null;
  const puName = puRes?.name ?? (input.pollingUnit ?? null);

  const isComplete = Boolean(stateName && lgaName && wardName && puName);

  return {
    state: { code: stateCode, name: stateName },
    lga: { code: lgaCode, name: lgaName },
    ward: { code: wardCode, name: wardName },
    pollingUnit: { code: puCode, name: puName },
    isComplete,
  };
}
