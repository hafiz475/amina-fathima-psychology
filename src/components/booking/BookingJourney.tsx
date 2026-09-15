"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  Compass,
  Copy,
  GraduationCap,
  Heart,
  HeartHandshake,
  LifeBuoy,
  LockKeyhole,
  MessageCircleHeart,
  Repeat2,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import BookingIcon from "@/components/ui/BookingIcon";
import { createWhatsAppUrl } from "@/data/contact";
import { services } from "@/data/services";
import { supportCategories } from "@/data/supportAreas";
import "./booking.scss";

type BookingFormData = {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  language: string;
  sessionMode: string;
  location: string;
  concerns: string[];
  concernNotes: string;
  service: string;
  serviceFocus: string[];
  serviceAudience: string;
  serviceGoal: string;
  serviceContext: string;
  contactingAs: string;
  organizationNeeds: string[];
  employeeCount: string;
  eapFirst: string;
  urgency: string;
  workshopFormat: string;
  duration: string;
  impact: string;
  therapyBefore: string;
  currentProfessional: string;
  goals: string;
  previousSupport: string[];
  previousNotes: string;
  comfort: string[];
  preferredDay: string;
  preferredTime: string;
  preferredLanguage: string;
  consentContact: boolean;
  consentReview: boolean;
};

type FieldErrors = Record<string, string>;

const initialForm: BookingFormData = {
  fullName: "",
  age: "",
  email: "",
  phone: "",
  language: "",
  sessionMode: "",
  location: "",
  concerns: [],
  concernNotes: "",
  service: "",
  serviceFocus: [],
  serviceAudience: "",
  serviceGoal: "",
  serviceContext: "",
  contactingAs: "",
  organizationNeeds: [],
  employeeCount: "",
  eapFirst: "",
  urgency: "",
  workshopFormat: "",
  duration: "",
  impact: "",
  therapyBefore: "",
  currentProfessional: "",
  goals: "",
  previousSupport: [],
  previousNotes: "",
  comfort: [],
  preferredDay: "",
  preferredTime: "",
  preferredLanguage: "",
  consentContact: false,
  consentReview: false,
};

const steps = [
  { short: "Begin", label: "A gentle beginning" },
  { short: "You", label: "A little about you" },
  { short: "Concerns", label: "What brings you here" },
  { short: "Support", label: "The support you need" },
  { short: "Hopes", label: "Your situation and hopes" },
  { short: "Time", label: "Appointment preferences" },
] as const;

const stepArtwork = [
  {
    src: "/images/illustrations/booking/gentle-beginning.webp",
    alt: "A counsellor warmly welcoming a client into a calm room",
    note: "Begin at your own pace.",
  },
  {
    src: "/images/illustrations/booking/gentle-beginning.webp",
    alt: "A counsellor warmly welcoming a client into a calm room",
    note: "Only share what feels comfortable.",
  },
  {
    src: "/images/illustrations/booking/share-what-matters.webp",
    alt: "A person reflecting calmly with an open journal",
    note: "You do not need clinical words.",
  },
  {
    src: "/images/illustrations/booking/share-what-matters.webp",
    alt: "A person reflecting calmly with an open journal",
    note: "Not sure which service fits? That is okay.",
  },
  {
    src: "/images/illustrations/booking/share-what-matters.webp",
    alt: "A person reflecting calmly with an open journal",
    note: "There is no perfect answer.",
  },
  {
    src: "/images/illustrations/booking/request-sent.webp",
    alt: "A counselling request moving from a client to a counsellor",
    note: "Review your message before sending.",
  },
] as const;

const concernIcons: Record<string, LucideIcon> = {
  clinical: Brain,
  emotional: Heart,
  behavioural: Repeat2,
  relationships: HeartHandshake,
  trauma: ShieldCheck,
  "academic-career": GraduationCap,
};

const serviceIcons: Record<string, LucideIcon> = {
  "individual-counselling": UserRound,
  "relationship-counselling": HeartHandshake,
  "workplace-mental-health": Building2,
  "eap-counselling": ShieldCheck,
  "crisis-intervention": LifeBuoy,
  workshops: BookOpen,
  unsure: Compass,
};

const serviceChoices = [
  ...services,
  {
    id: "unsure",
    number: "07",
    title: "I’m not sure yet",
    description:
      "You do not need to choose the perfect service. We can understand that together.",
    areas: [],
  },
];

const languages = ["English", "Hindi", "Urdu"];
const sessionModes = ["Online", "In-person", "Either is fine"];
const durationOptions = [
  "Recently",
  "A few weeks",
  "A few months",
  "More than a year",
  "On and off for some time",
  "I’m not sure",
];
const impactOptions = [
  "A little",
  "Somewhat",
  "Quite a lot",
  "Significantly",
  "I’m not sure",
];
const previousSupportOptions = [
  "Counselling / Therapy",
  "Psychiatric consultation",
  "Self-help / books",
  "Support from family or friends",
  "Nothing so far",
  "Prefer not to say",
];
const comfortOptions = [
  "A calm, structured conversation",
  "A space to speak freely",
  "Practical strategies",
  "Understanding patterns and emotions",
  "Working toward specific goals",
  "Taking things slowly",
  "I’m not sure yet",
];

interface ChoiceGridProps {
  name: string;
  options: readonly string[];
  selected: string | string[];
  multiple?: boolean;
  compact?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
}

