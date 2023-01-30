import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  canGoPath?: string;
}

export function BackButton({ canGoPath = "" }: BackButtonProps) {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
      <View className="flex-row items-center gap-3">
        <Feather name="arrow-left" size={32} color={colors.zinc[400]} />
        <Text className="text-zinc-400">{canGoPath}</Text>
      </View>
    </TouchableOpacity>
  );
}
