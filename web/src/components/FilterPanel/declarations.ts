import { TTransport, TTransportType } from '../../types';

export type TFilterPanelProps = {
  transport: TTransport[];
  onFilterChange: (filter: TFilter) => void;
};

export type TFilter = {
  filterByType: string;
  filterByDescription: string;
  filterByCategory: string;
  filterByTitile: string;
  filterByAvailability: string;
};

export const TypeToLabelMap = {
  [TTransportType.Platforms]: 'Парк автовышек',
  [TTransportType.Cranes]: 'Парк кранов',
  [TTransportType.Loader]: 'Парк погрузчиков',
};
