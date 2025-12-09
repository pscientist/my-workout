import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Dummy data
const streakData = {
  days: 12,
  message: "Keep it going! Rest days still count as long as you move.",
};

const weeklyTraining = {
  current: 87,
  goal: 150,
  unit: "mins",
};

const lastWorkouts = [
  {
    id: 1,
    title: "HIIT 30",
    duration: "30 mins",
    type: "High",
    completed: "Yesterday",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Strength 45",
    duration: "45 mins",
    type: "Strength",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop",
  },
];

const nextWorkout = {
  title: "Strength 45",
  duration: "45 mins",
  type: "Strength",
  difficulty: "Intermediate",
  image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop",
};

export default function Index() {
  const progressPercentage = (weeklyTraining.current / weeklyTraining.goal) * 100;

  const handleWorkoutPress = () => {
    router.push("./workout-detail" as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak Section */}
        <View style={styles.streakCard}>
          <Ionicons name="flame" size={24} color="#FF6B35" />
          <View style={styles.streakTextContainer}>
            <Text style={styles.streakNumber}>{streakData.days}-day streak</Text>
            <Text style={styles.streakMessage}>{streakData.message}</Text>
          </View>
        </View>

        {/* This Week's Training Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This week's training</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {weeklyTraining.current} / {weeklyTraining.goal} {weeklyTraining.unit}
          </Text>
        </View>

        {/* Last Workout Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last workout</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {lastWorkouts.map((workout) => (
              <Pressable
                key={workout.id}
                onPress={handleWorkoutPress}
                style={styles.workoutCard}
              >
                <Image
                  source={{ uri: workout.image }}
                  style={styles.workoutImage}
                  contentFit="cover"
                />
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDetails}>
                  {workout.duration} · {workout.type}
                </Text>
                <Text style={styles.workoutMeta}>
                  {workout.completed || workout.difficulty}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Next Up Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next up for you</Text>
          <Pressable onPress={handleWorkoutPress}>
            <View style={styles.nextWorkoutCard}>
              <Image
                source={{ uri: nextWorkout.image }}
                style={styles.nextWorkoutImage}
                contentFit="cover"
              />
              <Text style={styles.workoutTitle}>{nextWorkout.title}</Text>
              <Text style={styles.workoutDetails}>
                {nextWorkout.duration} · {nextWorkout.type}
              </Text>
              <Text style={styles.workoutMeta}>{nextWorkout.difficulty}</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0E27",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  streakCard: {
    flexDirection: "row",
    backgroundColor: "#1A1F3A",
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    alignItems: "center",
  },
  streakTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  streakNumber: {
    color: "#00D9D9",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  streakMessage: {
    color: "#9CA3AF",
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: "#1A1F3A",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#00D9D9",
    borderRadius: 6,
  },
  progressText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  workoutCard: {
    width: width * 0.6,
    marginRight: 16,
    backgroundColor: "#1A1F3A",
    borderRadius: 16,
    overflow: "hidden",
  },
  workoutImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#2A2F4A",
  },
  workoutTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginHorizontal: 12,
  },
  workoutDetails: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 4,
    marginHorizontal: 12,
  },
  workoutMeta: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
    marginHorizontal: 12,
  },
  nextWorkoutCard: {
    backgroundColor: "#1A1F3A",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#00D9D9",
  },
  nextWorkoutImage: {
    width: "100%",
    height: 250,
    backgroundColor: "#2A2F4A",
  },
});
