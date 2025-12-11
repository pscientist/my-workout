import workouts from "../../assets/data/workouts.json";

export type Workout = {
    id: number;
    title: string;
    duration: string;
    type?: string;
    difficulty?: string;
    completed?: string;
    image: string;
};

// Set this to true if the buyer wants to use their own API
const USE_REMOTE_API = false;

// -----------------------------------------
// MODIFY THIS FUNCTION to use your own API
// -----------------------------------------
export async function getWorkouts(): Promise<Workout[]> {
    if (!USE_REMOTE_API) {
        // Simulate network delay so loading state is visible
        await new Promise((resolve) => setTimeout(resolve, 400));
        return workouts as Workout[];
    }

    const res = await fetch("https://YOUR_API_HERE/workouts");

    if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
    }

    const json = (await res.json()) as Workout[];
    return json;
}
