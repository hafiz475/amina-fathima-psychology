import type { Metadata } from "next";
import BookingJourney from "@/components/booking/BookingJourney";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Request a confidential counselling session with Syed Amina through a warm, guided booking form.",
};

export default function BookPage() {
  return <BookingJourney />;
}
