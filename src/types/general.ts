import { type ReactNode } from "react";

export interface ProtectedRoute {
  children: ReactNode;
}

export interface Pagination {
  current: number;
  size: number;
}

