// T is a generic type for the data items (e.g., User, Product)
// V is a generic type for the value of the cell

import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type DefaultEntity = Record<string, any>;

export interface ColumnConfiguration<T extends DefaultEntity> {
  accessorKey: Extract<keyof T, string> | string; // Key to access data in the item object
  header: string; // Header text for the column
  cell: (props: { row: T }) => ReactNode; // The cell renderer function
  enableHiding?: boolean; // Optional: defaults to true
}

export type PaginationInfo = {
  pageIndex: number; // 0-based index of the current page
  pageSize: number; // Number of items per page
  totalCount: number; // Total number of items in the dataset
};

export interface EntityTableProps<T extends DefaultEntity> {
  data: T[];
  columns: ColumnConfiguration<T>[];
  pagination: PaginationInfo;
  onPaginationChange: Dispatch<SetStateAction<PaginationInfo>>;

  // Slot-based props for customization
  topRightActionSlot?: ReactNode;
  filtersSlot?: ReactNode;
}

export type ColumnVisibilityState = {
  [accessorKey: string]: boolean;
};
