import fs from "fs";
import path from "path";
import readline from "readline";

export type StateRow = { state_id: string; state_name: string };
export type LgaRow   = { lga_id: string; lga_name: string; state_id: string };
export type WardRow  = { ward_id: string; ward_name: string; lga_id: string };
export type PuRow    = {
  pu_id: string;
  pu_name: string;
  ward_id: string;
  address?: string | null;
  gps_lat?: number | null;
  gps_lng?: number | null;
};

type FlatDoc =
  | ({ type: "state" } & StateRow)
  | ({ type: "lga" } & LgaRow)
  | ({ type: "ward" } & WardRow)
  | ({ type: "polling_unit" } & PuRow);

import { GEO_CONFIG } from "./config/geo";

const FILE_PATH = GEO_CONFIG.NDJSON_PATH;

let _states: StateRow[] = [];
let _lgasByStateId = new Map<string, LgaRow[]>();
let _wardsByLgaId  = new Map<string, WardRow[]>();
let _pusByWardId   = new Map<string, PuRow[]>();
let _statesByName  = new Map<string, StateRow>();
let _loadedOnce = false;

function pushMap<T>(map: Map<string, T[]>, key: string, value: T) {
  const arr = map.get(key);
  if (arr) arr.push(value);
  else map.set(key, [value]);
}

export async function loadNdjson(force = false) {
  if (_loadedOnce && !force) return;

  _states = [];
  _lgasByStateId = new Map();
  _wardsByLgaId  = new Map();
  _pusByWardId   = new Map();
  _statesByName  = new Map();

  if (!fs.existsSync(FILE_PATH)) {
    throw new Error(`Geo NDJSON file not found at: ${FILE_PATH}`);
  }

  const stream = fs.createReadStream(FILE_PATH, { encoding: "utf8" });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let obj: FlatDoc | any;
    try { obj = JSON.parse(trimmed); } catch { continue; }
    if (!obj || typeof obj !== "object" || !obj.type) continue;

    switch (obj.type) {
      case "state": {
        if (!obj.state_id || !obj.state_name) break;
        const s: StateRow = { state_id: String(obj.state_id), state_name: String(obj.state_name) };
        _states.push(s);
        _statesByName.set(s.state_name.toLowerCase(), s);
        break;
      }
      case "lga": {
        if (!obj.lga_id || !obj.lga_name || !obj.state_id) break;
        const l: LgaRow = {
          lga_id: String(obj.lga_id),
          lga_name: String(obj.lga_name),
          state_id: String(obj.state_id),
        };
        pushMap(_lgasByStateId, l.state_id, l);
        break;
      }
      case "ward": {
        if (!obj.ward_id || !obj.ward_name || !obj.lga_id) break;
        const w: WardRow = {
          ward_id: String(obj.ward_id),
          ward_name: String(obj.ward_name),
          lga_id: String(obj.lga_id),
        };
        pushMap(_wardsByLgaId, w.lga_id, w);
        break;
      }
      case "polling_unit": {
        if (!obj.pu_id || !obj.pu_name || !obj.ward_id) break;
        const p: PuRow = {
          pu_id: String(obj.pu_id),
          pu_name: String(obj.pu_name),
          ward_id: String(obj.ward_id),
          address: obj.address ?? null,
          gps_lat: obj.gps_lat ?? null,
          gps_lng: obj.gps_lng ?? null,
        };
        pushMap(_pusByWardId, p.ward_id, p);
        break;
      }
      default: break;
    }
  }

  _states.sort((a, b) => a.state_name.localeCompare(b.state_name));
  for (const [, arr] of _lgasByStateId) arr.sort((a, b) => a.lga_name.localeCompare(b.lga_name));
  for (const [, arr] of _wardsByLgaId)  arr.sort((a, b) => a.ward_name.localeCompare(b.ward_name));
  for (const [, arr] of _pusByWardId)   arr.sort((a, b) => a.pu_name.localeCompare(b.pu_name));

  _loadedOnce = true;
}

export function watchNdjson() {
  if (process.env.NODE_ENV === "production") return;
  try {
    fs.watch(FILE_PATH, { persistent: false }, () => {
      loadNdjson(true).catch(() => void 0);
    });
  } catch { /* ignore */ }
}

export async function getStates(): Promise<StateRow[]> {
  await loadNdjson();
  return _states;
}

export async function getLgasForState(opts: { state_id?: string; state_name?: string }): Promise<LgaRow[]> {
  await loadNdjson();
  if (opts.state_id) {
    const list = _lgasByStateId.get(opts.state_id);
    if (list?.length) return list;
  }
  if (opts.state_name) {
    const s = _statesByName.get(String(opts.state_name).toLowerCase());
    if (s) {
      const list = _lgasByStateId.get(s.state_id);
      if (list?.length) return list;
    }
  }
  return [];
}

export async function getWardsForLga(lga_id: string): Promise<WardRow[]> {
  await loadNdjson();
  return _wardsByLgaId.get(lga_id) ?? [];
}

export async function getPusForWard(ward_id: string): Promise<PuRow[]> {
  await loadNdjson();
  return _pusByWardId.get(ward_id) ?? [];
}
