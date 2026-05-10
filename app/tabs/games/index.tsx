import { ScrollView, View, Text, Pressable } from 'react-native';
import { Image } from "expo-image";
import games from '@/content/games/games';
import { Link } from 'expo-router';

export default function GamesScreen() {
  return (
    <ScrollView className="flex-1">
      <View className="p-4 space-y-4">
        {games.map((game, index) => (
          <Link href={game.route} key={index} asChild relativeToDirectory>
            <Pressable className="flex-row bg-white p-4 rounded-lg shadow">
            {/* Image Column */}
            <View className="w-40 mr-4 self-center">
              <Image
                source={game.image}
                className="w-40 h-40 rounded-lg self-center"
              />
            </View>

            {/* Content Column */}
            <View className="flex-1">
              <Text className="text-lg font-bold">{game.title}</Text>
              
              <View className="mt-1">
                <Text className="text-sm text-gray-600">
                  System: {game.system}
                </Text>
                <Text className="text-sm text-gray-600">
                  Played on: {game.playedOn}
                </Text>
                <Text className="text-sm text-gray-600">
                  Timeframe: {game.playedWhen}
                </Text>
              </View>

              {game.description && (
                <Text className="text-gray-600 mt-2">{game.description}</Text>
              )}

              {game.guideContent && (
                <View className="mt-2">
                  <Text className="font-semibold">Guide Contents:</Text>
                  <Text className="text-sm text-gray-600">
                    {game.guideContent}
                  </Text>
                </View>
              )}
            </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
