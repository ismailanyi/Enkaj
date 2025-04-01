"use client";

interface TimeSelectorProps {
  date: Date;
  bookings: { start: string; end: string }[];
  selectedTime: string | null;
  onChange: (time: string) => void;
}

export function TimeSelector({
  date,
  bookings,
  selectedTime,
  onChange,
}: TimeSelectorProps) {
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    return slots;
  };

  const isTimeDisabled = (time: string) => {
    return bookings.some((booking) => {
      const [bookingStart, bookingEnd] = [booking.start, booking.end].map(
        (t) => new Date(`${date.toDateString()} ${t}`)
      );
      const slotTime = new Date(`${date.toDateString()} ${time}`);
      return slotTime >= bookingStart && slotTime < bookingEnd;
    });
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {timeSlots.map((time) => {
        const isDisabled = isTimeDisabled(time);
        const isSelected = time === selectedTime;

        return (
          <button
            key={time}
            onClick={() => !isDisabled && onChange(time)}
            disabled={isDisabled}
            className={`py-2 px-3 rounded ${
              isSelected
                ? "bg-teal-500 text-white"
                : isDisabled
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-zinc-800 text-white hover:bg-teal-500 hover:text-black"
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
