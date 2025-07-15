import { type ReactNode } from "react";
import type { TablePaginationConfig } from "antd";

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ProtectedRoute {
  children: ReactNode;
}

export interface PaginationConfig {
  pagination: TablePaginationConfig;
  setParams: (params: PaginationParams) => void;
}
