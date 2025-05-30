import { at } from 'lodash';
import { useField } from 'formik';
import { TextField } from '@mui/material';

export default function CountField(props) {
  const { value, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [error] = at(meta, 'error');
    if (error) {
      return error;
    }
  }

  return (
    <TextField
      {...field}
      {...rest}
      error={meta.error}
      helperText={_renderHelperText()}
      value={value}
    />
  );
}