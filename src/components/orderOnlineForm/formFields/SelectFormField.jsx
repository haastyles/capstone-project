import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';

function SelectField(props) {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  const [dropdownValue, setDropdownValue] = useState(10);
  const [toggleValue, setToggleValue] = useState(10);

  const handleChange = (e) => {
    setDropdownValue(e.target.value);
    setToggleValue(e.target.value);
  };

  const toggleChange = (e, nextToggle) => {
    setToggleValue(nextToggle);
  };

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <>
      <FormControl {...rest} error={isError}>
        <Select {...field} onChange={handleChange} value={dropdownValue}>
          {data.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {_renderHelperText()}
      </FormControl>
      <ToggleButtonGroup
        value={toggleValue}
        exclusive
        onChange={toggleChange}
      >
        <ToggleButton value={dropdownValue}>{`${dropdownValue}:00`}</ToggleButton>
        <ToggleButton value={dropdownValue+0.5}>{`${dropdownValue}:30`}</ToggleButton>
      </ToggleButtonGroup>
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