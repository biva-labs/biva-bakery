import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

// import TableBlock from "@/components/table";
// import { useFoodCourtEventFormStore } from "@/store/seat-form-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEventForm } from "@/hooks/useEventForm";
import { toast } from "sonner";
import usePay from "@/hooks/usePay";
import { useFoodCourtEventFormStore } from "@/store/seat-form-store";
import EventSeatForm from "@/components/events/event-form";

import GuestEventSeatForm from "@/components/events/guest-form";

interface EventData {
    eventId: string;
    eventName: string;
    groupName: string;
    date: string;
    time: string;
    price: string;
    publicId: string;
    imageUrl: string;
}

const IGNORE_VALUES = ["eventId", "publicId", "imageUrl"];

const KEY_VALUE_MAP = {
    eventName: "Event Name",
    groupName: "Group Name",
    date: "Date",
    time: "Time",
    price: "Price",
};

export default function Table() {
    const [searchParams] = useSearchParams();
    const [eventData, setEventData] = useState<EventData | null>(null);
    const { setField, number_of_guest } = useFoodCourtEventFormStore();
    const data = useFoodCourtEventFormStore();
    const { mutate: submitForm, isPending } = useEventForm();

    const { initiatePayment, isProcessing } = usePay();

    // const guest = useGuestStore().guest;
    // Get event data from URL params
    useEffect(() => {
        console.log("URL Search Params:", Object.fromEntries(searchParams));

        const params = Object.fromEntries(searchParams);

        if (params.eventId && params.eventName) {
            const parsedEventData = {
                eventId: params.eventId,
                eventName: params.eventName,
                groupName: params.groupName || "",
                date: params.date || "",
                time: params.time || "",
                price: params.price || "",
                publicId: decodeURIComponent(params.publicId || ""),
                imageUrl: decodeURIComponent(params.imageUrl || ""),
            };

            console.log("Parsed Event Data:", parsedEventData);
            setEventData(parsedEventData);

            // Set event_id in store
            setField("event_id", params.eventId);
        }
    }, [searchParams, setField]);

    if (!eventData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Loading Event...
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Please wait while we load the event details.
                    </p>
                    <Button onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const handleBookAndPay = async () => {
        // Debug: Log store state before submission
        console.log("Store state before submission:", {
            guest: data.guest,
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            event_id: data.event_id,
            number_of_guest: data.number_of_guest,
            adhaar_or_pan_card: data.adhaar_or_pan_card
                ? "File present"
                : "No file",
        });

        if (
            !data.name ||
            !data.email ||
            !data.event_id ||
            !data.number_of_guest
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!data.adhaar_or_pan_card) {
            toast.error("Please upload your Aadhar or PAN card");
            return;
        }

        submitForm(
            {
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                adhaar_or_pan_card: data.adhaar_or_pan_card,
                number_of_guest: data.number_of_guest,
                event_id: data.event_id,
                guest: data.guest,
            },
            {
                onSuccess: async (response) => {
                    const totalAmount = response.data?.data?.total_amount;
                    const user = response.data?.data?.insertedData.map(
                        (v) => v.id,
                    );
                    // const eventType = response.data?.data?.insertedData[0].eventId;
                    console.log("AFTER PAYMENT DATA:", user);
                    await initiatePayment(totalAmount, user, "events");
                },
                onError: (error) => {
                    console.error("Form submission error:", error);
                    toast.error("Form submission failed. Please try again.");
                },
            },
        );
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* FLEX: FORM LEFT + IMAGE + INFO RIGHT */}
                <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
                    {/* LEFT — EVENT FORM */}
                    {/* LEFT — EVENT FORM */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        {/* Main Event Form */}
                        <EventSeatForm />

                        {/* Guest Forms - Render based on number_of_guest */}
                        {parseInt(data.number_of_guest) > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Guest Information ({data.number_of_guest}{" "}
                                    guests)
                                </h3>
                                {Array.from(
                                    { length: parseInt(data.number_of_guest) },
                                    (_, index) => {
                                        const guestId = `guest-${index + 1}`;
                                        return (
                                            <div
                                                key={guestId}
                                                className="border border-gray-200 rounded-lg p-4"
                                            >
                                                <h4 className="text-md font-medium text-gray-700 mb-3">
                                                    Guest {index + 1}
                                                </h4>
                                                <GuestEventSeatForm
                                                    guestId={guestId}
                                                />
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        )}

                        {/* Pay Button */}
                        <Button
                            onClick={handleBookAndPay}
                            disabled={isPending || isProcessing}
                            className="w-full text-lg"
                            size="default"
                        >
                            {isPending || isProcessing
                                ? "Processing..."
                                : (() => {
                                      const guests =
                                          parseInt(data.number_of_guest) || 0;
                                      const total =
                                          (guests + 1) *
                                          parseInt(eventData.price || "0");
                                      return !guests || isNaN(total)
                                          ? "Pay Now"
                                          : `Pay Now ₹${total}`;
                                  })()}
                        </Button>
                    </div>

                    {/* RIGHT — IMAGE + INFO (SAME WIDTH) */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                        {/* IMAGE */}
                        <img
                            src={eventData.imageUrl}
                            alt="Venue"
                            className="
                                w-full
                                max-w-xl
                                rounded-xl
                                shadow-md
                                object-cover
                                aspect-[4/3]
                            "
                        />

                        {/* EVENT INFO — SAME WIDTH AS IMAGE */}
                        <div className="w-full max-w-xl mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
                            <h3 className="text-lg font-semibold text-blue-900 mb-4">
                                Event Information
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                {Object.entries(eventData)
                                    .filter(([v]) => !IGNORE_VALUES.includes(v))
                                    .map(([key, value]) => (
                                        <div key={key} className="space-y-2">
                                            <Label className="text-sm font-medium text-blue-800">
                                                {
                                                    KEY_VALUE_MAP[
                                                        key as keyof typeof KEY_VALUE_MAP
                                                    ]
                                                }
                                            </Label>
                                            <Input
                                                value={value}
                                                disabled={true}
                                                className="bg-white border-blue-200"
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
