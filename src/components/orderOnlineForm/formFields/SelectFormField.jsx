import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';

function SelectField(props) {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  
  
  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <>
      <FormControl {...rest} error={isError}>
        <Select
          {...field}
          onChange={props.handleChange}
          value={props.dropdownValue ? props.dropdownValue : null}>
          {data.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {_renderHelperText()}
      </FormControl>
    </>
    
  );
}

SelectField.defaultProps = {
  data: []
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired
};

export default SelectField;