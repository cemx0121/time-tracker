import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SettingsInputField from "./SettingsInputField";
import ApiService from "../../Services/ApiService";

function UserSettingsForm({ closeModal }) {
  const { userData } = useSelector((state) => state.auth);

  const initialState = useMemo(
    () => ({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      jobPosition: userData.jobPosition,
      imagePath: userData.imagePath,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      newPassword: "",
    }),
    [userData]
  );

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSettingsSubmit = (updatedData) => {
    ApiService.updateUserProfile(updatedData)
      .then((response) => {
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== userData[key] && formData[key] !== "") {
        acc[key] = formData[key];
      }
      return acc;
    }, {});
    handleSettingsSubmit(updatedData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SettingsInputField
        id="formName"
        label="Name"
        type="text"
        name="name"
        value={`${formData.firstName} ${formData.lastName}`}
        onChange={handleChange}
        placeholder="Enter name"
        required
        disabled
      />

      <SettingsInputField
        id="formEmail"
        label="E-mail"
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
        required
        disabled
      />

      <SettingsInputField
        id="formJobPosition"
        label="Job Position"
        type="text"
        name="jobPosition"
        value={formData.jobPosition}
        onChange={handleChange}
        placeholder="Enter position"
        required
        disabled
      />

      <SettingsInputField
        id="formImagePath"
        label="Image Path"
        type="text"
        name="imagePath"
        value={formData.imagePath}
        onChange={handleChange}
        placeholder="Enter image path"
        required
      />

      <SettingsInputField
        id="formAddress"
        label="Address"
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Enter address"
        required
        pattern="[A-Za-zæøåÆØÅ0-9\s]+ \d+, \d+ [A-Za-zæøåÆØÅ\s]+"
        invalidMessage="Address must be in the format 'STREETNAME STREETNUMBER, ZIPCODE CITY'."
      />

      <SettingsInputField
        id="formPhoneNumber"
        label="Phone Number"
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Enter phone number"
        required
        minLength={8}
        maxLength={8}
        pattern="\d{8}"
        invalidMessage="Phone Number must be exactly 8 digits (not characters) long."
      />

      <SettingsInputField
        id="formPassword"
        label="Password"
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="Enter new password (optional)"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        invalidMessage="Password must be at least 8 characters long and include a capital letter, a non-capital letter, and a number."
        formtext="Leave blank to keep current password."
      />

      <Button variant="primary" type="submit">
        Update User
      </Button>
    </Form>
  );
}

export default UserSettingsForm;
