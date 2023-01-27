const ExtraFormInfo = (props) => {
  const {
    firstName,
    lastName,
    address,
    city,
    country,
    state,
    postalCode,
    businessName,
    dob,
    handleFirstNameInput,
    handleLastNameInput,
    handleAddressInput,
    handleCityInput,
    handleCountryInput,
    handleStateInput,
    handlePostalCodeInput,
    handleBusinessName,
    handleDobInput,
  } = props;
  return (
    // ask these extra info if user is a buddy
    //firstName
    //lastName
    //address
    //city
    //country
    //state
    //postalCode
    //businessName
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={handleFirstNameInput}
        required
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={handleLastNameInput}
        required
      />
      <label htmlFor="dob">Date of Birth:</label>
      <input
        type="date"
        id="dob"
        value={dob}
        onChange={handleDobInput}
        required
      />
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={handleAddressInput}
        required
      />
      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={handleCityInput}
        required
      />
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        value={country}
        onChange={handleCountryInput}
        required
      />
      <label htmlFor="state">State:</label>
      <input
        type="text"
        id="state"
        value={state}
        onChange={handleStateInput}
        required
      />
      <label htmlFor="postalCode">Postal Code:</label>
      <input
        type="text"
        id="postalCode"
        value={postalCode}
        onChange={handlePostalCodeInput}
        required
      />
      <label htmlFor="businessName">Business Name:</label>
      <input
        type="text"
        id="businessName"
        value={businessName}
        onChange={handleBusinessName}
        required
      />
    </div>
  );
};

export default ExtraFormInfo;
