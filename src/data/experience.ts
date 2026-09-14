export interface ExperienceEntry {
  id: string;
  title: string;
  description: string;
  details: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: "imh",
    title: "Institute of Mental Health",
    description: "Psychiatric inpatient & outpatient settings",
    details:
      "Clinical work with individuals experiencing a range of psychiatric conditions across inpatient wards and outpatient departments.",
  },
  {
    id: "rggh",
    title: "Rajiv Gandhi Government General Hospital",
    description: "Tele-counselling & psychological concerns",
    details:
      "Providing tele-counselling services and supporting patients with diverse psychological concerns in a general hospital setting.",
  },
  {
    id: "neuro-rehab",
    title: "Neurological & Rehabilitation Settings",
    description: "Clinical exposure",
    details:
      "Gaining clinical experience in neurological assessment and rehabilitation environments, supporting recovery and adjustment.",
  },
  {
    id: "children-adolescents",
    title: "Children & Adolescents",
    description: "Institutional and educational settings",
    details:
      "Working with young people in institutional care and educational contexts, addressing developmental and emotional needs.",
  },
];
