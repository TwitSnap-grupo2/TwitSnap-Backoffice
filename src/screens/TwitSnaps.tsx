import { useEffect, useState } from "react";
import { TwitSnap, TwitSnapFilter, TwitSnapFilterBy, UserInfo } from "../types";
import twitsnapsService from "../services/twitsnapsService";
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
import User from "./User";
import Item from "./Item";
import IndentedComponent from "./IndentedComponent";

const TwitSnaps = () => {
  const [twits, setTwits] = useState<Array<TwitSnap>>([]);
  const [originalTwits, setOriginalTwits] = useState<Array<TwitSnap>>([]);

  useEffect(() => {
    try {
      console.log("fetching...");
      twitsnapsService.getAllTwitSnaps().then((fetchedTwits) => {
        const twitsWithDates = fetchedTwits.map((twit) => ({
          ...twit,
          createdAt: new Date(twit.createdAt), // Convert to Date
        }));
        setTwits(twitsWithDates);
        setOriginalTwits(twitsWithDates);
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        // TODO: Show an error notification
      }
    }
  }, []);

  const onSubmit = async (
    values: TwitSnapFilter,
    { resetForm }: { resetForm: () => void }
  ) => {
    const filter = values.filter;
    const filterBy = values.filterBy;

    if (originalTwits.length === 0 || filter.trim() === "") {
      return;
    }

    const filteredTwits = originalTwits.filter((twit) => {
      let value;
      if (filterBy == "createdAt") {
        value = twit[filterBy].toISOString();
      } else if (
        filterBy == "creatorUser" ||
        filterBy == "creatorId" ||
        filterBy == "creatorName" ||
        filterBy == "creatorEmail"
      ) {
        const createdByFilter = filterBy
          .split("creator")[1]
          .toLowerCase() as keyof UserInfo; // Assert the type to keyof UserInfo

        value = String(twit["createdBy"][createdByFilter]);
      } else {
        value = String(twit[filterBy]);
      }
      return value.toLowerCase().includes(filter.toLowerCase());
    });

    setTwits(filteredTwits);
    resetForm();
  };

  const onReset = () => {
    setTwits(originalTwits);
    formik.resetForm();
  };

  const validationSchema = Yup.object({
    filter: Yup.string().required("Filter value is required"),
    filterBy: Yup.mixed<TwitSnapFilterBy>()
      .oneOf(Object.values(TwitSnapFilterBy))
      .required("Filter by is required"),
  });

  const formik = useFormik({
    initialValues: {
      filterBy: TwitSnapFilterBy.id,
      filter: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <form className="px-3 mt-3" onSubmit={formik.handleSubmit}>
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
              defaultValue={"id"}
              onChange={formik.handleChange}
              value={formik.values.filterBy}
            >
              <MenuItem value={"id"}>ID</MenuItem>
              <MenuItem value={"createdAt"}>Created at</MenuItem>
              <MenuItem value={"creatorUser"}>Creator User</MenuItem>
              <MenuItem value={"creatorName"}>Creator Name</MenuItem>
              <MenuItem value={"creatorEmail"}>Creator Email</MenuItem>
              <MenuItem value={"creatorId"}>Creator ID</MenuItem>

              <MenuItem value={"message"}>Message</MenuItem>
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
        {twits.length > 0 &&
          twits.map((twit) => (
            <Accordion key={twit.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="flex gap-3 h-10 mt-10"
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {twit.message}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontWeight: "bold" }}>Created by:</Typography>
                <IndentedComponent>
                  <User user={twit.createdBy}></User>
                </IndentedComponent>
                <Item
                  title="Created at"
                  description={twit.createdAt.toISOString()}
                />
                <Item title="ID" description={twit.id} />
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </>
  );
};

export default TwitSnaps;
