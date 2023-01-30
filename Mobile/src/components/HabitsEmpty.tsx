import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

export function HabitsEmpty() {
  const { navigate } = useNavigation();

  return (
    <>
      <Text className="text-zinc-400 text-base">
        Você ainda não está monitorando nenhum hábito.{" "}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className="p-3 mt-5 bg-violet-500 rounded-lg"
        onPress={() => navigate("new")}
      >
        <Text className="text-white text-base text-center">
          Comece criando um novo hábito
        </Text>
      </TouchableOpacity>
    </>
  );
}
