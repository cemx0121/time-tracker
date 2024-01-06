import { Form, Col } from "react-bootstrap";
import styles from "./RegisterForm.module.css";
function RegisterInputField({
  id,
  label,
  inputType,
  placeholder,
  options,
  isCheckbox,
  value,
  onChange,
  isInvalid,
  errors,
}) {
  let control;

  if (inputType === "select") {
    control = (
      <Form.Select value={value} isInvalid={isInvalid} onChange={onChange}>
        <option disabled value="">
          Select Job Position
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    );
  } else if (isCheckbox) {
    control = (
      <Form.Check
        onChange={onChange}
        checked={value}
        type="checkbox"
        label={label}
        className={styles.checkBoxLabel}
      />
    );
  } else {
    control = (
      <Form.Control
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
        type={inputType}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Form.Group className="mb-3" as={Col} controlId={id}>
      {!isCheckbox && <Form.Label className={styles.label}>{label}</Form.Label>}
      {control}
      {!isCheckbox && (
        <Form.Control.Feedback type="invalid">
          {errors[id]}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

export default RegisterInputField;
