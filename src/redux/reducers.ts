import { AnyAction } from "redux";

// types
import { User } from "./types";

// constants
import { DEFAULT_LIST_RIDERS } from "./constants";

// actions
import { ridersGet } from "./actions";

// helps
import { getRandomNumber } from "../helps/numbers";

// magic numbers
const MAX_COLOR = 2;
const MIN_SPEED = 45;
const MAX_SPEED = 415;
const MIN_SECONDS = 45;
const MAX_MINUTES = 180;
const MILLISECONDS = 1000;

export const ridersReducer = (state: User[] = [], action: AnyAction) => {
  switch (action.type) {
    case ridersGet.type: {
      const newListRiders: User[] = DEFAULT_LIST_RIDERS.map((rider) => {
        const name = rider.replaceAll("_", " ");
        const color = getRandomNumber(0, MAX_COLOR);
        const speed = getRandomNumber(MIN_SPEED, MAX_SPEED);
        const time = Math.round(
          getRandomNumber(
            MIN_SECONDS / speed,
            (MIN_SECONDS * MAX_MINUTES) / speed
          ) * MILLISECONDS
        );
        return { color, name, speed, time };
      });
      return newListRiders;
    }
    default:
      return state;
  }
};
