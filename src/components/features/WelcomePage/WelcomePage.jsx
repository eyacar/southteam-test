import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAmount } from "../../../store/users/index";
import { addName } from "../../../store/admin/index";
import { useNavigate } from "react-router-dom";
import isNaN from "lodash/isNaN";
import isEmpty from "lodash/isEmpty";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import Scss from "./WelcomePage.module.scss";

export default function WelcomePage() {
  const [fullName, setFullName] = useState("");
  const [searchAmount, setSearchAmount] = useState("");
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    dispatch(addName(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleNumberInputChange(e) {
    const amount = Number(e.target.value);
    setWarning(false);
    if (isNaN(amount)) {
      setSearchAmount(0);
    } else {
      setSearchAmount(amount);
    }
  }

  const validLabel = useMemo(() => {
    if (searchAmount === 0)
      return (
        <FormHelperText id="component-error-text" error={true}>
          You must add a valid number amount
        </FormHelperText>
      );
  }, [searchAmount]);

  const warningLabel = useMemo(() => {
    if (warning)
      return (
        <FormHelperText id="component-error-text" error={true}>
          You must filed the input before continue
        </FormHelperText>
      );
  }, [warning]);

  const handleClick = () => {
    if (searchAmount > 0 && !isEmpty(fullName)) {
      setWarning(false);
      dispatch(addAmount(searchAmount));
      dispatch(addName(fullName));
      navigate("/results");
    } else setWarning(true);
  };

  return (
    <div className={Scss.container}>
      <h1 className={Scss.container__title}>
        Welcome to search Users Project!!!
      </h1>
      <p className={Scss.container__description}>
        We're a fake UI user DB made for a React test.
      </p>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Add your full name"
          variant="outlined"
          color="success"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setWarning(false);
          }}
        />
        <FormControl>
          <TextField
            id="outlined-basic"
            label="Amount of users you like to see"
            variant="outlined"
            color="success"
            value={searchAmount}
            onChange={(e) => handleNumberInputChange(e)}
          />
          {validLabel}
        </FormControl>
      </Box>
      <FormControl sx={{ width: "15ch" }}>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="success"
          onClick={handleClick}
        >
          Continue
        </Button>
        {warningLabel}
      </FormControl>
    </div>
  );
}
