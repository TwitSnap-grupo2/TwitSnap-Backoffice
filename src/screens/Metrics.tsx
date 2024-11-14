// import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LocationData, registrationData } from "../utils/data";
import { Box, CircularProgress, Typography } from "@mui/material";

// totalSuccess: 150,
// successRate: 0.85,
// averageRegistrationTime: 5.2,
// locationCount: [
//   { location: "ARG", res: 25 },
//   { location: "USA", res: 20 },
//   { location: "AUS", res: 60 },
// ],
// emailCount: 100,
// googleCount: 50,

function parseLocationData(locationData: LocationData[]) {
  return locationData.map((l, idx) => {
    return {
      id: idx,
      value: l.res,
      label: l.location,
    };
  });
}

const Metrics = () => {
  return (
    <div className="bg-slate-100 min-h-screen py-10 px-5 flex flex-col gap-10">
      <div className="rounded-xl p-10">
        <h1 className="font-semibold text-5xl text-center mb-10">
          Registration Metrics
        </h1>
        <div className="flex gap-12 p-6">
          <div className="grid grid-flow-col grid-rows-2 gap-6">
            <div className="flex gap-5 flex-1">
              <div className=" bg-white p-8 flex flex-col items-center gap-5 rounded-xl shadow-xl">
                <h2 className="text-3xl font-semibold">Success Rate</h2>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    size={70}
                    variant="determinate"
                    value={Math.round(registrationData.successRate * 100)}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      fontSize={20}
                    >{`${Math.round(
                      registrationData.successRate * 100
                    )}%`}</Typography>
                  </Box>
                </Box>{" "}
              </div>
              <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 flex-1 shadow-xl">
                <h2 className="text-3xl font-semibold ">Total Success</h2>
                <p className="text-2xl font-medium ">
                  {registrationData.totalSuccess}
                </p>
              </div>
            </div>
            <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 shadow-xl">
              <h2 className="text-3xl font-semibold text-center">
                Google Registrations
              </h2>
              <p className="text-2xl font-medium ">
                {registrationData.googleCount}
              </p>
            </div>
            <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 shadow-xl">
              <h2 className="text-3xl font-semibold ">Email Registrations</h2>
              <p className="text-2xl font-medium ">
                {registrationData.emailCount}
              </p>
            </div>
            <div className="bg-white p-8 flex flex-col items-center gap-7 rounded-xl shadow-xl">
              <h2 className="text-3xl font-semibold text-center">
                Average Registration Time
              </h2>
              <p className="text-2xl font-medium text-center">
                {registrationData.averageRegistrationTime}
              </p>
            </div>
          </div>
          <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 shadow-xl">
            <h2 className="text-3xl font-semibold ">
              Registrations by Country{" "}
            </h2>
            <PieChart
              series={[
                {
                  data: parseLocationData(registrationData.locationCount),
                },
              ]}
              width={400}
              height={200}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
