import styles from "./RegisterForm.module.css";
import { Form, Row, Button } from "react-bootstrap";
import RegisterInputField from "./RegisterInputField";
import SectionTitle from "../UI/SectionTitle";
import useFetchJobPositions from "../../Hooks/UseFetchJobPositions";
import { useState } from "react";
import { validateRegisterFormData } from "../../Utils/formValidation-utils";
import ApiService from "../../Services/ApiService";
import { resetInputFields } from "../../Utils/registerForm-utils";

function RegisterForm() {
  const { jobPositions, loading } = useFetchJobPositions();
  const [form, setForm] = useState(resetInputFields());
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    const newValue = field === "admin" ? !form.admin : value;

    setForm({
      ...form,
      [field]: newValue,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formErrors = validateRegisterFormData(form);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const formattedFormData = {
        email: form.email,
        password: form.password,
        jobPositionId: Number(form.jobPositionId),
        firstName: form.firstName,
        lastName: form.lastName,
        address: `${form.streetName} ${form.streetNo}, ${form.postalCode} ${form.city}`,
        phoneNumber: form.phoneNumber,
        hiredDate: new Date(form.hiredDate),
        imagePath: form.imagePath,
        roleId: form.admin ? 1 : 2,
      };
      ApiService.register(formattedFormData)
        .then((res) => setForm(resetInputFields()))
        .catch((err) => console.log(err));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <SectionTitle
        title="Create a new user login"
        subTitle="     Fill out the form with valid input in order to create a new user-login
        for the employee."
      />
      <Form className={styles.form} onSubmit={submitHandler}>
        <Row className="mb-3">
          <RegisterInputField
            id="firstName"
            label="First name*"
            inputType="text"
            placeholder="Enter first name"
            value={form.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            isInvalid={!!errors.firstName}
            errors={errors}
          />
          <RegisterInputField
            id="lastName"
            label="Last name*"
            inputType="text"
            placeholder="Enter last name"
            value={form.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            isInvalid={!!errors.lastName}
            errors={errors}
          />
        </Row>
        <Row className="mb-3">
          <RegisterInputField
            id="streetName"
            label="Street name*"
            inputType="text"
            placeholder="Street name"
            value={form.streetName}
            onChange={(e) => setField("streetName", e.target.value)}
            isInvalid={!!errors.streetName}
            errors={errors}
          />
          <RegisterInputField
            id="streetNo"
            label="Street No*"
            inputType="number"
            placeholder=""
            value={form.streetNo}
            onChange={(e) => setField("streetNo", e.target.value)}
            isInvalid={!!errors.streetNo}
            errors={errors}
          />
          <RegisterInputField
            id="postalCode"
            label="Postal Code*"
            inputType="number"
            placeholder="1234"
            value={form.postalCode}
            onChange={(e) => setField("postalCode", e.target.value)}
            isInvalid={!!errors.postalCode}
            errors={errors}
          />
          <RegisterInputField
            id="city"
            label="City*"
            inputType="text"
            placeholder="Copenhagen"
            value={form.city}
            onChange={(e) => setField("city", e.target.value)}
            isInvalid={!!errors.city}
            errors={errors}
          />
        </Row>

        <Row className="mb-3">
          <RegisterInputField
            id="imagePath"
            label="Profile Picture Path*"
            inputType="text"
            placeholder="Enter path to profile picture"
            value={form.imagePath}
            onChange={(e) => setField("imagePath", e.target.value)}
            isInvalid={!!errors.imagePath}
            errors={errors}
          />
          <RegisterInputField
            id="hiredDate"
            label="Hired Date*"
            inputType="date"
            value={form.hiredDate}
            onChange={(e) => setField("hiredDate", e.target.value)}
            isInvalid={!!errors.hiredDate}
            errors={errors}
          />

          <RegisterInputField
            id="jobPositionId"
            label="Job Position*"
            inputType="select"
            options={jobPositions.map((jp) => ({
              value: jp.jobPositionId,
              label: jp.jobPosition,
            }))}
            value={form.jobPositionId}
            onChange={(e) => setField("jobPositionId", e.target.value)}
            isInvalid={!!errors.jobPositionId}
            errors={errors}
          />
        </Row>
        <Row className="mb-3">
          <RegisterInputField
            id="email"
            label="Email*"
            inputType="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            isInvalid={!!errors.email}
            errors={errors}
          />
          <RegisterInputField
            id="phoneNumber"
            label="Phone Number*"
            inputType="number"
            placeholder="12345678"
            value={form.phoneNumber}
            onChange={(e) => setField("phoneNumber", e.target.value)}
            isInvalid={!!errors.phoneNumber}
            errors={errors}
          />
          <RegisterInputField
            id="password"
            label="Password*"
            inputType="password"
            placeholder="Choose password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            isInvalid={!!errors.password}
            errors={errors}
          />
        </Row>

        <RegisterInputField
          id="adminCheckbox"
          label="User should be admin?"
          isCheckbox={true}
          value={form.admin}
          onChange={(e) => setField("admin", e.target.checked)}
        />

        <Button className={styles.submitBtn} type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default RegisterForm;
