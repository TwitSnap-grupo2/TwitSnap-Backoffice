import { useEffect, useState } from "react";
import { TwitSnap } from "../types";
import twitsnapsService from "../services/twitsnapsService";
import Button from "@mui/material/Button";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TwitSnaps = () => {
  const [twits, setTwits] = useState<Array<TwitSnap>>([]);
  useEffect(() => {
    try {
      console.log("fetching...");
      twitsnapsService.getAllTwitSnaps().then((twits) => setTwits(twits));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        // TODO: Show an error notification
      }
    }
  }, []);

  return (
    <>
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
    </>
  );
};
//   <ul>
//     {twits.length > 0 &&
//       twits.map((twit) => (
//         <li key={twit.id}>
//           <Box className="flex gap-3 h-10 mt-10">
//             <p className="flex items-center">message: {twit.message}</p>
//             <Button className="text-black">See more</Button>
//           </Box>
//         </li>
//       ))}
//   </ul>
// );

export default TwitSnaps;
