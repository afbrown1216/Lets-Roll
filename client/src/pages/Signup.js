import "./Signup.css";
import DatePicker from "../components/DatePicker";
import TextInput from "../components/TextInput";
import CheckboxesGroup from "../components/CheckboxesGroup";
import Button from "@material-ui/core/Button";
import { React, useState } from "react";
import API from "../Utils/API";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [skills, setSkills] = useState({
    crossover: false,
    crazyLegs: false,
    dribbling: false,
    transitions: false,
    grapevine: false,
    shootTheDuck: false,
    waltzJump: false,
    mohawkTurn: false,
    heelToeSpins: false,
    spinJump: false,
  });

  const handleChange = (event) => {
    setSkills({ ...skills, [event.target.name]: event.target.checked });
  };
  const {
    crossover,
    crazyLegs,
    dribbling,
    transitions,
    grapevine,
    shootTheDuck,
    waltzJump,
    mohawkTurn,
    heelToeSpins,
    spinJump,
  } = skills;
  const error =
    [
      crossover,
      crazyLegs,
      dribbling,
      transitions,
      grapevine,
      shootTheDuck,
      waltzJump,
      mohawkTurn,
      heelToeSpins,
      spinJump,
    ].filter((v) => v).length !== 2;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date, "Date");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Here");

    API.signupUser({
      username,
      email,
      password,
      selectedDate,
      skills,
    })
      .then((res) => {
        console.log("signup" + res.data);
      })
      .catch((err) => {
        return err;
      });
  };

  const onChangeUser = (e) => {
    let value = e.target.value;

    if (e.target.name === "username") {
      setUsername(value);
    } else if (e.target.name === "password") {
      setPassword(value);
    } else if (e.target.name === "email") {
      setEmail(value);
    }
  };

  return (
    <>
      <div className="page-wrapper-with-nav">
        <div id="signup-wrapper">
          <h1>Sign up below to get rollin'.</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Enter a new username"
              name="username"
              value={username}
              onChange={onChangeUser}
            />
            <TextInput
              label="Enter a new password"
              name="password"
              value={password}
              onChange={onChangeUser}
            />
            <br />
            <label for="skateDate">When did you start skating?</label>
            <DatePicker
              label="When did you start skating?"
              name="skateDate"
              handleDateChange={handleDateChange}
              selectedDate={selectedDate}
            />
            <br />
            <br />
            <p>Your skills:</p>
            <br />
            <CheckboxesGroup name={skills} handleChange={handleChange} />

            <p>Where do you skate?</p>
            <TextInput
              label="Your Location"
              name="location"
              value={location}
              onChange={onChangeUser}
            />
            <br />
            <Button type="submit" size="large" variant="contained">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signup;
