import { View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { BackButton } from "../components/BackButton";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";

interface Params {
  date: string;
}
interface DayInfoTypes {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoTypes | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;

  const parseDate = dayjs(date);
  const isDatePast = parseDate.endOf("day").isBefore(new Date(), "day");

  const dayOfWeek = parseDate.format("dddd");
  const dayAndMonth = parseDate.format("DD/MM");

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);
      const { data } = await api.get("/day", {
        params: {
          date,
        },
      });

      setDayInfo(data);
      setCompletedHabits(data.completedHabits);
    } catch (err) {
      Alert.alert(
        "Ops",
        "Não foi possível carregar as informações dos hábitos"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((id) => id !== habitId)
        );
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId]);
      }
    } catch (err) {
      
      Alert.alert(
        "Ops",
        "Não foi possível carregar as informações dos hábitos"
      );
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton canGoPath="Voltar para Home" />
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx("mt-6", {
            ["opacity-40"]: isDatePast,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo?.possibleHabits.map((info) => (
              <Checkbox
                key={info.id}
                title={info.title}
                checked={completedHabits?.includes(info.id)}
                onPress={() => handleToggleHabit(info.id)}
                disabled={isDatePast}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {isDatePast && (
          <Text className="text-zinc-300 mt-10 text-center text-xs">
            Você não pode atualizar hábitos de datas passadas.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
