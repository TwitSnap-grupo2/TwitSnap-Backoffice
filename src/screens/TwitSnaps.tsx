import { SyntheticEvent, useEffect, useState } from "react";
import { TwitSnap } from "../types";
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
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TwitSnaps = () => {
  const [twits, setTwits] = useState<Array<TwitSnap>>([]);
  const [originalTwits, setOriginalTwits] = useState<Array<TwitSnap>>([]);
  const [filter, setFilter] = useState<
    "id" | "createdBy" | "createdAt" | "message"
  >("id");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    try {
      console.log("fetching...");
      twitsnapsService.getAllTwitSnaps().then((fetchedTwits) => {
        setTwits(fetchedTwits);
        setOriginalTwits(fetchedTwits);
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        // TODO: Show an error notification
      }
    }
  }, []);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (filterValue == "") {
      setFilterValue("");
      setTwits(originalTwits);
      return;
    }
    if (originalTwits.length === 0 || filterValue.trim() === "") {
      return;
    }

    const filteredTwits = originalTwits.filter((twit) => {
      let value;
      if (filter == "createdAt") {
        value = twit[filter].toISOString();
      } else {
        value = String(twit[filter]);
      }
      console.log("🚀 ~ filteredTwits ~ value:", value);
      return value.toLowerCase().includes(filterValue.toLowerCase());
    });

    setTwits(filteredTwits); // Update the displayed list
  };

  const resetFilter = () => {
    setTwits(originalTwits);
    setFilterValue("");
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    const val = event.target.value;
    if (
      val == "id" ||
      val == "createdBy" ||
      val == "createdAt" ||
      val == "message"
    ) {
      setFilter(val);
    }
  };

  const handleFilterValueChange = (event: SyntheticEvent) => {
    setFilterValue(event.target.value);
  };

  return (
    <>
      <form className="px-3 mt-3 " onSubmit={onSubmit}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            sx={{ mt: 2, width: "70%", justifyContent: "end" }}
            label="Enter something"
            onChange={handleFilterValueChange}
          ></TextField>
          <Box sx={{ width: "30%" }}>
            <InputLabel id="filter-by-label">Filter By</InputLabel>
            <Select
              labelId="filter-by-label"
              id="filter-by-select"
              label="Filter by"
              sx={{ width: "100%" }}
              defaultValue={"id"}
              onChange={handleFilterChange}
            >
              <MenuItem value={"id"}>ID</MenuItem>
              <MenuItem value={"createdAt"}>Created at</MenuItem>
              <MenuItem value={"createdBy"}>Created by</MenuItem>
              <MenuItem value={"message"}>Message</MenuItem>
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
          onClick={resetFilter}
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
        {twits.length > 0 &&
          twits.map((twit) => (
            <Accordion key={twit.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="flex gap-3 h-10 mt-10"
              >
                <Typography className="flex items-center">
                  {twit.message}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Created by: {twit.createdBy}</Typography>
                <Typography>
                  Created at: {twit.createdAt.toISOString()}
                </Typography>
                <Typography>ID: {twit.id}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </>
  );
};

export default TwitSnaps;
