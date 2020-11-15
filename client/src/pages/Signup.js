import "./Pages.css";
import DatePicker from "../components/DatePicker/DatePicker";
import TextInput from "../components/InputFields/TextInput";
import CheckboxesGroup from "../components/CheckboxesGroup/CheckboxesGroup";
import { Button, FormGroup } from "@material-ui/core";
import Snackbar from "../components/SnackBar/SnackBar";
import { React, useState, useContext } from "react";
import API from "../Utils/API";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setJwt } = useContext(AuthContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonVal, setButtonVal] = useState("");

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

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
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

    if (username === "") {
      setOpen(true);
      setMessage("Invalid Username.");
      setButtonVal("Try Again");
    } else if (email === "") {
      setOpen(true);
      setMessage("Invalid Email.");
      setButtonVal("Try Again");
    } else if (password === "") {
      setOpen(true);
      setMessage("Invalid Password.");
      setButtonVal("Try Again");
    } else {
      setOpen(true);
      setMessage("Login successful");
      setButtonVal("OK");

      API.signupUser({
        username,
        email,
        password,
        skateSince: selectedDate,
        location,
        skills,
      })
        .then((res) => {
          console.log("signup" + res.data);
          setJwt(res.data.data);
          sessionStorage.setItem("jwt", res.data.data);
          history.push("/userdashboard");
        })
        .catch((err) => {
          return err;
        });
    }
  };

  return (
    <>
      <div className="body-wrapper">
        <div id="signup-wrapper">
          <h1>Sign up below to get rollin'.</h1>
          <br />
          <br />
          <br />
          <div className="signup-form" onSubmit={handleSubmit}>
            <TextInput
              label="Enter a new username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextInput
              label="Enter a new email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextInput
              type="password"
              label="Enter a new password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <label htmlFor="skateDate">When did you start skating?</label>
            <DatePicker
              label="When did you start skating?"
              name="skateSince"
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
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <Snackbar
              onClose={handleClose}
              open={open}
              message={message}
              value={buttonVal}
            />
            <br />
            <Button
              type="button"
              size="large"
              variant="contained"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
