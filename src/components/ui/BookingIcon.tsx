import { CalendarHeart, Sparkles } from "lucide-react";

interface BookingIconProps {
  className?: string;
}

export default function BookingIcon({ className = "" }: BookingIconProps) {
  return (
    <span
      className={`booking-icon${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <CalendarHeart className="booking-icon-calendar" size={19} strokeWidth={1.9} />
      <Sparkles className="booking-icon-spark" size={10} strokeWidth={2.2} />
    </span>
  );
}
