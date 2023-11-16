import { Checkbox, DatePicker, Radio, Select } from "antd";
import { useField } from "formik";
import moment from "moment";

export const CustomInput = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
        <span className="text-danger ms-1 font-size-15">{required}</span>
      </label>
      <input
        className={
          meta.touched && meta.error
            ? "form-control input-error"
            : "form-control"
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const CustomInputGroup = ({ iconclick, label, icon, required, btnColor, ...props }) => {
  const [field, meta] = useField(props);
  console.log("field", field);
  return (
    <>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
        <span className="text-danger ms-1 font-size-15">{required}</span>
      </label>
      <div className="input-group">
        <input
          className={
            meta.touched && meta.error
              ? "form-control input-error"
              : "form-control"
          }
          {...field}
          {...props}
        />
        <button className={btnColor} type="button" onClick={iconclick}>
          <i className={icon} />
        </button>
      </div>
      {meta.touched && meta.error ? (
        <div className="errorMsg">{meta.error}</div>
      ) : null}
    </>
  );
};

export const CustomInputGroupIcon = ({
  label,
  iconName,
  iconText,
  required,
  ...props
}) => {
  const [field, meta] = useField(props);
  // console.log("field", field);
  return (
    <>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
        <span className="text-danger ms-1 font-size-15">{required}</span>
      </label>
      <div className="input-group">
        <input
          className={
            meta.touched && meta.error
              ? "form-control input-error"
              : "form-control"
          }
          {...field}
          {...props}
        />
        {/* input-group-text */}
        {/* <span className={iconName}>{iconText}</span> */}
      </div>
      {meta.touched && meta.error ? (
        <div className="errorMsg">{meta.error}</div>
      ) : null}
    </>
  );
};

export const CustomSelect = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  // console.log("field", field);
  return (
    <>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
        <span className="text-danger ms-1 font-size-15">{required}</span>
      </label>
      <Select
        className={
          meta.touched && meta.error
            ? "ant-selectbox input-error"
            : "ant-selectbox"
        }

        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const CustomAddonSelect = ({
  label,
  btnClick,
  btnClass,
  btnName,
  required,
  ...props
}) => {
  const [field, meta] = useField(props);
  console.log("field", field);
  return (
    <>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
        <span className="text-danger ms-1 font-size-15">{required}</span>
      </label>
      <div style={{ position: "relative" }}>
        <Select
          className={
            meta.touched && meta.error
              ? "ant-selectbox br-0 custom-select-box input-error"
              : "ant-selectbox br-0 custom-select-box"
          }
          {...field}
          {...props}
        />
        <button onClick={btnClick} className={btnClass} type="button">
          {btnName}
        </button>
      </div>
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const CustomCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  console.log("fiedl", field);
  return (
    <>
      <div className="mt-2">
        <Checkbox {...field} {...props}>
          {children}
        </Checkbox>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export const CustomRadio = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  console.log("fiedl", field);
  return (
    <>
      <label className="form-label">
        {label}
        <span className="text-danger ms-1 font-size-15">{required}</span>
      </label>
      <div className="mt-2">
        <Radio.Group {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export const CustomTextarea = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
        <span className="text-danger ms-1 font-size-15">{required}</span>
      </label>
      <textarea style={{ resize: "none" }}
        rows={3}
        className={
          meta.touched && meta.error
            ? "form-control input-error"
            : "form-control"
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const CustomInputGroupTwoIcon = ({
  label,
  firstIconName,
  secondIconName,
  iconName,
  firstIconText,
  secondIconText,
  required,
  ...props
}) => {
  const [field, meta] = useField(props);
  // console.log("field", field);
  return (
    <>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
        <span className="text-danger ms-1 font-size-15">{required}</span>
      </label>
      <div className="input-group">
        {/* input-group-text */}
        <span className={firstIconName}>{firstIconText}</span>
        <input
          className={
            meta.touched && meta.error
              ? "form-control input-error"
              : "form-control"
          }
          {...field}
          {...props}
        />
        {/* input-group-text */}
        {/* <span className={secondIconName}>{secondIconText}</span> */}
      </div>
      {meta.touched && meta.error ? (
        <div className="errorMsg">{meta.error}</div>
      ) : null}
    </>
  );
};

export const EDIDateFilter = ({ label, required, utcDate, ...props }) => {
  const [field, meta] = useField(props);

  // const disabledDate = current => {
  //   const pastDays = moment().subtract(pastDaysNumber, 'days').startOf('day');
  //   const isPast = current && (current < pastDays || current > moment().endOf('day'));

  //   return isPast;
  // };
  const disabledDate = (current) => {
    const today = moment().endOf('day')

    // Allow dates from the UTC date up to the current date (including today)
    return current && (current < utcDate || current > today);
  };


  return (
    <>
      <label className="form-label">{label}</label>
      <span className="text-danger ms-1 font-size-15">{required}</span>
      <DatePicker
        style={{ width: '100%', height: "38px", borderRadius: "0.25rem" }}
        {...field}
        {...props}
        disabledDate={disabledDate}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const CustomDateFilter = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  // const disabledDate = current => {
  //   // Disable past dates
  //   const isPast = current && current < moment().startOf('day');
  //   // Disable dates beyond 15 days in the future
  //   const isFuture = current && current > moment().add(15, 'days').endOf('day');
  //   return isPast || isFuture;
  // };
  return (
    <>
      <label className="form-label">{label}</label>
      <span className="text-danger ms-1 font-size-15">{required}</span>
      <DatePicker
        style={{ width: '100%', height: "38px", borderRadius: "0.25rem" }}
        {...field}
        {...props}
      // disabledDate={disabledDate}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const CustomDateFilterWithDisable = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  const disabledDate = current => {
    // Disable past dates
    const isPast = current && current < moment().startOf('day');
    // Disable dates beyond 15 days in the future
    const isFuture = current && current > moment().add(15, 'days').endOf('day');
    return isPast || isFuture;
  };
  return (
    <>
      <label className="form-label">{label}</label>
      <span className="text-danger ms-1 font-size-15">{required}</span>
      <DatePicker
        style={{ width: '100%', height: "38px", borderRadius: "0.25rem" }}
        {...field}
        {...props}
        disabledDate={disabledDate}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

// For QC Update
export const CustomUpdateInput = ({ required, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        className={
          meta.touched && meta.error
            ? "form-control w-75 input-error"
            : "form-control w-75"
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const CustomUpdateSelect = ({ required, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Select
        className={
          meta.touched && meta.error
            ? "ant-selectbox input-error w-75"
            : "ant-selectbox w-75"
        }

        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const CustomDateDisableYears = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  const disabledDate = (current) => {
    // Disable future dates
    if (current && current > moment().endOf('day')) {
      return true;
    }
    // Disable dates less than 18 years ago
    if (current && current > moment().subtract(18, 'years').endOf('day')) {
      return true;
    }
    return false;
  }
  return (
    <>
      <label className="form-label">{label}</label>
      <span className="text-danger ms-1 font-size-15">{required}</span>
      <DatePicker
        style={{ width: '100%', height: "38px", borderRadius: "0.25rem" }}
        {...field}
        {...props}
        disabledDate={disabledDate}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const CustomFileInput = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
        <span className="text-danger ms-1 font-size-15">{required}</span>
      </label>
      <input
        type="file"
        className={
          meta.touched && meta.error
            ? "form-control input-error"
            : "form-control"
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="errorMsg">
          <i className="bi bi-exclamation-square me-1" />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};