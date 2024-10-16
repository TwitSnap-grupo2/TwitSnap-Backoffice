import { TwitSnap } from "../types";

const date = new Date();
const creatorUUID = crypto.randomUUID();
console.log("🚀 ~ creatorUUID:", creatorUUID);

const testTwits: Array<TwitSnap> = [
  {
    message: "Test twitsnap 1",
    createdAt: date,
    createdBy: creatorUUID,
    id: crypto.randomUUID(),
  },
  {
    message: "Test twitsnap 2",
    createdAt: date,
    createdBy: creatorUUID,
    id: crypto.randomUUID(),
  },
  {
    message: "Test twitsnap 3",
    createdAt: date,
    createdBy: creatorUUID,
    id: crypto.randomUUID(),
  },
  {
    message: "Test twitsnap 4",
    createdAt: date,
    createdBy: creatorUUID,
    id: crypto.randomUUID(),
  },
  {
    message: "Test twitsnap 5",
    createdAt: date,
    createdBy: creatorUUID,
    id: crypto.randomUUID(),
  },
  {
    message: "Test twitsnap 6",
    createdAt: date,
    createdBy: creatorUUID,
    id: crypto.randomUUID(),
  },
];

export default testTwits;
