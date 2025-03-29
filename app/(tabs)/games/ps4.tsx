import { ScrollView, View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function PS4Guide() {
  return (
    <ScrollView className="flex-1">
      <Stack.Screen 
        options={{
          title: "Phantasy Star IV Guide"
        }}
      />
      
      <View className="p-4 space-y-4">
        <Text className="text-2xl font-bold">Phantasy Star IV: End of the Millennium</Text>
        
        <View className="bg-white p-4 rounded-lg shadow">
          <Text className="text-lg font-bold mb-2">Spell Guide</Text>
          <Text className="text-gray-600">
            Coming soon: A comprehensive guide to understanding the cryptic spell names and their effects in Phantasy Star IV.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
