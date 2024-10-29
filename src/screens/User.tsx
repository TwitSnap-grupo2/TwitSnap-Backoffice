import { Typography } from "@mui/material";
import { UserInfo } from "../types";
import Item from "./Item";
import IndentedComponent from "./IndentedComponent";

interface UserParams {
  user: UserInfo;
}

const User = ({ user }: UserParams) => {
  return (
    <div>
      <Item title="ID" description={user.id}></Item>
      <Item title="Email" description={user.email}></Item>
      <Item title="User" description={user.user}></Item>
      <Item title="Name" description={user.name}></Item>

      {user.interests && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Interests: </Typography>
          <IndentedComponent>
            {user.interests.map((interest) => (
              <Typography key={interest}>{interest}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
      {user.goals && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Goals: </Typography>
          <IndentedComponent>
            {user.goals.map((goal) => (
              <Typography key={goal}>{goal}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
      {user.followers && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Followers: </Typography>
          <IndentedComponent>
            {user.followers.map((follower) => (
              <Typography key={follower}>{follower}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
      {user.followeds && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Followeds: </Typography>
          <IndentedComponent>
            {user.followeds.map((followed) => (
              <Typography key={followed}>{followed}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
      {user.twitsnaps && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Twitsnaps: </Typography>
          <IndentedComponent>
            {user.twitsnaps.map((twitsnap) => (
              <Typography key={twitsnap}>{twitsnap}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
    </div>
  );
};
export default User;
