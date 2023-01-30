import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  title: string;
  newHabit?: boolean;
}

export const Checkbox = ({ title, newHabit, ...rest }: CheckboxProps) => {
  return (
    <RadixCheckbox.Root
      className="flex items-center gap-3 group disabled:cursor-not-allowed focus:outline-none "
      {...rest}
    >
      {newHabit ? (
        <>
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-600 transition-colors ease-in-out group-focus:ring-2 group-focus:ring-blue-500 group-focus:ring-offset-2 group-focus:ring-offset-bg_black">
            <RadixCheckbox.Indicator>
              <Check size={20} className="text-white" />
            </RadixCheckbox.Indicator>
          </div>

          <span className="text-white leading-tight">{title}</span>
        </>
      ) : (
        <>
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-600 transition-colors ease-in-out group-focus:ring-2 group-focus:ring-blue-500 group-focus:ring-offset-2 group-focus:ring-offset-bg_black">
            <RadixCheckbox.Indicator>
              <Check size={20} className="text-white" />
            </RadixCheckbox.Indicator>
          </div>

          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {title}
          </span>
        </>
      )}
    </RadixCheckbox.Root>
  );
};
