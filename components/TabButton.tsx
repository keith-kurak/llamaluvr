import colors from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/build/ui";
import { ComponentProps, Ref } from "react";
import { Text, Pressable, View } from "react-native";

type Icon = ComponentProps<typeof MaterialIcons>["name"];

export type TabButtonProps = TabTriggerSlotProps & {
  icon?: Icon;
  ref?: Ref<View>;
};

export function TabButton({
  icon,
  children,
  isFocused,
  ref,
  ...props
}: TabButtonProps) {
  return (
    <Pressable
      className={isFocused ? " sm:border-b-tint sm:border-b-2" : ""}
      ref={ref}
      {...props}
    >
      <View className="justify-between items-center gap-y-1 px-2 flex-col">
        <MaterialIcons
          className="sm:hidden"
          color={isFocused ? colors.tint : colors.black}
          name={icon}
          size={24}
        />
        <Text
          className={
            "text-sm sm:text-lg" +
            (isFocused ? " color-tint sm:color-black" : "")
          }
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}