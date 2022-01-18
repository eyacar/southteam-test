import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { usersSelector, filterByGender } from "../../../store/users/index";
import { getUsers } from "../../../store/users/asyncActions";
import Pagination from "../../reusable/Pagination/Pagination";
import CardsPage from "./Cards/CardsPage";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UsersCards = () => {
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
    dispatch(filterByGender(event.target.value));
  };

  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const filter = useSelector((state) => state.users.filterData);
  const amount = useSelector((state) => state.users.userAmount);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    amount && dispatch(getUsers(amount));
  }, [amount, dispatch]);

  const view = useMemo(
    () => (
      <Pagination
        data={filter && gender !== "all" ? filter : users}
        amountOfData={10}
        page={CardsPage}
      />
    ),
    [filter, users, gender]
  );

  if (loading) return <h1>loading</h1>;

  if (error) return <h1>There was an error: {error}</h1>;

  if (isEmpty(users)) return <h1>There's not User Data at this moment</h1>;

  return (
    <Box fullWidth sx={{ pt: 2 }}>
      <FormControl sx={{ minWidth: 155 }}>
        <InputLabel id="demo-simple-select-label">Filter by gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Filter by gender"
          onChange={handleChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="male">Male</MenuItem>
        </Select>
      </FormControl>
      {view}
    </Box>
  );
};

export default UsersCards;
