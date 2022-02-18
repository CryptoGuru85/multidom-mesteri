import { FieldInputProps, FormikConfig, FormikValues, useFormik } from "formik";

interface FormikValidationConfig<Values> extends FormikConfig<Values> {
  getFieldProps: (
    nameOrOptions: any,
    noValidate?: boolean
  ) => FieldInputProps<any>;
}

function useFormikValidation<Values extends FormikValues = FormikValues>(
  value: FormikConfig<Values>
) {
  const {
    getFieldProps: _getFieldProps,
    touched,
    errors,
    ...rest
  } = useFormik(value);

  const getFieldProps = (
    nameOrOptions: string,
    noValidate = false
  ):
    | ReturnType<typeof _getFieldProps>
    | ({
        error: boolean;
        helperText: any;
      } & ReturnType<typeof _getFieldProps>) => {
    const props = _getFieldProps(nameOrOptions) || {};

    if (noValidate) return props;

    const error = !!errors && !!(touched[props.name] && !!errors[props.name]);
    const helperText = error ? errors[props.name] : null;

    return { ...props, error, helperText };
  };

  return { ...rest, errors, touched, getFieldProps };
}

export default useFormikValidation;
