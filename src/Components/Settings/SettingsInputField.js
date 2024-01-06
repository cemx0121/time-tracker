import Form from "react-bootstrap/Form";

function SettingsInputField({
  id,
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
  invalidMessage,
  disabled = false,
  formtext = "",
  maxLength,
  minLength,
}) {
  const handleInvalid = (e) => {
    e.target.setCustomValidity(invalidMessage || "");
  };

  const handleInput = (e) => {
    e.target.setCustomValidity("");
  };
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        onInvalid={handleInvalid}
        onInput={handleInput}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
      />
      {formtext && <Form.Text className="text-muted">{formtext}</Form.Text>}
    </Form.Group>
  );
}

export default SettingsInputField;
