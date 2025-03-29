import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { TabButton } from "@/components/TabButton";
import { TabTrigger, TabList, TabSlot, Tabs } from "expo-router/ui";
import classNames from "classnames";

export default function TabLayout() {
  const tabs = (
    <TabList
      className={classNames(
        "py-3 sm:py-6",
        "px-6 sm:px-8",
        "sm:justify-end sm:gap-x-4",
        "bg-white",
        "bottom-safe-offset-2 sm:bottom-safe-offset-0", // keep the tabs above safe ares
      )}
    >
      <TabTrigger name="index" href="/" asChild>
        <TabButton icon="home">Home</TabButton>
      </TabTrigger>
      <TabTrigger name="code" asChild href="/code" reset="always">
        <TabButton icon="code">Projects</TabButton>
      </TabTrigger>
      <TabTrigger name="games" asChild href="/games">
        <TabButton icon="videogame-asset">Games</TabButton>
      </TabTrigger>
      <TabTrigger name="words" asChild href="/words">
        <TabButton icon="newspaper">Words</TabButton>
      </TabTrigger>
    </TabList>
  );
  return (
    <View className="flex-1">
      <Tabs className="flex-1 sm:flex-col-reverse">
        <View className="flex-1">
          <TabSlot />
        </View>
        {tabs}
      </Tabs>
      <View
        className={classNames(
          "hidden sm:inline",
          "absolute left-6 top-5 h-10 w-52"
        )}
      >
      </View>
    </View>
  );
}