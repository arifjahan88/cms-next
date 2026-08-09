"use client";

import { useState } from "react";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { InquiryForm } from "@/features/consultation/components/inquiry-form";
import { BookingSidebar } from "@/features/consultation/components/booking-sidebar";

export function ConsultationBooking() {
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string | undefined>();

  return (
    <section id="inquiry" className="scroll-mt-28 bg-surface py-16 md:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <FadeIn>
            <InquiryForm
              selectedDate={date}
              selectedSlot={slot}
              onDateChange={setDate}
              onSlotChange={setSlot}
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <BookingSidebar
              date={date}
              onDateChange={setDate}
              slot={slot}
              onSlotChange={setSlot}
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
