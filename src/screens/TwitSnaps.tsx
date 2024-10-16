import { useEffect, useState } from "react";
import { TwitSnap } from "../types";
import twitsnapsService from "../services/twitsnapsService";

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
    <ul>
      {twits.length > 0 &&
        twits.map((twit) => (
          <li key={twit.id}>
            <div className="flex gap-3 h-10 mt-10">
              <p className="flex items-center">message: {twit.message}</p>
              <button className="bg-slate-700 rounded-sm">See more</button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default TwitSnaps;
