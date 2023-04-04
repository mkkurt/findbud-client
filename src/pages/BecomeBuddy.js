import { useDispatch } from "react-redux";
import ExtraFormInfo from "../features/auth/ExtraFormInfo";
import { useBecomeBuddyMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { useState } from "react";

export const BecomeBuddy = () => {
  const [becomeBuddy, { isLoading }] = useBecomeBuddyMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [img, setImg] = useState(null);
  const [bio, setBio] = useState("");

  const [
    handleFirstNameInput,
    handleLastNameInput,
    handleDobInput,
    handleAddressInput,
    handleCityInput,
    handleCountryInput,
    handleStateInput,
    handlePostalCodeInput,
    handleBusinessName,
    handleImg,
    handleBio,
  ] = [
    (e) => setFirstName(e.target.value),
    (e) => setLastName(e.target.value),
    (e) => setDob(e.target.value),
    (e) => setAddress(e.target.value),
    (e) => setCity(e.target.value),
    (e) => setCountry(e.target.value),
    (e) => setState(e.target.value),
    (e) => setPostalCode(e.target.value),
    (e) => setBusinessName(e.target.value),
    (e) => setImg(e.target.files[0]),
    (e) => setBio(e.target.value),
  ];

  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("postalCode", postalCode);
    formData.append("businessName", businessName);
    formData.append("type", "company");
    formData.append("profilePic", img);
    formData.append("bio", bio);
    //encode image file to base64 string
    try {
      const userData = await becomeBuddy(formData).unwrap();
      dispatch(setCredentials(userData));
      console.log("userdata: ", userData);
      setMsg("You are now a buddy!");
      return;
    } catch (err) {
      if (err.data?.message) {
        setErrMsg(err.data.message);
      } else if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Signup Failed");
      }
    }
  };

  return (
    <div>
      <h2>Become a Buddy</h2>
      <form onSubmit={handleSubmit}>
        <ExtraFormInfo
          firstName={firstName}
          lastName={lastName}
          dob={dob}
          address={address}
          city={city}
          country={country}
          state={state}
          postalCode={postalCode}
          businessName={businessName}
          handleFirstNameInput={handleFirstNameInput}
          handleLastNameInput={handleLastNameInput}
          handleDobInput={handleDobInput}
          handleAddressInput={handleAddressInput}
          handleCityInput={handleCityInput}
          handleCountryInput={handleCountryInput}
          handleStateInput={handleStateInput}
          handlePostalCodeInput={handlePostalCodeInput}
          handleBusinessName={handleBusinessName}
        />
        <label htmlFor="img">Upload a profile picture</label>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/png, image/jpeg"
          onChange={handleImg}
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows="4"
          cols="50"
          onChange={handleBio}
        ></textarea>
        <button type="submit" disabled={isLoading}>
          Become a Buddy
        </button>
      </form>
      {errMsg && <p>{errMsg}</p>}
      {msg && <p>{msg}</p>}
    </div>
  );
};
