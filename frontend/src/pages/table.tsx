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
import EventSeatForm from "@/components/events/form";

interface EventData {
    eventId: string;
    eventName: string;
    groupName: string;
    date: string;
    time: string;
    price: string;
    publicId: string;
    imageUrl: string;
    venueImageUrl: string;
}

const IGNORE_VALUES = ["eventId", "publicId", "imageUrl", "venueImageUrl"];

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
    const [selectedTables, setSelectedTables] = useState<string[]>([]);
    const { setField } = useFoodCourtEventFormStore();
    const data = useFoodCourtEventFormStore();
    const { mutate: submitForm, isPending, isError, error } = useEventForm();

    const { initiatePayment, isProcessing } = usePay();

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
                venueImageUrl: decodeURIComponent(params.venueImageUrl || ""),
            };

            console.log("Parsed Event Data:", parsedEventData);
            setEventData(parsedEventData);

            // Set event_id in store
            setField("event_id", params.eventId);
        }
    }, [searchParams, setField]);

    useEffect(() => {
        setField("table_id", selectedTables);
    }, [selectedTables, setField]);

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
        if (
            !data.name ||
            !data.email ||
            !data.table_id ||
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
                table_id: data.table_id,
            },
            {
                onSuccess: async (response) => {
                    const totalAmount =
                        response.data?.data?.totalAmount ||
                        response.data.data[0].totalAmount;
                    const user = response.data || response.data.data[0];
                    console.log(user);
                    await initiatePayment(totalAmount, user);
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
                    <div className="w-full lg:w-1/2 space-y-6">
                        <EventSeatForm />

                        {/* Pay Button - moved inside the form section */}
                        <Button
                            onClick={handleBookAndPay}
                            disabled={isPending || isProcessing}
                            className="w-full  text-lg "
                            size="default"
                        >
                            {isPending || isProcessing
                                ? "Processing..."
                                : (() => {
                                      const guests = parseInt(
                                          data.number_of_guest,
                                      );
                                      const total =
                                          guests * parseInt(eventData.price);
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
                            src={eventData.venueImageUrl}
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
