import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Dummy workout detail data
const workoutDetail = {
  id: 1,
  title: "HIIT 30",
  duration: "30 mins",
  type: "High Intensity Interval Training",
  difficulty: "Intermediate",
  calories: 350,
  description: "A high-intensity interval training workout designed to maximize your calorie burn and improve cardiovascular fitness. This workout alternates between intense bursts of activity and fixed periods of less-intense activity or rest.",
  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
  exercises: [
    { name: "Jumping Jacks", sets: "3 sets", reps: "30 seconds", rest: "30 seconds" },
    { name: "Burpees", sets: "3 sets", reps: "10 reps", rest: "45 seconds" },
    { name: "Mountain Climbers", sets: "3 sets", reps: "30 seconds", rest: "30 seconds" },
    { name: "High Knees", sets: "3 sets", reps: "30 seconds", rest: "30 seconds" },
    { name: "Plank", sets: "3 sets", reps: "45 seconds", rest: "30 seconds" },
  ],
  equipment: ["None"],
  instructor: "Sarah Johnson",
  rating: 4.8,
  completed: 1250,
};

export default function WorkoutDetail() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>Workout Detail</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Workout Image */}
        <Image
          source={{ uri: workoutDetail.image }}
          style={styles.workoutImage}
          contentFit="cover"
        />

        {/* Workout Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.workoutTitle}>{workoutDetail.title}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={20} color="#14B8A6" />
              <Text style={styles.metaText}>{workoutDetail.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={20} color="#14B8A6" />
              <Text style={styles.metaText}>{workoutDetail.calories} cal</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="barbell-outline" size={20} color="#14B8A6" />
              <Text style={styles.metaText}>{workoutDetail.difficulty}</Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>{workoutDetail.rating}</Text>
            <Text style={styles.completedText}>({workoutDetail.completed} completed)</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this workout</Text>
          <Text style={styles.description}>{workoutDetail.description}</Text>
        </View>

        {/* Exercises Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {workoutDetail.exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseCard}>
              <View style={styles.exerciseNumber}>
                <Text style={styles.exerciseNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} · {exercise.reps} · Rest {exercise.rest}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Equipment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment</Text>
          <View style={styles.equipmentCard}>
            <Ionicons name="checkmark-circle" size={20} color="#14B8A6" />
            <Text style={styles.equipmentText}>No equipment needed</Text>
          </View>
        </View>

        {/* Instructor Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructor</Text>
          <View style={styles.instructorCard}>
            <View style={styles.instructorAvatar}>
              <Ionicons name="person" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.instructorName}>{workoutDetail.instructor}</Text>
          </View>
        </View>

        {/* Start Workout Button */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.startButton}>
            <Ionicons name="play" size={24} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Start Workout</Text>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "700",
  },
  placeholder: {
    width: 32,
  },
  workoutImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#F1F5F9",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderBottomWidth: 0,
  },
  workoutTitle: {
    color: "#0F172A",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    color: "#64748B",
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  completedText: {
    color: "#64748B",
    fontSize: 14,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  description: {
    color: "#64748B",
    fontSize: 16,
    lineHeight: 24,
  },
  exerciseCard: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  exerciseNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#14B8A6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  exerciseNumberText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  exerciseDetails: {
    color: "#64748B",
    fontSize: 14,
  },
  equipmentCard: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  equipmentText: {
    color: "#0F172A",
    fontSize: 16,
  },
  instructorCard: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
  },
  instructorName: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 0,
  },
  startButton: {
    flexDirection: "row",
    backgroundColor: "#14B8A6",
    borderRadius: 16,
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});


