import { useEffect, useState } from "react";
import { UserInfo, UserInfoFilterBy, UserInfoFilter } from "../types";
import usersService from "../services/usersService";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormik } from "formik";
import * as Yup from "yup";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState<Array<UserInfo> | undefined>(undefined);
  const [originalUsers, setOriginalUsers] = useState<
    Array<UserInfo> | undefined
  >(undefined);

  useEffect(() => {
    try {
      console.log("fetching...");
      usersService.getAllUsers().then((fetchedUsers) => {
        setUsers(fetchedUsers);
        setOriginalUsers(fetchedUsers);
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        // TODO: Show an error notification
      }
    }
  }, []);

  const onSubmit = async (
    values: UserInfoFilter,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!originalUsers) {
      return;
    }
    const filter = values.filter;
    const filterBy = values.filterBy;

    if (originalUsers.length === 0 || filter.trim() === "") {
      return;
    }

    const filteredTwits = originalUsers.filter((twit) => {
      const value = String(twit[filterBy]);
      return value.toLowerCase().includes(filter.toLowerCase());
    });

    setUsers(filteredTwits);

    resetForm();
  };

  const onReset = () => {
    setUsers(originalUsers);
    formik.resetForm();
  };

  const validationSchema = Yup.object({
    filter: Yup.string().required("Filter value is required"),
    filterBy: Yup.mixed<UserInfoFilterBy>()
      .oneOf(Object.values(UserInfoFilterBy))
      .required("Filter by is required"),
  });

  const formik = useFormik({
    initialValues: {
      filterBy: UserInfoFilterBy.id,
      filter: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <form className="px-3 mt-3 " onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            sx={{ mt: 2, width: "70%", justifyContent: "end" }}
            name="filter"
            label="Enter something"
            value={formik.values.filter}
            onChange={formik.handleChange}
          ></TextField>
          <Box sx={{ width: "30%" }}>
            <InputLabel id="filter-by-label">Filter By</InputLabel>
            <Select
              labelId="filter-by-label"
              id="filter-by-select"
              label="Filter by"
              name="filterBy"
              sx={{ width: "100%" }}
              defaultValue={formik.values.filterBy}
              onChange={formik.handleChange}
              value={formik.values.filterBy}
            >
              <MenuItem value={"id"}>ID</MenuItem>
              <MenuItem value={"email"}>Email</MenuItem>
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"location"}>Location</MenuItem>
              <MenuItem value={"interests"}>Interests</MenuItem>
              <MenuItem value={"goals"}>Goals</MenuItem>
              <MenuItem value={"followers"}>Followers</MenuItem>
              <MenuItem value={"followeds"}>Followeds</MenuItem>
              <MenuItem value={"twitsnaps"}>Twitsnaps</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 1.4,
              ml: 1,
              gap: 1,
              width: "30%",
            }}
          >
            <Button
              type="submit"
              sx={{
                mt: 1,
                width: "100%",
                bgcolor: "#112334",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Filter
            </Button>
            <Button
              onClick={onReset}
              sx={{
                mt: 1,
                width: "100%",
                bgcolor: "#ff0011",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Reset Filter
            </Button>
          </Box>
        </Box>
      </form>
      <Box sx={{ mt: 10 }}>
        {!users && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}
        {users &&
          users.length > 0 &&
          users.map((user) => (
            <Accordion key={user.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="flex gap-3 h-10 mt-10"
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {user.user}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <User showBlockButton={true} user={user}></User>
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </>
  );
};

export default Users;
