"use client";
import { saveBooking } from "@/actions/properties";
import { AgentSelector } from "@/components/agent-selector";
import { DatePicker } from "@/components/date-picker";
import { TimeSelector } from "@/components/time-selector";
import { User } from "@/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const fetchBookings = async (date: string, agentId: number) => {
  // In a real app, this would be an API call
  return [
    { start: "10:00", end: "12:00" },
    { start: "14:00", end: "16:00" },
  ];
};

type Props = {
  agents: User[];
  propertyId: number;
};

const Pickers: React.FC<Props> = ({ agents, propertyId }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

  const [bookings, setBookings] = useState<{ start: string; end: string }[]>(
    []
  );

  useEffect(() => {
    if (selectedDate && selectedAgent) {
      fetchBookings(
        selectedDate.toISOString().split("T")[0],
        selectedAgent
      ).then(setBookings);
    }
  }, [selectedDate, selectedAgent]);

  const handleBooking = async () => {
    if (!(selectedDate && selectedTime && selectedAgent)) return;

    console.log(
      `Booking confirmed for ${selectedDate.toDateString()} at ${selectedTime} with Agent ID ${selectedAgent}`
    );

    const saved = await saveBooking({
      propertyId,
      selectedAgent,
      visitDate: selectedDate.toISOString(),
    });

    toast.dismiss();

    if (!saved.success) {
      toast.error("Unable to save booking");
      return;
    }

    toast.success("Your booking has been saved", {
      duration: 5000,
    });

    setBookings([]);
    setSelectedTime(null);
    setSelectedDate(null);
  };

  const shdDisable = !selectedDate || !selectedTime || !selectedAgent;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="text-md font-semibold mb-4">Select a Date</div>
          <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>
        <div>
          <div className="text-md font-semibold mb-4">Select an Agent</div>
          <AgentSelector
            agents={agents}
            selectedAgent={selectedAgent}
            onChange={setSelectedAgent}
          />
        </div>
      </div>

      {selectedDate && selectedAgent && (
        <>
          <div className="mt-8">
            <div className="text-md font-semibold mb-4">Select a Time</div>
            <TimeSelector
              date={selectedDate}
              bookings={bookings}
              selectedTime={selectedTime}
              onChange={setSelectedTime}
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleBooking}
              className={`bg-teal-500 text-white font-bold py-2 px-4 rounded ${
                !shdDisable
                  ? "transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              disabled={shdDisable}
            >
              Book Visit
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Pickers;
