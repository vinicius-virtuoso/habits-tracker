import * as Progress from "@radix-ui/react-progress";
import clsx from "clsx";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const progressStyles = {
    width: `${progress}%`,
  };

  return (
    <Progress.Root className="h-3 rounded-xl bg-zinc-700 w-full mt-4 overflow-hidden">
      <Progress.Indicator
        className={clsx(
          "h-3 rounded-xl transition-all ease-in-out duration-200",
          {
            "bg-transparent": progress === 0,
            "bg-blue-900": progress > 0 && progress < 20,
            "bg-blue-800": progress >= 20 && progress < 40,
            "bg-blue-700": progress >= 40 && progress < 60,
            "bg-blue-600": progress >= 60 && progress < 80,
            "bg-blue-400": progress >= 80,
          }
        )}
        style={progressStyles}
      />
    </Progress.Root>
  );
};
