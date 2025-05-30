import { useState } from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function DatePickerValue(props) {
  const { ...rest } = props;
  const [field, meta, helpers] = useField(props);
  const now = new dayjs();
  const [value, setValue] = useState(now);

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}>
      <DatePicker
        {...rest}
        value={value}
        onChange={(newValue) => setValue(newValue)}/>
    </LocalizationProvider>
  );
}

export default DatePickerValue;