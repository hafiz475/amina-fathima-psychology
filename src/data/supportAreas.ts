export type SupportTone = "sky" | "apricot" | "sun" | "sage";

export interface SupportCategory {
  id: string;
  title: string;
  tone: SupportTone;
  concerns: string[];
}

export const supportCategories: SupportCategory[] = [
  {
    id: "clinical",
    title: "Clinical psychological concerns",
    tone: "sky",
    concerns: [
      "Depression & Low Mood",
      "Anxiety & Panic Attacks",
      "Stress & Burnout",
      "Overthinking & Worry",
      "Mood Swings",
      "Suicidal Thoughts",
      "Obsessive Thoughts",
      "Sleep Difficulties",
    ],
  },
  {
    id: "emotional",
    title: "Emotional concerns",
    tone: "apricot",
    concerns: [
      "Emotional Regulation & Outbursts",
      "Low Self-Esteem & Self-Worth",
      "Loneliness & Isolation",
      "Grief, Loss & Bereavement",
      "Fear, Phobias & Insecurities",
      "Lack of Motivation",
    ],
  },
  {
    id: "behavioural",
    title: "Behavioral concerns",
    tone: "sun",
    concerns: [
      "Anger Management",
      "Impulse Control",
      "Self-Sabotaging Patterns",
      "Habit Changes",
      "Procrastination",
    ],
  },
  {
    id: "relationships",
    title: "Relationship & family concerns",
    tone: "sage",
    concerns: [
      "Relationship & Communication Issues",
      "Trust Issues",
      "Breakups & Heartbreak",
      "Family Conflicts",
      "Parenting Challenges",
    ],
  },
  {
    id: "trauma",
    title: "Trauma & childhood concerns",
    tone: "sky",
    concerns: [
      "Childhood Trauma",
      "Emotional Neglect",
      "Attachment Issues",
      "Inner Child Healing",
      "Difficult Life Experiences",
    ],
  },
  {
    id: "academic-career",
    title: "Academic & career concerns",
    tone: "apricot",
    concerns: [
      "Academic Stress & Exam Anxiety",
      "Career Confusion",
      "Work-Life Balance",
      "Performance Pressure",
      "Goal Setting & Motivation",
    ],
  },
];

export const therapeuticApproaches = [
  "Cognitive Behavioral Therapy (CBT)",
  "Mindfulness-Based Interventions",
  "Trauma-Informed Therapy",
  "Inner Child Healing Work",
  "Emotional Regulation Techniques",
  "Strength-Based Counseling",
  "Solution-Focused Therapy",
  "Psychoeducation & Skill Building",
];
