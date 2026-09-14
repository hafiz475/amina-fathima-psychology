export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  areas: string[];
}

export const services: Service[] = [
  {
    id: "individual-counselling",
    number: "01",
    title: "Individual Counselling",
    description:
      "A confidential space to work through emotional distress, anxiety, life transitions and personal concerns at your own pace.",
    areas: [
      "Anxiety & Stress",
      "Emotional Distress",
      "Self-Esteem",
      "Life Transitions",
      "Emotional Regulation",
      "Coping Strategies",
    ],
  },
  {
    id: "relationship-counselling",
    number: "02",
    title: "Relationship Counselling",
    description:
      "Support for individuals and couples navigating relationship concerns, communication challenges and conflict.",
    areas: [
      "Relationship Concerns",
      "Communication",
      "Conflict Resolution",
      "Couples Counselling",
      "Interpersonal Challenges",
    ],
  },
  {
    id: "workplace-mental-health",
    number: "03",
    title: "Workplace Mental Health",
    description:
      "Supporting employees and organizations with practical, confidential mental health support for sustainable wellbeing.",
    areas: [
      "Workplace Stress",
      "Burnout",
      "Employee Wellbeing",
      "Interpersonal Issues",
      "Mental Health Concerns",
    ],
  },
  {
    id: "eap-counselling",
    number: "04",
    title: "EAP Counselling",
    description:
      "Confidential counselling support for employees and dependents through Employee Assistance Programs.",
    areas: [
      "Employee Support",
      "Family Counselling",
      "Stress Management",
      "Work-Life Balance",
      "Crisis Support",
    ],
  },
  {
    id: "crisis-intervention",
    number: "05",
    title: "Crisis Intervention & Risk Assessment",
    description:
      "Support during high-distress situations through risk assessment, immediate intervention and appropriate safety planning.",
    areas: [
      "Risk Assessment",
      "Safety Planning",
      "Immediate Support",
      "Stabilisation",
      "Referral Coordination",
    ],
  },
  {
    id: "workshops",
    number: "06",
    title: "Psychoeducation & Workshops",
    description:
      "Mental health awareness and psychoeducation programs designed for organizations, communities and educational settings.",
    areas: [
      "Mental Health Awareness",
      "Stress Management",
      "Emotional Intelligence",
      "Resilience Building",
      "Community Wellbeing",
    ],
  },
];
