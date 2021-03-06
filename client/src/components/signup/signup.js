import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import { Column, Row } from "simple-flexbox";
import FormLabel from "@material-ui/core/FormLabel";
import './signup.css';
// @@@@@@@@@@@--Visual Styling--@@@@@@@@@@@@@@@@

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

// @@@@@@@@@@@--Form--@@@@@@@@@@@@@@@@

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: ""
    };
  }

  changeFormHandler(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
    console.log(this.state);
  }

  render() {
    // const guideFields = this.getExtraGuideFields();
    let guideFields = <div></div>;

    if (this.state.userType === "guide") {
      guideFields = this.getExtraGuideFields();
    }

    return (
      <article>
        <form
          onSubmit={function(ev) {
            ev.preventDefault();
            this.props.onSubmit(this.state);
          }.bind(this)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={this.state.firstName}
                onChange={this.changeFormHandler.bind(this)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={this.state.lastName}
                onChange={this.changeFormHandler.bind(this)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.changeFormHandler.bind(this)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.changeFormHandler.bind(this)}
              />
            </Grid>
          </Grid>
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <RadioGroup
              aria-label="gender"
              name="userType"
              onChange={this.changeFormHandler.bind(this)}
            >
              <Row>
                <FormControlLabel
                  value="tourist"
                  control={<Radio />}
                  label="Tourist"
                />
                <FormControlLabel
                  value="guide"
                  control={<Radio />}
                  label="Guide"
                />
              </Row>
            </RadioGroup>
          </FormControl>
          {guideFields}
          <p></p>
          <Button type="submit" fullWidth variant="contained" color="inherit" className="btn">
            Sign Up
          </Button>
        </form>
      </article>
    );
  }

  getExtraGuideFields() {
    return (
      <div>
        <Typography variant="h6" align="center"></Typography>
        <TextField
          id="age"
          name="age"
          label="Age"
          type="number"
          required
          fullWidth
          rows="1"
          value={this.props.age}
          onChange={this.changeFormHandler.bind(this)}
          variant="outlined"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            onChange={this.changeFormHandler.bind(this)}
          >
            <Row>
              <FormControlLabel value="M" control={<Radio />} label="Man" />
              <FormControlLabel value="F" control={<Radio />} label="Woman" />
            </Row>
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

class extraGuideFields extends Component {
  render() {
    return (
      <div>
        {/* <Typography variant="h6" align="center">
        Gender
      </Typography> */}
        <TextField
          id="age"
          name="age"
          label="Age"
          type="number"
          required
          fullWidth
          rows="1"
          // value={props.age}
          // onChange={this.changeFormHandler.bind(this)}
          variant="outlined"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup aria-label="gender" name="gender1">
            <Row>
              <FormControlLabel value="Man" control={<Radio />} label="Man" />
              <FormControlLabel
                value="Woman"
                control={<Radio />}
                label="Woman"
              />
            </Row>
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default function SignUp(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <SignupForm
            onSubmit={formData => {
              console.log(formData);
              let apiUrl;
              if (formData.userType === "tourist") {
                apiUrl = "/api/signup";
              } else {
                apiUrl = "/api/signup/guide";
              }

              fetch(apiUrl, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                // mode: 'cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json"
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                // redirect: 'follow', // manual, *follow, error
                // referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(formData) // body data type must match "Content-Type" header
              });

              props.history.push("/");
            }}
          ></SignupForm>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
