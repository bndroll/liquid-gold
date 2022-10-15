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
import { TFilter, TFilterPanelProps, TypeToLabelMap } from './declarations';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const FilterPanel: FC<TFilterPanelProps> = ({
  transport,
  onFilterChange,
}): JSX.Element => {
  const [typeValue, setTypeValue] = useState('All');
  const [descriptionValue, setDescriptionValue] = useState('All');
  const [categoryValue, setCategoryValue] = useState('All');
  const [titleValue, setTitleValue] = useState('');
  const [dateFromValue, setDateFromValue] = useState(+new Date());
  const [dateToValue, setDateToValue] = useState(+new Date());
  const [availabilityValue, setAvailabilityValue] = useState('All');

  const [filter, setFilter] = useState<TFilter>({
    filterByCategory: 'All',
    filterByDescription: 'All',
    filterByTitile: '',
    filterByType: 'All',
    filterByAvailability: 'All',
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

  const handleChageDateFrom = (value: Dayjs): void => {
    setDateFromValue(value.unix() * 1000);
  };

  const handleChangeDateTo = (value: Dayjs): void => {
    setDateToValue(value.unix() * 1000);
  };

  const handleChangeAvailability = (event: SelectChangeEvent): void => {
    setAvailabilityValue(event.target.value);
  };

  useEffect(() => {
    const filter: TFilter = {
      filterByCategory: categoryValue,
      filterByDescription: descriptionValue,
      filterByTitile: titleValue,
      filterByType: typeValue,
      filterByAvailability: availabilityValue,
    };

    setFilter(filter);
  }, [
    typeValue,
    descriptionValue,
    categoryValue,
    titleValue,
    availabilityValue,
  ]);

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
    <Paper sx={{ padding: '10px', width: '330px' }}>
      <Box
        sx={{
          fontWeight: 'bold',
          fontSize: 'h5.fontSize',
          marginBottom: '30px',
        }}
      >
        <span>Фильтры</span>
        <Tooltip
          title="Карта обновится автоматически в соответствии с вашим выбором"
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
      <FormControl fullWidth sx={{ marginBottom: '20px', maxWidth: '310px' }}>
        <InputLabel id="availability">Доступность</InputLabel>
        <Select
          labelId="availability"
          id="demo-simple-select"
          value={availabilityValue}
          label="Описание"
          onChange={handleChangeAvailability}
          autoWidth={false}
        >
          <MenuItem value="All">Все</MenuItem>
          <MenuItem value="true">Свободны сейчас</MenuItem>
          <MenuItem value="false">Заняты сейчас</MenuItem>
        </Select>
      </FormControl>
      <TextField
        sx={{ marginBottom: '20px' }}
        fullWidth
        label="Наименование ТС"
        onChange={handleChangeTitle}
        value={titleValue}
      />
      <Box sx={{ marginBottom: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru-RU">
          <DateTimePicker
            inputFormat="DD.MM.YYYY HH:mm"
            label="Начало периода"
            value={dateFromValue}
            onChange={handleChageDateFrom}
            renderInput={(params: any) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ marginBottom: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru-RU">
          <DateTimePicker
            inputFormat="DD.MM.YYYY HH:mm"
            label="Конец периода"
            value={dateToValue}
            onChange={handleChangeDateTo}
            renderInput={(params: any) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Link onClick={resetAllFilters}>Сбросить фильтры</Link>
    </Paper>
  );
};
