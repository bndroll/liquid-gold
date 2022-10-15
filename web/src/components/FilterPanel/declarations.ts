import { TTransport } from '../../types';

export type TFilterPanelProps = {
  transport: TTransport[];
  onFilterChange: (filter: TFilter) => void;
};

export type TFilter = {
  filterByType: string;
  filterByDescription: string;
  filterByCategory: string;
  filterByTitile: string;
};
