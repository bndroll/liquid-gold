import {
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedTransport } from '../../redux/selectedTransport/selectedTransportSelectors';
import { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoadingButton } from '@mui/lab';
import { TMainInfoProps } from './declarations';
import { TCreateTicketReq } from '../../types/tickets';
import { useDispatch } from 'react-redux';
import { createTicketRequest } from '../../redux/ticket/createTicketSlice';

export const MainInfo: FC<TMainInfoProps> = ({ coords }): JSX.Element => {
  const selectedTransport = useSelector(selectSelectedTransport);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('1');
  const [startDate, setStartDate] = useState(+new Date());
  const [endDate, setEndDate] = useState(+new Date());
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setDescription(event.target.value);
  };

  const handleChangePriority = (event: SelectChangeEvent): void => {
    setPriority(event.target.value);
  };

  const handleChageStartDate = (value: Dayjs): void => {
    setStartDate(value.unix() * 1000);
  };

  const handleChangeEndDate = (value: Dayjs): void => {
    setEndDate(value.unix() * 1000);
  };

  const handleSubmit = (): void => {
    const request: TCreateTicketReq = {
      title,
      description,
      destination: {
        lat: coords[0],
        lon: coords[1],
      },
      priority: Number(priority),
      transport: selectedTransport._id,
      dateStart: startDate,
      dateEnd: endDate,
    };

    setModalOpen(true);
    setTimeout(() => {
      dispatch(createTicketRequest(request));
    }, 3000);
  };

  const handleClose = (): void => {
    setModalOpen(false);
  };

  return (
    <Paper sx={{ padding: '10px', width: '330px' }}>
      <Box
        sx={{
          fontWeight: 'bold',
          fontSize: 'h5.fontSize',
          marginBottom: '10px',
        }}
      >
        Информация о заявке
      </Box>
      <Box
        sx={{
          fontWeight: 'bold',
          fontSize: 'h6.fontSize',
          marginBottom: '10px',
        }}
      >
        Выбранное ТС
      </Box>
      <Box sx={{ marginBottom: '20px' }}>
        <div>
          <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
            Наименование:{' '}
          </Box>
          <span>{selectedTransport.title}</span>
        </div>
        <div>
          <Box sx={{ fontWeight: 'bold', display: 'inline' }}>Номер: </Box>
          <span>{selectedTransport.number}</span>
        </div>
      </Box>
      <TextField
        sx={{ marginBottom: '20px' }}
        fullWidth
        label="Название заявки"
        onChange={handleChangeTitle}
        value={title}
      />
      <TextField
        sx={{ marginBottom: '20px' }}
        id="outlined-multiline-static"
        label="Описание заявки"
        multiline
        rows={2}
        fullWidth
        value={description}
        onChange={handleChangeDescription}
      />
      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel id="priority">Приоритет заявки</InputLabel>
        <Select
          labelId="priority"
          id="demo-simple-select"
          value={priority}
          label="Приоритет заявки"
          onChange={handleChangePriority}
          autoWidth={false}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ marginBottom: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru-RU">
          <DateTimePicker
            inputFormat="DD.MM.YYYY HH:mm"
            label="Дата и время начала заявки"
            value={startDate}
            onChange={handleChageStartDate}
            renderInput={(params: any) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ marginBottom: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru-RU">
          <DateTimePicker
            inputFormat="DD.MM.YYYY HH:mm"
            label="Дата и время конца заявки"
            value={endDate}
            onChange={handleChangeEndDate}
            renderInput={(params: any) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <LoadingButton
        variant="contained"
        fullWidth
        sx={{ color: 'white' }}
        onClick={handleSubmit}
      >
        Отправить
      </LoadingButton>
      <Dialog onClose={handleClose} open={isModalOpen}>
        <DialogTitle>Заявка создана. Отчет сгенериррован</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Понятно</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
