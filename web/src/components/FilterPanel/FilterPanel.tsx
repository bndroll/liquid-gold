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
        <span>??????????????</span>
        <Tooltip
          title="?????????? ?????????????????? ?????????????????????????? ?? ???????????????????????? ?? ?????????? ??????????????"
          placement="top"
        >
          <IconButton>
            <InfoOutlinedIcon color="primary" fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <FormControl fullWidth sx={{ marginBottom: '20px', maxWidth: '310px' }}>
        <InputLabel id="type">???????? ??????????????</InputLabel>
        <Select
          labelId="type"
          id="select-type"
          value={typeValue}
          label="???????? ??????????????"
          onChange={handleChangeType}
        >
          <MenuItem value="All">??????</MenuItem>
          {transport.map((item, index) => (
            <MenuItem key={index} value={item.type}>
              {TypeToLabelMap[item.type]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '20px', maxWidth: '310px' }}>
        <InputLabel id="description">????????????????</InputLabel>
        <Select
          labelId="description"
          id="demo-simple-select"
          value={descriptionValue}
          label="????????????????"
          onChange={handleChangeDescription}
          autoWidth={false}
        >
          <MenuItem value="All">??????</MenuItem>
          {transport.map((item, index) => (
            <MenuItem key={index} value={item.description}>
              {item.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '20px', maxWidth: '310px' }}>
        <InputLabel id="category">??????????????????</InputLabel>
        <Select
          labelId="category"
          id="demo-simple-select"
          value={categoryValue}
          label="??????????????????"
          onChange={handleChangeCategory}
          autoWidth={false}
        >
          <MenuItem value="All">??????</MenuItem>
          {transport.map((item, index) => (
            <MenuItem key={index} value={item.category}>
              {item.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '20px', maxWidth: '310px' }}>
        <InputLabel id="availability">??????????????????????</InputLabel>
        <Select
          labelId="availability"
          id="demo-simple-select"
          value={availabilityValue}
          label="????????????????"
          onChange={handleChangeAvailability}
          autoWidth={false}
        >
          <MenuItem value="All">??????</MenuItem>
          <MenuItem value="true">???????????????? ????????????</MenuItem>
          <MenuItem value="false">???????????? ????????????</MenuItem>
        </Select>
      </FormControl>
      <TextField
        sx={{ marginBottom: '20px' }}
        fullWidth
        label="???????????????????????? ????"
        onChange={handleChangeTitle}
        value={titleValue}
      />
      <Box sx={{ marginBottom: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru-RU">
          <DateTimePicker
            inputFormat="DD.MM.YYYY HH:mm"
            label="???????????? ??????????????"
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
            label="?????????? ??????????????"
            value={dateToValue}
            onChange={handleChangeDateTo}
            renderInput={(params: any) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Link onClick={resetAllFilters}>???????????????? ??????????????</Link>
    </Paper>
  );
};
