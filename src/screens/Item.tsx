import { Typography } from "@mui/material";

interface ItemParams {
  title: string;
  description: string;
}

const Item = ({ title, description }: ItemParams) => {
  return (
    <>
      <Typography sx={{ fontWeight: "bold" }}>
        {title}: <span className="font-normal">{description}</span>
      </Typography>
    </>
  );
};
export default Item;
