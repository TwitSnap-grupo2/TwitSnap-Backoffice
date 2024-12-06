import { eachWeekOfInterval, format } from "date-fns";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  HashtagMetrics,
  LocationData,
  LoginData,
  PasswordRecoveryData,
  RegistrationData,
  TwitsnapMetrics,
} from "../utils/data";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  loginMetrics,
  passwordRecoveryMetrics,
  registrationMetrics,
} from "../services/metricsService";

import twitsnapsService from "../services/twitsnapsService";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    totalSuccess: null,
    successRate: 0,
    averageRegistrationTime: 0,
    locationCount: [],
    emailCount: 0,
    googleCount: 0,
  });
  const [loginData, setLoginData] = useState<LoginData>({
    totalSuccess: null,
    successRate: 0,
    averageLoginTime: 0,
    locationCount: [],
    emailCount: 0,
    googleCount: 0,
  });
  const [passwordRecoveryData, setPasswordRecoveryData] =
    useState<PasswordRecoveryData>({
      total: null,
      successRate: 0,
      averageRecoverPasswordTime: 0,
    });
  const [parsedData, setParsedData] = useState<
    { week: string; count: number }[]
  >([]);

  const [range, setRange] = useState<string>("year");
  const oldDate = new Date();
  oldDate.setDate(oldDate.getDate() - 1000);
  useEffect(() => {
    const getAllMetrics = async () => {
      try {
        const regMetrics = await registrationMetrics(oldDate, new Date());
        setRegistrationData(regMetrics);

        const logMetrics = await loginMetrics(oldDate, new Date());
        setLoginData(logMetrics);

        const passMetrics = await passwordRecoveryMetrics(oldDate, new Date());
        setPasswordRecoveryData(passMetrics);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          // TODO: Show an error notification
        }
      }
    };
    getAllMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [twitsnapMetrics, setTwitsnapMetrics] = useState<TwitsnapMetrics>({
    total: null,
    frequency: [],
    averageTwitsPerUser: 0,
    topLikedTwits: [],
    topSharedTwits: [],
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        console.log("fetching...");
        const [twitSnapsData, hashtagData] = await Promise.all([
          twitsnapsService.getTwitSnapsMetrics(range),
          twitsnapsService.getHashtagMetrics(range),
        ]);

        setTwitsnapMetrics(twitSnapsData);
        setParsedData(
          parseWeeklyData(twitSnapsData.frequency, new Date().getFullYear())
        );

        setHashtagMetrics(hashtagData);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    };

    fetchMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const [hashtagMetrics, setHashtagMetrics] = useState<HashtagMetrics>({
    total: null,
    frequency: [],
    topHashtags: [],
  });

  useEffect(() => {
    const getHashtagMetrics = async () => {
      try {
        console.log("fetching...");
        const data = await twitsnapsService.getHashtagMetrics(range);
        console.log(data);
        setHashtagMetrics(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    };
    getHashtagMetrics();
  }, [range]);

  const generateWeeksOfYear = (year: number): string[] => {
    return eachWeekOfInterval(
      {
        start: new Date(year, 0, 1),
        end: new Date(year, 11, 31),
      },
      { weekStartsOn: 1 }
    ).map((date) => format(date, "yyyy-MM-dd"));
  };

  const parseWeeklyData = (
    data: Array<{ count: number; date: string }>,
    year: number
  ) => {
    const weeks = generateWeeksOfYear(year);

    const weeklyMap = new Map<string, number>(weeks.map((week) => [week, 0]));

    data.forEach(({ count, date }) => {
      const weekKey = format(new Date(date), "yyyy-MM-dd");
      if (weeklyMap.has(weekKey)) {
        weeklyMap.set(weekKey, count);
      }
    });

    return Array.from(weeklyMap.entries()).map(([week, count]) => ({
      week,
      count,
    }));
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-5 flex flex-col gap-10">
      <div className="rounded-xl p-10">
        <h1 className="font-semibold text-5xl text-center mb-10">
          Registration Metrics
        </h1>
        {registrationData.totalSuccess === null && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}
        {registrationData.totalSuccess !== null && (
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
                  {registrationData.averageRegistrationTime} seconds
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
        )}
      </div>
      <div className="rounded-xl p-10">
        <h1 className="font-semibold text-5xl text-center mb-10">
          Login Metrics
        </h1>
        {loginData.totalSuccess === null && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}
        {loginData.totalSuccess !== null && (
          <div className="flex gap-12 p-6">
            <div className="grid grid-flow-col grid-rows-2 gap-6">
              <div className="flex gap-5 flex-1">
                <div className=" bg-white p-8 flex flex-col items-center gap-5 rounded-xl shadow-xl">
                  <h2 className="text-3xl font-semibold">Success Rate</h2>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      size={70}
                      variant="determinate"
                      value={Math.round(loginData.successRate * 100)}
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
                        loginData.successRate * 100
                      )}%`}</Typography>
                    </Box>
                  </Box>{" "}
                </div>
                <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 flex-1 shadow-xl">
                  <h2 className="text-3xl font-semibold ">Total Success</h2>
                  <p className="text-2xl font-medium ">
                    {loginData.totalSuccess}
                  </p>
                </div>
              </div>
              <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 shadow-xl">
                <h2 className="text-3xl font-semibold text-center">
                  Google Logins
                </h2>
                <p className="text-2xl font-medium ">{loginData.googleCount}</p>
              </div>
              <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 shadow-xl">
                <h2 className="text-3xl font-semibold ">Email Logins</h2>
                <p className="text-2xl font-medium ">{loginData.emailCount}</p>
              </div>
              <div className="bg-white p-8 flex flex-col items-center gap-7 rounded-xl shadow-xl">
                <h2 className="text-3xl font-semibold text-center">
                  Average Login Time
                </h2>
                <p className="text-2xl font-medium text-center">
                  {loginData.averageLoginTime} seconds
                </p>
              </div>
            </div>
            <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 shadow-xl">
              <h2 className="text-3xl font-semibold ">Logins by Country </h2>
              <PieChart
                series={[
                  {
                    data: parseLocationData(loginData.locationCount),
                  },
                ]}
                width={400}
                height={200}
              />{" "}
            </div>
          </div>
        )}
      </div>
      <div className="rounded-xl p-10">
        <h1 className="font-semibold text-5xl text-center mb-10">
          Password Recovery Metrics
        </h1>
        {passwordRecoveryData.total === null && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}
        {passwordRecoveryData.total !== null && (
          <div className="flex gap-12 p-6">
            <div className=" bg-white p-8 flex flex-col items-center gap-5 rounded-xl shadow-xl">
              <h2 className="text-3xl font-semibold">Success Rate</h2>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  size={70}
                  variant="determinate"
                  value={Math.round(passwordRecoveryData.successRate * 100)}
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
                    passwordRecoveryData.successRate * 100
                  )}%`}</Typography>
                </Box>
              </Box>{" "}
            </div>
            <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 flex-1 shadow-xl">
              <h2 className="text-3xl font-semibold ">Requests total</h2>
              <p className="text-2xl font-medium ">
                {passwordRecoveryData.total}
              </p>
            </div>
            <div className="bg-white p-8 flex flex-col items-center gap-7 rounded-xl shadow-xl">
              <h2 className="text-3xl font-semibold text-center">
                Average Password Recovery Time
              </h2>
              <p className="text-2xl font-medium text-center">
                {passwordRecoveryData.averageRecoverPasswordTime} seconds
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="rounded-xl p-10">
        <h1 className="font-semibold text-5xl text-center mb-10">
          Twitsnaps Metrics
        </h1>
        <Box sx={{ width: "30%" }}>
          <InputLabel id="filter-by-label">Filter By</InputLabel>
          <Select
            labelId="filter-by-label"
            id="filter-by-select"
            label="Filter by"
            name="filterBy"
            value={range}
            sx={{ width: "100%" }}
            onChange={(e) => {
              setRange(e.target.value as string);
              setTwitsnapMetrics({
                total: null,
                frequency: [],
                averageTwitsPerUser: 0,
                topLikedTwits: [],
                topSharedTwits: [],
              });
              setHashtagMetrics({
                total: null,
                frequency: [],
                topHashtags: [],
              });
              try {
                console.log("fetching...");
                twitsnapsService
                  .getTwitSnapsMetrics(e.target.value as string)
                  .then((data) => {
                    console.log(data);
                    setTwitsnapMetrics(data);
                  });
              } catch (err) {
                if (err instanceof Error) {
                  console.error(err.message);
                }
              }
            }}
          >
            <MenuItem value={"day"}>Today</MenuItem>
            <MenuItem value={"week"}>This Week</MenuItem>
            <MenuItem value={"month"}>This Month</MenuItem>
            <MenuItem value={"year"}>This Year</MenuItem>
          </Select>
        </Box>

        <h3 className="text-2xl font-medium "> Twitsnaps</h3>
        {twitsnapMetrics.total === null && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}

        {twitsnapMetrics.total !== null && (
          <div className="flex gap-12 p-6">
            <div className="grid grid-flow-col grid-rows-2 gap-6">
              <div className=" bg-white p-20 flex flex-col items-center gap-5 rounded-xl shadow-xl">
                <h2 className="text-3xl font-semibold">Total</h2>
                <p className="text-2xl font-medium ">{twitsnapMetrics.total}</p>
              </div>
              <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 shadow-xl">
                <h2 className="text-3xl font-semibold ">
                  Average Twits Per User
                </h2>
                <p className="text-2xl font-medium ">
                  {twitsnapMetrics.averageTwitsPerUser}
                </p>
              </div>
            </div>
            <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 flex-1 shadow-xl">
              <h2 className="text-3xl font-semibold ">Twitsnaps frequency</h2>
              <BarChart
                xAxis={[
                  { scaleType: "band", data: parsedData.map((d) => d.week) },
                ]}
                series={[{ data: parsedData.map((d) => d.count) }]}
                width={500}
                height={300}
              />
            </div>
          </div>
        )}

        {twitsnapMetrics.total !== null && (
          <div className="grid grid-flow-col grid-cols-2 gap-6">
            <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 shadow-xl">
              <h2 className="text-3xl font-semibold ">Top Liked Twits</h2>
              <ul>
                {twitsnapMetrics.topLikedTwits.map((twit) => (
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
                      <Typography>Twit ID: {twit.id}</Typography>
                      <Typography>Likes: {twit.count}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </ul>
            </div>
            <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 shadow-xl">
              <h2 className="text-3xl font-semibold ">Top Shared Twits</h2>
              <ul>
                {twitsnapMetrics.topSharedTwits.map((twit) => (
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
                      <Typography>Twit ID: {twit.id}</Typography>
                      <Typography>Shares: {twit.count}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </ul>
            </div>
          </div>
        )}
        <h3 className="text-2xl font-medium "> Hashtags</h3>
        {hashtagMetrics.total === null && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}

        {hashtagMetrics.total && (
          <div className="flex gap-12 p-6">
            <div className=" bg-white p-20 flex flex-col items-center gap-5 rounded-xl shadow-xl">
              <h2 className="text-3xl font-semibold">Total</h2>
              <p className="text-2xl font-medium ">{hashtagMetrics.total}</p>
            </div>
            <div className="bg-white flex flex-col p-8 rounded-xl items-center gap-7 flex-1 shadow-xl">
              <h2 className="text-3xl font-semibold ">Top Hashtags</h2>
              {hashtagMetrics.topHashtags.map((hashtag) => (
                <Accordion key={hashtag.name}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className="flex gap-3 h-10 mt-10"
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {hashtag.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Hashtag: {hashtag.name}</Typography>
                    <Typography>Times used: {hashtag.count}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metrics;
