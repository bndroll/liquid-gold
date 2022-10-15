import {
  Paper,
  Box,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Link,
} from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { TFilter, TFilterPanelProps } from './declarations';
import { TTransportType } from '../../types';
import { debounce } from 'lodash';

const TypeToLabelMap = {
  [TTransportType.Platforms]: 'Парк автовышек',
  [TTransportType.Cranes]: 'Парк кранов',
  [TTransportType.Loader]: 'Парк погрузчиков',
};

export const FilterPanel: FC<TFilterPanelProps> = ({
  transport,
  onFilterChange,
}): JSX.Element => {
  const [typeValue, setTypeValue] = useState('All');
  const [descriptionValue, setDescriptionValue] = useState('All');
  const [categoryValue, setCategoryValue] = useState('All');
  const [titleValue, setTitleValue] = useState('');
  const [filter, setFilter] = useState<TFilter>({
    filterByCategory: 'All',
    filterByDescription: 'All',
    filterByTitile: '',
    filterByType: 'All',
  });

  const handleChangeType = (event: SelectChangeEvent): void => {
    setTypeValue(event.target.value);
  };

  const handleChangeDescription = (event: SelectChangeEvent): void => {
    setDescriptionValue(event.target.value);
  };

  const handleChangeCategory = (event: SelectChangeEvent): void => {
    setCategoryValue(event.target.value);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitleValue(event.target.value);
  };

  useEffect(() => {
    const filter: TFilter = {
      filterByCategory: categoryValue,
      filterByDescription: descriptionValue,
      filterByTitile: titleValue,
      filterByType: typeValue,
    };

    setFilter(filter);
  }, [typeValue, descriptionValue, categoryValue, titleValue]);

  useEffect(() => {
    onFilterChange(filter);
  }, [filter]);

  const resetAllFilters = (): void => {
    setCategoryValue('All');
    setDescriptionValue('All');
    setTitleValue('');
    setTypeValue('All');
  };

  return (
    <Paper sx={{ padding: '10px', width: '100%' }}>
      <Box
        sx={{
          fontWeight: 'bold',
          fontSize: 'h5.fontSize',
          marginBottom: '30px',
        }}
      >
        <span>Фильтры</span>
        <Tooltip
          title="Карта обновится автоматически в соответсвии с вашим выбором"
          placement="top"
        >
          <IconButton>
            <InfoOutlinedIcon color="primary" fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <FormControl fullWidth sx={{ marginBottom: '20px', maxWidth: '310px' }}>
        <InputLabel id="type">Парк техники</InputLabel>
        <Select
          labelId="type"
          id="select-type"
          value={typeValue}
          label="Парк техники"
          onChange={handleChangeType}
        >
          <MenuItem value="All">Все</MenuItem>
          {transport.map((item, index) => (
            <MenuItem key={index} value={item.type}>
              {TypeToLabelMap[item.type]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '20px', maxWidth: '310px' }}>
        <InputLabel id="description">Описание</InputLabel>
        <Select
          labelId="description"
          id="demo-simple-select"
          value={descriptionValue}
          label="Описание"
          onChange={handleChangeDescription}
          autoWidth={false}
        >
          <MenuItem value="All">Все</MenuItem>
          {transport.map((item, index) => (
            <MenuItem key={index} value={item.description}>
              {item.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '20px', maxWidth: '310px' }}>
        <InputLabel id="category">Категория</InputLabel>
        <Select
          labelId="category"
          id="demo-simple-select"
          value={categoryValue}
          label="Категория"
          onChange={handleChangeCategory}
          autoWidth={false}
        >
          <MenuItem value="All">Все</MenuItem>
          {transport.map((item, index) => (
            <MenuItem key={index} value={item.category}>
              {item.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        sx={{ marginBottom: '20px' }}
        fullWidth
        label="Наименование ТС"
        onChange={handleChangeTitle}
        value={titleValue}
      />
      <Link onClick={resetAllFilters}>Сбросить фильтры</Link>
    </Paper>
  );
};
