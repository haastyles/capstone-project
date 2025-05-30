import { at } from 'lodash';
import { useField } from 'formik';
import { TextField } from '@mui/material';

function InputField(props) {
  const { ...rest } = props;
  const [field, meta, helpers] = useField(props);

  const phoneDigits = /[^0-9]+/g;

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  const formatPhone = (e) => {
    const userInput = e.target.value.replaceAll(phoneDigits, "");
    const first = userInput.slice(0, 3);
    const second = userInput.slice(3, 6);
    const third = userInput.slice(6, 10);
    let formatted = "";

    if (third.length > 0) {
        formatted = "(" + first + ") " + second + "-" + third;
    } else if (second.length > 0) {
        formatted = "(" + first + ") " + second;
    } else if (first.length > 0) {
        formatted = "(" + first;
    }

    return formatted;
  }

  return (
    <TextField
      {...field}
      {...rest}
      type="text"
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      value={meta.value}
      onChange={(e) => {
        if (field.name == 'phone') {
          helpers.setValue(formatPhone(e));
        } else {
          helpers.setValue(e.target.value);
        }
      }
      }
    />
  );
}

export default InputField;