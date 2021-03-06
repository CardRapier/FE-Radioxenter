import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { fieldToTextField } from "formik-material-ui";

const AutocompleteForm = ({ textFieldProps, ...props }) => {
  const {
    form: { setTouched, setFieldValue },
    onChange,
  } = props;
  const { error, helperText, label, ...field } = fieldToTextField(props);
  const { name } = field;

  return (
    <Autocomplete
      {...props}
      {...field}
      onChange={
        onChange !== undefined
          ? (_, value) => {
              setFieldValue(name, value);
              onChange(value, setFieldValue);
            }
          : (_, value) => setFieldValue(name, value)
      }
      onBlur={() => setTouched({ [name]: true })}
      getOptionSelected={(item, current) => item.value === current.value}
      renderInput={(props) => (
        <TextField
          label={label}
          {...props}
          {...textFieldProps}
          helperText={helperText}
          error={error}
        />
      )}
    />
  );
};

export default AutocompleteForm;
