export interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  radius: number;
  label: string;
}

export interface SafetyAPIResponse {
  meta: {
    at: string;
    center: { lat: number; lng: number };
    radius_m: number;
    tz: string;
  };
  summary: {
    level: number;
    label: string;
    safety_score: number;
    analysis: {
      safe_places: number;
      warning_zones: number;
      lighting_score: number;
      police_distance_m: number;
      last_incident_days: number;
    };
  };
  places: SafetyPlace[];
}

export interface SafetyPlace {
  safety: number;
  type: 'store' | 'police' | 'cctv' | 'metro';
  name: string;
  location: { lat: number; lng: number };
  distance_m: number;
  open_now: boolean;
  phone?: string;
  hours?: {
    tz: string;
    regular: Array<{
      dow: string;
      open: string;
      close: string;
    }>;
    note?: string;
  };
  signals?: string[];
}
