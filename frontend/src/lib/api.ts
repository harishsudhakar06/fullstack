import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const api = axios.create({ baseURL: BASE });

export interface College {
  id: number;
  name: string;
  location: string;
  state: string;
  fees_min: number;
  fees_max: number;
  rating: number;
  courses: string[];
  placement_avg: number;
  placement_top: number;
  placement_pct: number;
  top_recruiters: string[];
  students: number;
  established: number;
  type: string;
  exam: string;
  cutoff_rank: number;
  description: string;
}

export interface CollegesResponse {
  total: number;
  page: number;
  limit: number;
  colleges: College[];
}

export const getColleges = (params: Record<string, string | number>) =>
  api.get<CollegesResponse>("/api/colleges", { params });

export const getCollege = (id: number | string) =>
  api.get<College>(`/api/colleges/${id}`);

export const compareColleges = (ids: number[]) =>
  api.get<College[]>(`/api/compare?ids=${ids.join(",")}`);

export const predictColleges = (exam: string, rank: number) =>
  api.post<{ message: string; colleges: College[] }>("/api/predict", {
    exam,
    rank,
  });

export const formatFees = (min: number, max: number) => {
  const fmt = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    return `₹${(n / 1000).toFixed(0)}K`;
  };
  return `${fmt(min)} – ${fmt(max)}/yr`;
};

export const formatPackage = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n}`;
};