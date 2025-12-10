import { Workout, getWorkouts } from "@/src/api/workouts";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Button,
  Dimensions, Pressable,
  ScrollView, StyleSheet, Text, View
} from "react-native";
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

// const lastWorkouts = [
//   {
//     id: 1,
//     title: "HIIT 30",
//     duration: "30 mins",
//     type: "High",
//     completed: "Yesterday",
//     image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
//   },
//   {
//     id: 2,
//     title: "Strength 45",
//     duration: "45 mins",
//     type: "Strength",
//     difficulty: "Intermediate",
//     image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop",
//   },
// ];

const nextWorkout = {
  title: "Strength 45",
  duration: "45 mins",
  type: "Strength",
  difficulty: "Intermediate",
  image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop",
};

export default function Index() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Workout[]>({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
    staleTime: 5 * 60 * 1000, // 5 mins
    retry: 2, // retry 2 times if the request fails
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Loading workouts…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Text style={{ marginBottom: 8 }}>
          Something went wrong loading workouts.
        </Text>
        <Text style={{ marginBottom: 16, opacity: 0.7 }}>
          {(error as Error).message}
        </Text>
        <Button title="Try again" onPress={() => refetch()} />
      </View>
    );
  }

  const lastWorkouts = data ?? [];

  const progressPercentage = (weeklyTraining.current / weeklyTraining.goal) * 100;

  const handleWorkoutPress = () => {
    router.push("./workout-detail");
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
          <Ionicons name="flame" size={24} color="#14B8A6" />
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

        {lastWorkouts.length === 0 ? (<Text>No workouts found</Text>) : (
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
        )}

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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#F0F9FF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0F2FE",
  },
  streakTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  streakNumber: {
    color: "#14B8A6",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  streakMessage: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: "#E0F2FE",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#14B8A6",
    borderRadius: 6,
  },
  progressText: {
    color: "#64748B",
    fontSize: 14,
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  workoutCard: {
    width: width * 0.6,
    marginRight: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#F1F5F9",
  },
  workoutTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginHorizontal: 12,
  },
  workoutDetails: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
    marginHorizontal: 12,
  },
  workoutMeta: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
    marginHorizontal: 12,
  },
  nextWorkoutCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#14B8A6",
    shadowColor: "#14B8A6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  nextWorkoutImage: {
    width: "100%",
    height: 250,
    backgroundColor: "#F1F5F9",
  },
});
