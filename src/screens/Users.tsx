import { useEffect, useState } from "react";
import { UserInfo, UserInfoFilterBy, UserInfoFilter } from "../types";
import usersService from "../services/usersService";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormik } from "formik";
import * as Yup from "yup";

const Users = () => {
  const [users, setUsers] = useState<Array<UserInfo>>([]);
  const [originalUsers, setOriginalUsers] = useState<Array<UserInfo>>([]);

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
    console.log("🚀 ~ TwitSnaps ~ values:", values);
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
        </Box>
        <Button
          type="submit"
          sx={{
            mt: 1,
            width: "100%",
            bgcolor: "#112334",
            color: "white",
          }}
        >
          Filter
        </Button>
        <Button
          onClick={onReset}
          sx={{
            mt: 1,
            width: "100%",
            bgcolor: "#112334",
            color: "white",
          }}
        >
          Reset Filter
        </Button>
      </form>
      <Box sx={{ mt: 10 }}>
        {users.length > 0 &&
          users.map((user) => (
            <Accordion key={user.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="flex gap-3 h-10 mt-10"
              >
                <Typography className="flex items-center">
                  {user.user}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>ID: {user.id}</Typography>
                <Typography>Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Location: {user.location}</Typography>
                <Typography>
                  interests:{" "}
                  {user.interests.map((interest) => (
                    <Typography>{interest}</Typography>
                  ))}
                </Typography>
                <Typography>
                  Goals:{" "}
                  {user.goals.map((goal) => (
                    <Typography>{goal}</Typography>
                  ))}
                </Typography>
                <Typography>
                  Followers:{" "}
                  {user.followers.map((follower) => (
                    <Typography>{follower}</Typography>
                  ))}
                </Typography>
                <Typography>
                  Followeds:{" "}
                  {user.followeds.map((followed) => (
                    <Typography>{followed}</Typography>
                  ))}
                </Typography>
                <Typography>
                  Twitsnaps:{" "}
                  {user.twitsnaps.map((twitsnap) => (
                    <Typography>{twitsnap}</Typography>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </>
  );
};

export default Users;