function ChoiceGrid({
  name,
  options,
  selected,
  multiple = false,
  compact = false,
  required = false,
  onChange,
}: ChoiceGridProps) {
  return (
    <div className={`booking-choices${compact ? " booking-choices--compact" : ""}`}>
      {options.map((option) => {
        const isSelected = Array.isArray(selected)
          ? selected.includes(option)
          : selected === option;

        return (
          <label
            key={option}
            className={`booking-choice${isSelected ? " booking-choice--selected" : ""}`}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={option}
              checked={isSelected}
              required={required}
              onChange={() => onChange(option)}
            />
            <span className="booking-choice-mark" aria-hidden="true">
              <Check size={13} strokeWidth={2.6} />
            </span>
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

function TextField({ id, label, error, required, ...props }: TextFieldProps) {
  return (
    <div className="booking-field">
      <label htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p className="booking-field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  hint?: string;
}

function TextAreaField({ id, label, hint, ...props }: TextAreaFieldProps) {
  return (
    <div className="booking-field booking-field--wide">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="booking-field-hint">{hint}</p>}
      <textarea id={id} {...props} />
    </div>
  );
}

function buildWhatsAppMessage(form: BookingFormData) {
  const serviceName =
    serviceChoices.find((service) => service.id === form.service)?.title ||
    "Not selected";
  const lines = [
    "Hello Syed Amina, I would like to request a counselling session through the Sirat website.",
  ];

  const addSection = (title: string) => lines.push("", `*${title}*`);
  const addDetail = (label: string, value: string | string[]) => {
    const detail = Array.isArray(value) ? value.join(", ") : value.trim();
    if (detail) lines.push(`${label}: ${detail}`);
  };

  addSection("ABOUT ME");
  addDetail("Name", form.fullName);
  addDetail("Age", form.age);
  addDetail("Email", form.email);
  addDetail("Phone / WhatsApp", form.phone);
  addDetail("Preferred language", form.language);
  addDetail("Session format", form.sessionMode);
  addDetail("Current location", form.location);

  addSection("WHAT BRINGS ME HERE");
  addDetail(
    "Concerns",
    form.concerns.length
      ? form.concerns
      : "I would prefer to discuss this directly",
  );
  addDetail("In my own words", form.concernNotes);

  addSection("SUPPORT REQUESTED");
  addDetail("Service", serviceName);
  addDetail("Focus", form.serviceFocus);
  addDetail("Who it is for", form.serviceAudience);
  addDetail("Contacting as", form.contactingAs);
  addDetail("Organization / program needs", form.organizationNeeds);
  addDetail("Audience / employee size", form.employeeCount);
  addDetail("First EAP counselling experience", form.eapFirst);
  addDetail("Workshop format", form.workshopFormat);
  addDetail("Urgency", form.urgency);
  addDetail("Additional context", form.serviceContext);
  addDetail("What I hope to improve", form.serviceGoal);

  addSection("MY SITUATION AND HOPES");
  addDetail("How long", form.duration);
  addDetail("Day-to-day impact", form.impact);
  addDetail("Previous counselling", form.therapyBefore);
  addDetail("Currently seeing another professional", form.currentProfessional);
  addDetail("What I would like from counselling", form.goals);
  addDetail("Previous support", form.previousSupport);
  addDetail("What felt helpful or unhelpful", form.previousNotes);
  addDetail("What may help me feel comfortable", form.comfort);

  addSection("APPOINTMENT PREFERENCES");
  addDetail("Preferred day", form.preferredDay);
  addDetail("Preferred time", form.preferredTime);
  addDetail("Session language", form.preferredLanguage);
  lines.push(
    "",
    "I understand this is a request and the appointment will be reviewed before confirmation.",
  );

  return lines.join("\n");
}

export default function BookingJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);
  const [messageDraft, setMessageDraft] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const journeyRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const completeHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasMovedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  const artwork = submitted
    ? stepArtwork[5]
    : stepArtwork[Math.min(activeStep, stepArtwork.length - 1)];
  const progress = submitted
    ? 100
    : Math.round(((activeStep + 1) / steps.length) * 100);
  const selectedService = useMemo(
    () => serviceChoices.find((service) => service.id === form.service),
    [form.service],
  );
  const needsSafetyNote =
    form.service === "crisis-intervention" ||
    form.concerns.includes("Suicidal Thoughts");

  const updateField = <Key extends keyof BookingFormData>(
    key: Key,
    value: BookingFormData[Key],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const toggleList = (
    key: "concerns" | "serviceFocus" | "organizationNeeds" | "previousSupport" | "comfort",
    value: string,
  ) => {
    const current = form[key];
    updateField(
      key,
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const chooseService = (service: string) => {
    setForm((current) => ({
      ...current,
      service,
      serviceFocus: [],
      serviceAudience: "",
      serviceGoal: "",
      serviceContext: "",
      contactingAs: "",
      organizationNeeds: [],
      employeeCount: "",
      eapFirst: "",
      urgency: "",
      workshopFormat: "",
    }));
    setErrors((current) => {
      const next = { ...current };
      delete next.service;
      return next;
    });
  };

  const validateStep = (step: number) => {
    const nextErrors: FieldErrors = {};

    if (step === 1) {
      if (!form.fullName.trim()) nextErrors.fullName = "Please enter your name.";
      if (!form.age.trim()) {
        nextErrors.age = "Please enter your age.";
      } else {
        const age = Number(form.age);
        if (!Number.isInteger(age) || age < 1 || age > 120) {
          nextErrors.age = "Please enter an age between 1 and 120.";
        }
      }
      if (!form.email.trim()) {
        nextErrors.email = "Please enter your email address.";
      } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        nextErrors.email = "Please enter a valid email address.";
      }
      if (!form.phone.trim()) {
        nextErrors.phone = "Please enter a phone or WhatsApp number.";
      } else {
        const phoneDigits = form.phone.replace(/\D/g, "");
        if (
          !/^[+()\d\s-]+$/.test(form.phone) ||
          phoneDigits.length < 7 ||
          phoneDigits.length > 15
        ) {
          nextErrors.phone = "Please enter a valid phone number with country code.";
        }
      }
      if (!form.language) nextErrors.language = "Please choose a language.";
      if (!form.sessionMode) {
        nextErrors.sessionMode = "Please choose a session format.";
      }
    }

    if (step === 3 && !form.service) {
      nextErrors.service = "Please choose an option, including ‘I’m not sure yet’.";
    }

    if (
      step === 3 &&
      form.service === "crisis-intervention" &&
      !form.urgency
    ) {
      nextErrors.urgency = "Please tell us whether this feels urgent.";
    }

    if (step === 5) {
      if (!form.preferredDay) {
        nextErrors.preferredDay = "Please choose a preferred day.";
      }
      if (!form.preferredTime) {
        nextErrors.preferredTime = "Please choose a preferred time.";
      }
      if (!form.preferredLanguage) {
        nextErrors.preferredLanguage = "Please choose a session language.";
      }
      if (!form.consentContact) {
        nextErrors.consentContact = "Please agree to be contacted.";
      }
      if (!form.consentReview) {
        nextErrors.consentReview = "Please confirm you understand the review process.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const moveToStep = (step: number) => {
    hasMovedRef.current = true;
    setActiveStep(step);
  };

  const focusFirstError = () => {
    window.requestAnimationFrame(() => {
      journeyRef.current
        ?.querySelector<HTMLElement>("[aria-invalid='true'], .booking-error")
        ?.focus();
    });
  };

  const goNext = () => {
    if (!validateStep(activeStep)) {
      focusFirstError();
      return;
    }

    moveToStep(Math.min(activeStep + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrors({});
    moveToStep(Math.max(activeStep - 1, 0));
  };

  useEffect(() => {
    if (!hasMovedRef.current || submitted) return;

    journeyRef.current?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
    window.setTimeout(() => stepHeadingRef.current?.focus(), 100);
  }, [activeStep, shouldReduceMotion, submitted]);

  useEffect(() => {
    if (!submitted) return;
    window.requestAnimationFrame(() => completeHeadingRef.current?.focus());
  }, [submitted]);

  const submitRequest = () => {
    if (!validateStep(5)) {
      focusFirstError();
      return;
    }

    const draft = buildWhatsAppMessage(form);
    const url = createWhatsAppUrl(draft);
    setMessageDraft(draft);
    setWhatsAppUrl(url);
    setSubmitted(true);
  };

  const copyRequest = async () => {
    if (!navigator.clipboard) {
      setCopyStatus("Select and copy the prepared message below.");
      return;
    }

    try {
      await navigator.clipboard.writeText(messageDraft);
      setCopyStatus("Prepared request copied.");
    } catch {
      setCopyStatus("Select and copy the prepared message below.");
    }
  };

  const renderServiceQuestions = () => {
    switch (form.service) {
      case "individual-counselling":
        return (
          <div className="booking-followup">
            <fieldset>
              <legend>What would you like support with?</legend>
              <ChoiceGrid
                name="individual-focus"
                options={[
                  "Anxiety & Stress",
                  "Emotional Distress",
                  "Self-Esteem",
                  "Life Transitions",
                  "Emotional Regulation",
                  "Coping & Resilience",
                  "Other",
                ]}
                selected={form.serviceFocus}
                multiple
                compact
                onChange={(value) => toggleList("serviceFocus", value)}
              />
            </fieldset>
            <TextAreaField
              id="individual-goal"
              label="What would make counselling feel worthwhile for you?"
              hint="You can share what you would most like to change or understand."
              value={form.serviceGoal}
              onChange={(event) => updateField("serviceGoal", event.target.value)}
              rows={4}
              maxLength={800}
            />
          </div>
        );

      case "relationship-counselling":
        return (
          <div className="booking-followup">
            <fieldset>
              <legend>Who would you like support for?</legend>
              <ChoiceGrid
                name="relationship-audience"
                options={[
                  "Myself",
                  "My partner and I",
                  "Family / family members",
                  "Parenting concerns",
                  "I’m unsure",
                ]}
                selected={form.serviceAudience}
                compact
                onChange={(value) => updateField("serviceAudience", value)}
              />
            </fieldset>
            <fieldset>
              <legend>What brings you to counselling?</legend>
              <ChoiceGrid
                name="relationship-focus"
                options={[
                  "Communication difficulties",
                  "Repeated conflict",
                  "Trust concerns",
                  "Breakup / separation",
                  "Emotional disconnection",
                  "Family conflict",
                  "Other",
                ]}
                selected={form.serviceFocus}
                multiple
                compact
                onChange={(value) => toggleList("serviceFocus", value)}
              />
            </fieldset>
            <TextAreaField
              id="relationship-goal"
              label="What would you hope to improve?"
              hint="Share only what feels comfortable."
              value={form.serviceGoal}
              onChange={(event) => updateField("serviceGoal", event.target.value)}
              rows={4}
              maxLength={800}
            />
          </div>
        );

      case "workplace-mental-health": {
        const isOrganization = [
          "HR / People Team",
          "Manager / Organization",
        ].includes(form.contactingAs);

        return (
          <div className="booking-followup">
            <fieldset>
              <legend>What kind of workplace support are you looking for?</legend>
              <ChoiceGrid
                name="workplace-focus"
                options={[
                  "Personal workplace stress",
                  "Burnout",
                  "Work-life balance",
                  "Interpersonal concerns",
                  "Performance pressure",
                  "Emotional wellbeing",
                  "Career-related concerns",
                  "Other",
                ]}
                selected={form.serviceFocus}
                multiple
                compact
                onChange={(value) => toggleList("serviceFocus", value)}
              />
            </fieldset>
            <fieldset>
              <legend>Who are you contacting us as?</legend>
              <ChoiceGrid
                name="workplace-contacting-as"
                options={[
                  "Employee",
                  "HR / People Team",
                  "Manager / Organization",
                  "Other",
                ]}
                selected={form.contactingAs}
                compact
                onChange={(value) => updateField("contactingAs", value)}
              />
            </fieldset>
            {isOrganization && (
              <>
                <fieldset>
                  <legend>What is your organization looking for?</legend>
                  <ChoiceGrid
                    name="organization-needs"
                    options={[
                      "Employee counselling",
                      "EAP support",
                      "Mental health workshops",
                      "Psychoeducation",
                      "Employee wellbeing program",
                      "Other",
                    ]}
                    selected={form.organizationNeeds}
                    multiple
                    compact
                    onChange={(value) => toggleList("organizationNeeds", value)}
                  />
                </fieldset>
                <fieldset>
                  <legend>Approximate number of employees</legend>
                  <ChoiceGrid
                    name="employee-count"
                    options={["1–25", "26–100", "101–500", "500+"]}
                    selected={form.employeeCount}
                    compact
                    onChange={(value) => updateField("employeeCount", value)}
                  />
                </fieldset>
              </>
            )}
            <TextAreaField
              id="workplace-context"
              label={
                isOrganization
                  ? "Tell us briefly what your organization needs"
                  : "What would you like support with at work?"
              }
              value={form.serviceContext}
              onChange={(event) => updateField("serviceContext", event.target.value)}
              rows={4}
              maxLength={800}
            />
          </div>
        );
      }

      case "eap-counselling":
        return (
          <div className="booking-followup">
            <fieldset>
              <legend>Who is the counselling support for?</legend>
              <ChoiceGrid
                name="eap-audience"
                options={[
                  "Employee",
                  "Spouse / Partner",
                  "Child / Dependent",
                  "Other family member",
                ]}
                selected={form.serviceAudience}
                compact
                onChange={(value) => updateField("serviceAudience", value)}
              />
            </fieldset>
            <fieldset>
              <legend>What would you like support with?</legend>
              <ChoiceGrid
                name="eap-focus"
                options={[
                  "Stress",
                  "Burnout",
                  "Emotional concerns",
                  "Relationship concerns",
                  "Family concerns",
                  "Workplace concerns",
                  "Crisis / high distress",
                  "Other",
                ]}
                selected={form.serviceFocus}
                multiple
                compact
                onChange={(value) => toggleList("serviceFocus", value)}
              />
            </fieldset>
            <fieldset>
              <legend>Is this your first EAP counselling experience?</legend>
              <ChoiceGrid
                name="eap-first"
                options={["Yes", "No", "I’m not sure"]}
                selected={form.eapFirst}
                compact
                onChange={(value) => updateField("eapFirst", value)}
              />
            </fieldset>
          </div>
        );

      case "crisis-intervention":
        return (
          <div className="booking-followup">
            <div className="booking-safety-note" role="alert">
              <LifeBuoy size={22} aria-hidden="true" />
              <p>
                <strong>This form is not an emergency service.</strong> If you
                are in immediate danger or unable to keep yourself or someone
                else safe, contact local emergency services or go to the nearest
                emergency department.
              </p>
            </div>
            <fieldset>
              <legend>What best describes this difficult moment?</legend>
              <ChoiceGrid
                name="crisis-focus"
                options={[
                  "I’m feeling overwhelmed",
                  "I’m struggling to stay safe",
                  "I’m experiencing thoughts of self-harm",
                  "I’m supporting someone who may be at risk",
                  "I’m experiencing an acute emotional crisis",
                  "Something else",
                ]}
                selected={form.serviceFocus}
                multiple
                onChange={(value) => toggleList("serviceFocus", value)}
              />
            </fieldset>
            <fieldset
              aria-required="true"
              aria-describedby={errors.urgency ? "urgency-error" : undefined}
            >
              <legend>
                Would you consider your situation urgent? <span aria-hidden="true">*</span>
              </legend>
              <ChoiceGrid
                name="crisis-urgency"
                options={["Yes", "No", "I’m not sure"]}
                selected={form.urgency}
                compact
                required
                onChange={(value) => updateField("urgency", value)}
              />
              {errors.urgency && (
                <p className="booking-field-error booking-error" id="urgency-error" tabIndex={-1}>
                  {errors.urgency}
                </p>
              )}
            </fieldset>
          </div>
        );

      case "workshops":
        return (
          <div className="booking-followup">
            <fieldset>
              <legend>Who is the program for?</legend>
              <ChoiceGrid
                name="workshop-audience"
                options={[
                  "Organization",
                  "College / University",
                  "School",
                  "Community group",
                  "Other",
                ]}
                selected={form.serviceAudience}
                compact
                onChange={(value) => updateField("serviceAudience", value)}
              />
            </fieldset>
            <fieldset>
              <legend>What are you looking for?</legend>
              <ChoiceGrid
                name="workshop-needs"
                options={[
                  "Mental health awareness",
                  "Stress management",
                  "Emotional intelligence",
                  "Resilience building",
                  "Workplace wellbeing",
                  "Other",
                ]}
                selected={form.organizationNeeds}
                multiple
                compact
                onChange={(value) => toggleList("organizationNeeds", value)}
              />
            </fieldset>
            <div className="booking-field-row">
              <fieldset>
                <legend>Approximate audience size</legend>
                <ChoiceGrid
                  name="audience-size"
                  options={["Under 25", "25–50", "51–100", "101–250", "250+"]}
                  selected={form.employeeCount}
                  compact
                  onChange={(value) => updateField("employeeCount", value)}
                />
              </fieldset>
              <fieldset>
                <legend>Preferred format</legend>
                <ChoiceGrid
                  name="workshop-format"
                  options={["Online", "In-person", "Either"]}
                  selected={form.workshopFormat}
                  compact
                  onChange={(value) => updateField("workshopFormat", value)}
                />
              </fieldset>
            </div>
            <TextAreaField
              id="workshop-context"
              label="Tell me about your requirement"
              value={form.serviceContext}
              onChange={(event) => updateField("serviceContext", event.target.value)}
              rows={4}
              maxLength={800}
            />
          </div>
        );

      case "unsure":
        return (
          <div className="booking-reassurance" role="note">
            <Compass size={23} aria-hidden="true" />
            <div>
              <strong>You do not need to diagnose yourself.</strong>
              <p>
                Share what feels important in the next step. Syed Amina can help
                identify an appropriate starting point after reviewing your request.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="booking-page" aria-labelledby="booking-page-title">
      <div className="container">
        <header className="booking-page-heading">
          <span className="label label--sky">
            <BookingIcon />
            Book a session
          </span>
          <h1 id="booking-page-title">Begin where you are.</h1>
          <p>
            A warm, guided request—followed by a personal conversation. No
            payment is collected here.
          </p>
        </header>

        <div className="booking-journey" ref={journeyRef}>
          <aside className="booking-story" aria-label="Booking journey illustration">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="booking-story-art"
                key={artwork.src}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
              >
                <Image
                  src={artwork.src}
                  alt={artwork.alt}
                  fill
                  preload={activeStep === 0}
                  sizes="(max-width: 899px) 94vw, 420px"
                />
              </motion.div>
            </AnimatePresence>
            <div className="booking-story-caption">
              <span aria-hidden="true">
                <Sparkles size={16} />
              </span>
              <p>{artwork.note}</p>
            </div>
            <div className="booking-story-trust">
              <LockKeyhole size={17} aria-hidden="true" />
              <p>
                Your answers stay on this page while you complete the form. At
                the end, you choose whether to open the WhatsApp draft.
              </p>
            </div>
          </aside>

          <div className="booking-form-card">
            <div className="booking-progress" aria-label="Booking progress">
              <div className="booking-progress-topline">
                <span>
                  {submitted ? "Ready to send" : `Step ${activeStep + 1} of ${steps.length}`}
                </span>
                <strong>{progress}%</strong>
              </div>
              <div
                className="booking-progress-track"
                role="progressbar"
                aria-label="Booking request progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
              <ol className="booking-step-list">
                {steps.map((step, index) => (
                  <li
                    key={step.short}
                    className={
                      index === activeStep && !submitted
                        ? "booking-step-current"
                        : index < activeStep || submitted
                          ? "booking-step-complete"
                          : ""
                    }
                    aria-current={index === activeStep && !submitted ? "step" : undefined}
                    aria-label={`${step.label}, ${
                      index === activeStep && !submitted
                        ? "current step"
                        : index < activeStep || submitted
                          ? "completed"
                          : "not started"
                    }`}
                  >
                    <span aria-hidden="true">
                      {index < activeStep || submitted ? <Check size={12} /> : index + 1}
                    </span>
                    <small>{step.short}</small>
                  </li>
                ))}
              </ol>
            </div>

            {submitted ? (
              <motion.div
                className="booking-complete"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="booking-complete-icon" aria-hidden="true">
                  <CheckCircle2 size={29} />
                </span>
                <p className="booking-step-eyebrow">Your request is prepared</p>
                <h2 ref={completeHeadingRef} tabIndex={-1}>
                  Your request is ready to review.
                </h2>
                <p>
                  Nothing has left this page yet. Review the prepared message
                  before choosing whether to continue to WhatsApp.
                </p>
                <dl className="booking-summary">
                  <div>
                    <dt>Requested support</dt>
                    <dd>{selectedService?.title || "Not sure yet"}</dd>
                  </div>
                  <div>
                    <dt>Preferred time</dt>
                    <dd>{form.preferredDay}, {form.preferredTime}</dd>
                  </div>
                  <div>
                    <dt>Language</dt>
                    <dd>{form.preferredLanguage}</dd>
                  </div>
                </dl>
                <details className="booking-message-preview">
                  <summary>Review the prepared WhatsApp message</summary>
                  <textarea
                    value={messageDraft}
                    readOnly
                    rows={12}
                    aria-label="Prepared WhatsApp request"
                    onFocus={(event) => event.currentTarget.select()}
                  />
                </details>
                {whatsAppUrl ? (
                  <>
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="booking-submit booking-submit--ready"
                    >
                      <MessageCircleHeart size={20} aria-hidden="true" />
                      Open WhatsApp draft
                      <ArrowRight size={18} aria-hidden="true" />
                    </a>
                    <p className="booking-destination-note">
                      Opening the draft passes these details to WhatsApp. It is
                      sent as a chat message only after you tap Send there.
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="booking-submit booking-submit--ready"
                      onClick={copyRequest}
                    >
                      <Copy size={19} aria-hidden="true" />
                      Copy prepared request
                    </button>
                    <p className="booking-destination-note">
                      The direct Sirat WhatsApp number is not connected yet, so
                      this site will not open a generic recipient picker with your
                      personal details.
                    </p>
                    <p className="booking-copy-status" aria-live="polite">
                      {copyStatus}
                    </p>
                  </>
                )}
              </motion.div>
            ) : (
              <form
                className="booking-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitRequest();
                }}
                noValidate
              >
                <p className="sr-only" aria-live="polite">
                  {steps[activeStep].label}
                </p>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    className="booking-step-panel"
                    key={activeStep}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
                  >
                    {activeStep === 0 && (
                      <div className="booking-welcome">
                        <span className="booking-step-icon" aria-hidden="true">
                          <MessageCircleHeart size={25} />
                        </span>
                        <p className="booking-step-eyebrow">A gentle beginning</p>
                        <h2 ref={stepHeadingRef} tabIndex={-1}>
                          A first conversation starts here.
                        </h2>
                        <p className="booking-step-lead">
                          This short form helps Syed Amina understand a little about
                          what brings you here, what you would like support with, and
                          how she may be able to help.
                        </p>
                        <div className="booking-welcome-note">
                          <Heart size={18} aria-hidden="true" />
                          <p>
                            You do not need to explain everything perfectly. Share
                            only what feels comfortable—there are no right or wrong
                            answers.
                          </p>
                        </div>
                        <p className="booking-skip-note">
                          Optional questions can be skipped.
                        </p>
                      </div>
                    )}

                    {activeStep === 1 && (
                      <div>
                        <p className="booking-step-eyebrow">Tell me about you</p>
                        <h2 ref={stepHeadingRef} tabIndex={-1}>
                          A little about you
                        </h2>
                        <p className="booking-step-lead">
                          These details help us respond to your request thoughtfully.
                        </p>
                        <div className="booking-field-grid">
                          <TextField
                            id="booking-name"
                            label="Full name"
                            name="fullName"
                            autoComplete="name"
                            maxLength={120}
                            required
                            value={form.fullName}
                            error={errors.fullName}
                            onChange={(event) => updateField("fullName", event.target.value)}
                          />
                          <TextField
                            id="booking-age"
                            label="Age"
                            name="age"
                            type="number"
                            inputMode="numeric"
                            min="1"
                            max="120"
                            required
                            value={form.age}
                            error={errors.age}
                            onChange={(event) => updateField("age", event.target.value)}
                          />
                          <TextField
                            id="booking-email"
                            label="Email address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            maxLength={254}
                            required
                            value={form.email}
                            error={errors.email}
                            onChange={(event) => updateField("email", event.target.value)}
                          />
                          <TextField
                            id="booking-phone"
                            label="Phone / WhatsApp number"
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            maxLength={30}
                            required
                            value={form.phone}
                            error={errors.phone}
                            onChange={(event) => updateField("phone", event.target.value)}
                          />
                          <TextField
                            id="booking-location"
                            label="Where are you currently located?"
                            name="location"
                            placeholder="City / Country"
                            autoComplete="address-level2"
                            maxLength={120}
                            value={form.location}
                            onChange={(event) => updateField("location", event.target.value)}
                          />
                        </div>
                        <div className="booking-fieldsets">
                          <fieldset
                            aria-required="true"
                            aria-describedby={errors.language ? "language-error" : undefined}
                          >
                            <legend>
                              Preferred language <span aria-hidden="true">*</span>
                            </legend>
                            <ChoiceGrid
                              name="language"
                              options={languages}
                              selected={form.language}
                              compact
                              required
                              onChange={(value) => {
                                updateField("language", value);
                                if (!form.preferredLanguage) {
                                  updateField("preferredLanguage", value);
                                }
                              }}
                            />
                            {errors.language && (
                              <p className="booking-field-error booking-error" id="language-error" tabIndex={-1}>
                                {errors.language}
                              </p>
                            )}
                          </fieldset>
                          <fieldset
                            aria-required="true"
                            aria-describedby={errors.sessionMode ? "session-mode-error" : undefined}
                          >
                            <legend>
                              How would you prefer to have your session? <span aria-hidden="true">*</span>
                            </legend>
                            <ChoiceGrid
                              name="session-mode"
                              options={sessionModes}
                              selected={form.sessionMode}
                              compact
                              required
                              onChange={(value) => updateField("sessionMode", value)}
                            />
                            {errors.sessionMode && (
                              <p className="booking-field-error booking-error" id="session-mode-error" tabIndex={-1}>
                                {errors.sessionMode}
                              </p>
                            )}
                          </fieldset>
                        </div>
                      </div>
                    )}

                    {activeStep === 2 && (
                      <div>
                        <p className="booking-step-eyebrow">What brings you here?</p>
                        <h2 ref={stepHeadingRef} tabIndex={-1}>
                          What feels most important right now?
                        </h2>
                        <p className="booking-step-lead">
                          Choose as many as feel relevant, or skip this and share in
                          your own words.
                        </p>
                        <div className="booking-concern-groups">
                          {supportCategories.map((category, index) => {
                            const Icon = concernIcons[category.id] ?? Sparkles;
                            const selectedCount = category.concerns.filter((concern) =>
                              form.concerns.includes(concern),
                            ).length;

                            return (
                              <details key={category.id} open={index === 0 ? true : undefined}>
                                <summary>
                                  <span className={`booking-concern-icon booking-concern-icon--${category.tone}`} aria-hidden="true">
                                    <Icon size={20} strokeWidth={1.8} />
                                  </span>
                                  <span>
                                    <strong>{category.title}</strong>
                                    <small>
                                      {selectedCount
                                        ? `${selectedCount} selected`
                                        : `${category.concerns.length} areas`}
                                    </small>
                                  </span>
                                  <span className="booking-summary-plus" aria-hidden="true">+</span>
                                </summary>
                                <ChoiceGrid
                                  name={`concerns-${category.id}`}
                                  options={category.concerns}
                                  selected={form.concerns}
                                  multiple
                                  compact
                                  onChange={(value) => toggleList("concerns", value)}
                                />
                              </details>
                            );
                          })}
                          <ChoiceGrid
                            name="concerns-other"
                            options={["Something else"]}
                            selected={form.concerns}
                            multiple
                            compact
                            onChange={(value) => toggleList("concerns", value)}
                          />
                        </div>
                        {form.concerns.includes("Suicidal Thoughts") && (
                          <div className="booking-safety-note" role="alert">
                            <LifeBuoy size={22} aria-hidden="true" />
                            <p>
                              <strong>Need immediate help?</strong> This request
                              form is not an emergency service. If you are unable
                              to keep yourself or someone else safe, contact local
                              emergency services or go to the nearest emergency
                              department now.
                            </p>
                          </div>
                        )}
                        <TextAreaField
                          id="concern-notes"
                          label="Is there something else you’d like me to know?"
                          hint="Share in your own words. You don’t need to use clinical terms."
                          placeholder="Only share what feels comfortable."
                          value={form.concernNotes}
                          onChange={(event) => updateField("concernNotes", event.target.value)}
                          rows={5}
                          maxLength={800}
                        />
                      </div>
                    )}

                    {activeStep === 3 && (
                      <div>
                        <p className="booking-step-eyebrow">Choose a starting point</p>
                        <h2 ref={stepHeadingRef} tabIndex={-1}>
                          What kind of support are you looking for?
                        </h2>
                        <p className="booking-step-lead">
                          You do not have to figure this out perfectly. “I’m not sure
                          yet” is always a valid choice.
                        </p>
                        <fieldset
                          aria-required="true"
                          aria-describedby={errors.service ? "service-error" : undefined}
                        >
                          <legend className="sr-only">Choose a service</legend>
                          <div className="booking-service-grid">
                            {serviceChoices.map((service) => {
                              const Icon = serviceIcons[service.id] ?? Compass;
                              const isSelected = form.service === service.id;

                              return (
                                <label
                                  key={service.id}
                                  className={`booking-service-option${isSelected ? " booking-service-option--selected" : ""}`}
                                >
                                  <input
                                    type="radio"
                                    name="service"
                                    value={service.id}
                                    checked={isSelected}
                                    required
                                    onChange={() => chooseService(service.id)}
                                  />
                                  <span className="booking-service-icon" aria-hidden="true">
                                    <Icon size={22} strokeWidth={1.75} />
                                  </span>
                                  <span>
                                    <strong>{service.title}</strong>
                                    <small>{service.description}</small>
                                  </span>
                                  <span className="booking-service-check" aria-hidden="true">
                                    <Check size={14} strokeWidth={2.5} />
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                          {errors.service && (
                            <p className="booking-field-error booking-error" id="service-error" tabIndex={-1}>
                              {errors.service}
                            </p>
                          )}
                        </fieldset>
                        {renderServiceQuestions()}
                      </div>
                    )}

                    {activeStep === 4 && (
                      <div>
                        <p className="booking-step-eyebrow">A little more context</p>
                        <h2 ref={stepHeadingRef} tabIndex={-1}>
                          What would you like to get from counselling?
                        </h2>
                        <p className="booking-step-lead">
                          Think about what you would like to understand, change,
                          manage, or feel differently about.
                        </p>
                        <div className="booking-field-row">
                          <fieldset>
                            <legend>How long have you been experiencing this?</legend>
                            <ChoiceGrid
                              name="duration"
                              options={durationOptions}
                              selected={form.duration}
                              compact
                              onChange={(value) => updateField("duration", value)}
                            />
                          </fieldset>
                          <fieldset>
                            <legend>How much is this affecting day-to-day life?</legend>
                            <ChoiceGrid
                              name="impact"
                              options={impactOptions}
                              selected={form.impact}
                              compact
                              onChange={(value) => updateField("impact", value)}
                            />
                          </fieldset>
                        </div>
                        <TextAreaField
                          id="counselling-goals"
                          label="What would you like to get from counselling?"
                          hint="For example: feel less overwhelmed, understand a pattern, improve a relationship, or feel more confident."
                          placeholder="I’d like to…"
                          value={form.goals}
                          onChange={(event) => updateField("goals", event.target.value)}
                          rows={5}
                          maxLength={800}
                        />
                        <div className="booking-field-row">
                          <fieldset>
                            <legend>Have you received counselling before?</legend>
                            <ChoiceGrid
                              name="therapy-before"
                              options={["Yes", "No", "Prefer not to say"]}
                              selected={form.therapyBefore}
                              compact
                              onChange={(value) => updateField("therapyBefore", value)}
                            />
                          </fieldset>
                          <fieldset>
                            <legend>Are you currently seeing another mental health professional?</legend>
                            <ChoiceGrid
                              name="current-professional"
                              options={["Yes", "No", "Prefer not to say"]}
                              selected={form.currentProfessional}
                              compact
                              onChange={(value) => updateField("currentProfessional", value)}
                            />
                          </fieldset>
                        </div>
                        <fieldset>
                          <legend>Have you tried anything before?</legend>
                          <ChoiceGrid
                            name="previous-support"
                            options={previousSupportOptions}
                            selected={form.previousSupport}
                            multiple
                            compact
                            onChange={(value) => toggleList("previousSupport", value)}
                          />
                        </fieldset>
                        <TextAreaField
                          id="previous-notes"
                          label="What felt helpful or unhelpful?"
                          value={form.previousNotes}
                          onChange={(event) => updateField("previousNotes", event.target.value)}
                          rows={4}
                          maxLength={800}
                        />
                        <fieldset>
                          <legend>What may help you feel comfortable in counselling?</legend>
                          <ChoiceGrid
                            name="comfort"
                            options={comfortOptions}
                            selected={form.comfort}
                            multiple
                            compact
                            onChange={(value) => toggleList("comfort", value)}
                          />
                        </fieldset>
                      </div>
                    )}

                    {activeStep === 5 && (
                      <div>
                        <p className="booking-step-eyebrow">Let’s find a suitable time</p>
                        <h2 ref={stepHeadingRef} tabIndex={-1}>
                          Appointment preferences
                        </h2>
                        <p className="booking-step-lead">
                          This is a request, not an instant confirmation. Syed Amina
                          will review it and contact you personally.
                        </p>
                        <div className="booking-fieldsets">
                          <fieldset
                            aria-required="true"
                            aria-describedby={errors.preferredDay ? "preferred-day-error" : undefined}
                          >
                            <legend>
                              Preferred day <span aria-hidden="true">*</span>
                            </legend>
                            <ChoiceGrid
                              name="preferred-day"
                              options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
                              selected={form.preferredDay}
                              compact
                              required
                              onChange={(value) => updateField("preferredDay", value)}
                            />
                            {errors.preferredDay && (
                              <p className="booking-field-error booking-error" id="preferred-day-error" tabIndex={-1}>
                                {errors.preferredDay}
                              </p>
                            )}
                          </fieldset>
                          <fieldset
                            aria-required="true"
                            aria-describedby={errors.preferredTime ? "preferred-time-error" : undefined}
                          >
                            <legend>
                              Preferred time <span aria-hidden="true">*</span>
                            </legend>
                            <ChoiceGrid
                              name="preferred-time"
                              options={["Morning", "Afternoon", "Evening", "Flexible"]}
                              selected={form.preferredTime}
                              compact
                              required
                              onChange={(value) => updateField("preferredTime", value)}
                            />
                            {errors.preferredTime && (
                              <p className="booking-field-error booking-error" id="preferred-time-error" tabIndex={-1}>
                                {errors.preferredTime}
                              </p>
                            )}
                          </fieldset>
                          <fieldset
                            aria-required="true"
                            aria-describedby={errors.preferredLanguage ? "preferred-language-error" : undefined}
                          >
                            <legend>
                              Session language <span aria-hidden="true">*</span>
                            </legend>
                            <ChoiceGrid
                              name="preferred-language"
                              options={languages}
                              selected={form.preferredLanguage}
                              compact
                              required
                              onChange={(value) => updateField("preferredLanguage", value)}
                            />
                            {errors.preferredLanguage && (
                              <p className="booking-field-error booking-error" id="preferred-language-error" tabIndex={-1}>
                                {errors.preferredLanguage}
                              </p>
                            )}
                          </fieldset>
                        </div>

                        {needsSafetyNote && (
                          <div className="booking-safety-note" role="alert">
                            <LifeBuoy size={22} aria-hidden="true" />
                            <p>
                              <strong>Need immediate help?</strong> This request form
                              is not an emergency service. If anyone is in immediate
                              danger, contact local emergency services or go to the
                              nearest emergency department.
                            </p>
                          </div>
                        )}

                        <div className="booking-consent">
                          <div>
                            <ShieldCheck size={22} aria-hidden="true" />
                            <div>
                              <strong>Your privacy matters.</strong>
                              <p>
                                Your answers are used to understand your request and
                                prepare for a possible session. Nothing is uploaded
                                by this form, and no payment is collected here.
                              </p>
                            </div>
                          </div>
                          <label>
                            <input
                              type="checkbox"
                              checked={form.consentContact}
                              onChange={(event) => updateField("consentContact", event.target.checked)}
                              aria-invalid={Boolean(errors.consentContact)}
                              aria-describedby={errors.consentContact ? "consent-contact-error" : undefined}
                            />
                            <span aria-hidden="true"><Check size={13} /></span>
                            I agree to be contacted regarding counselling and psychological services.
                          </label>
                          {errors.consentContact && (
                            <p className="booking-field-error" id="consent-contact-error">
                              {errors.consentContact}
                            </p>
                          )}
                          <label>
                            <input
                              type="checkbox"
                              checked={form.consentReview}
                              onChange={(event) => updateField("consentReview", event.target.checked)}
                              aria-invalid={Boolean(errors.consentReview)}
                              aria-describedby={errors.consentReview ? "consent-review-error" : undefined}
                            />
                            <span aria-hidden="true"><Check size={13} /></span>
                            I understand that this request is reviewed before an
                            appointment is confirmed. If I open the prepared
                            WhatsApp draft, the information I included is passed to
                            WhatsApp so I can review and send it.
                          </label>
                          {errors.consentReview && (
                            <p className="booking-field-error" id="consent-review-error">
                              {errors.consentReview}
                            </p>
                          )}
                        </div>

                        <div className="booking-send-note">
                          <MessageCircleHeart size={21} aria-hidden="true" />
                          <p>
                            Preparing your request does not open WhatsApp. You can
                            review the complete draft before deciding whether to
                            continue.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="booking-actions">
                  {activeStep > 0 ? (
                    <button type="button" className="booking-back" onClick={goBack}>
                      <ArrowLeft size={17} aria-hidden="true" />
                      Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {activeStep < steps.length - 1 ? (
                    <button type="button" className="booking-next" onClick={goNext}>
                      {activeStep === 0 ? (
                        <>
                          <BookingIcon />
                          Let&apos;s begin
                        </>
                      ) : (
                        "Continue"
                      )}
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  ) : (
                    <button type="submit" className="booking-submit">
                      <Send size={19} aria-hidden="true" />
                      Prepare WhatsApp request
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
