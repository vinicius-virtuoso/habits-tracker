import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const NewHabitForm = () => {
  const [habitTitle, setHabitTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!habitTitle || weekDays.length === 0) {
      return;
    }

    await api.post("/habits", {
      title: habitTitle,
      weekDays: weekDays,
    });

    setHabitTitle("");
    setWeekDays([]);

    alert("hábito criado");
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays((prevState) => prevState.filter((day) => day !== weekDay));
    } else {
      setWeekDays((prevState) => [...prevState, weekDay]);
    }
  }

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc.."
        autoFocus
        onChange={({ target }) => setHabitTitle(target.value)}
        value={habitTitle}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={`${weekDay}-${index}`}
            title={weekDay}
            onCheckedChange={() => handleToggleWeekDay(index)}
            newHabit
            checked={weekDays.includes(index)}
          />
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-bg_black"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
};
