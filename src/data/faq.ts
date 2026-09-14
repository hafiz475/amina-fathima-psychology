export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "booking",
    question: "How can I book a counselling session?",
    answer:
      "You can book a session by clicking the 'Book a Session' button on this website or by reaching out directly via the contact page. I will respond within 24 hours to confirm your appointment.",
  },
  {
    id: "confidentiality",
    question: "Will my conversations remain confidential?",
    answer:
      "Yes. Confidentiality is a fundamental aspect of the counselling process. All sessions and personal information shared are kept strictly confidential, except where there is a legal or ethical obligation to disclose — which would be discussed with you beforehand.",
  },
  {
    id: "first-session",
    question: "What can I expect in my first session?",
    answer:
      "The first session is an opportunity for us to understand your concerns, explore what you are experiencing, and discuss how counselling can support you. It is a safe, non-judgmental space where you can share at your own pace.",
  },
  {
    id: "is-counselling-right",
    question:
      "How do I know whether counselling may be appropriate for what I'm experiencing?",
    answer:
      "Counselling can be helpful for a wide range of emotional and psychological concerns — from everyday stress and relationship difficulties to more complex mental health challenges. If you are unsure, an initial conversation can help determine whether counselling is a suitable next step for you.",
  },
  {
    id: "language",
    question: "Can I choose my preferred language?",
    answer:
      "Yes. Sessions are available in English, Hindi and Urdu. You are welcome to choose the language you feel most comfortable communicating in.",
  },
  {
    id: "couples",
    question: "Can I request relationship or couples counselling?",
    answer:
      "Yes. I provide support for individuals experiencing relationship concerns as well as couples counselling. Both partners are welcome to attend sessions together if that is the preferred approach.",
  },
  {
    id: "reschedule",
    question: "Can I change or reschedule my appointment?",
    answer:
      "Yes. If you need to reschedule, please provide at least 24 hours' notice so we can find an alternative time that works for you.",
  },
];
