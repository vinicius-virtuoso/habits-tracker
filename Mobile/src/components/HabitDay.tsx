import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import clsx from "clsx";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import dayjs from "dayjs";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get("screen").width / weekDays - (screenHorizontalPadding + 5);

interface HabitDayProps extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}

export const HabitDay = ({
  date,
  amountOfHabits = 0,
  amountCompleted = 0,
  ...rest
}: HabitDayProps) => {
  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(today, "day");
  const completedPercentage =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits, amountCompleted)
      : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={clsx("border-2 rounded-lg m-1", {
        ["bg-zinc-900 border-zinc-800 "]: completedPercentage === 0,
        ["bg-violet-900 border-violet-800"]:
          completedPercentage > 0 && completedPercentage < 20,
        ["bg-violet-800 border-violet-700"]:
          completedPercentage >= 20 && completedPercentage < 40,
        ["bg-violet-700 border-violet-600"]:
          completedPercentage >= 40 && completedPercentage < 60,
        ["bg-violet-600 border-violet-500"]:
          completedPercentage >= 60 && completedPercentage < 80,
        ["bg-violet-400 border-violet-500"]: completedPercentage >= 80,
        ["border-4 border-white"]: isCurrentDay,
      })}
      style={{ width: daySize, height: daySize }}
      {...rest}
    />
  );
};
