import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFoodCourtEventFormStore } from "@/store/seat-form-store";

interface EventFormData {
    eventId: string;
    eventName: string;
    groupName: string;
    date: string;
    time: string;
    price: string;
    publicId: string;
    imageUrl: string;
}

const EVENT_FORM_FIELDS = [
    {
        id: "event-id",
        title: "Event ID",
        element: "input",
        placeholder: "Event ID",
        disabled: true,
    },
    {
        id: "event-name",
        title: "Event Name",
        element: "input",
        placeholder: "Event Name",
        disabled: true,
    },
    {
        id: "group-name",
        title: "Group Name",
        element: "input",
        placeholder: "Group Name",
        disabled: true,
    },
    {
        id: "event-date",
        title: "Event Date",
        element: "input",
        placeholder: "Event Date",
        disabled: true,
    },
    {
        id: "event-time",
        title: "Event Time",
        element: "input",
        placeholder: "Event Time",
        disabled: true,
    },
    {
        id: "ticket-price",
        title: "Ticket Price",
        element: "input",
        placeholder: "Ticket Price",
        disabled: true,
    },
    {
        id: "name",
        title: "Your Name",
        element: "input",
        placeholder: "Enter your full name",
        disabled: false,
        required: true,
    },
    {
        id: "email",
        title: "Email Address",
        element: "input",
        placeholder: "Enter your email address",
        disabled: false,
        required: true,
    },
    {
        id: "phone",
        title: "Phone Number",
        element: "input",
        placeholder: "Enter your phone number",
        disabled: false,
        required: true,
    },
    {
        id: "guest-no",
        title: "Number of Guests",
        element: "select",
        placeholder: "Select number of guests",
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        disabled: false,
        required: true,
    },

    {
        id: "adhaar-pan",
        title: "Adhaar/Pan Card Image",
        element: "upload",
        placeholder: "Upload your Adhaar or Pan card image",
        disabled: false,
        required: true,
    },
];

export default function EventSeatForm() {
    const [searchParams] = useSearchParams();
    const eventStore = useFoodCourtEventFormStore();

    // State for event data from URL
    const eventData: EventFormData = {
        eventId: searchParams.get("event_id") || "",
        eventName: searchParams.get("eventName") || "",
        groupName: searchParams.get("groupName") || "",
        date: searchParams.get("date") || "",
        time: searchParams.get("time") || "",
        price: searchParams.get("price") || "",
        publicId: searchParams.get("publicId") || "",
        imageUrl: searchParams.get("imageUrl") || "",
    };

    // Helper function to get field value
    const getFieldValue = (fieldId: string): string | string[] => {
        switch (fieldId) {
            case "event-id":
                return eventData.eventId;
            case "event-name":
                return eventData.eventName;
            case "group-name":
                return eventData.groupName;
            case "event-date":
                return eventData.date;
            case "event-time":
                return eventData.time;
            case "ticket-price":
                return eventData.price ? `₹${eventData.price}` : "";
            case "name":
                return eventStore.name;
            case "email":
                return eventStore.email;
            case "phone":
                return eventStore.phone_number; // Use phone_number from store
            case "guest-no":
                return eventStore.number_of_guest;
            case "adhaar-pan":
                return eventStore.adhaar_or_pan_card?.name || "";
            default:
                return "";
        }
    };

    // Helper function to set field value in store
    const setFieldValue = (fieldId: string, value: string | string[]) => {
        switch (fieldId) {
            case "name":
                eventStore.setField("name", value as string);
                break;
            case "email":
                eventStore.setField("email", value as string);
                break;
            case "phone":
                eventStore.setField("phone_number", value as string); // Use phone_number
                break;
            case "guest-no":
                eventStore.setField("number_of_guest", value as string);
                break;
            default:
                break;
        }
    };

    const renderField = (field: any) => {
        const fieldValue = getFieldValue(field.id);

        return (
            <div key={field.id} className="space-y-2 ">
                <Label
                    htmlFor={field.id}
                    className="text-sm font-medium text-gray-700"
                >
                    {field.title}
                    {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                    )}
                </Label>

                {field.element === "input" ? (
                    <Input
                        id={field.id}
                        placeholder={field.placeholder}
                        value={fieldValue}
                        disabled={field.disabled}
                        className={
                            field.disabled ? "bg-gray-100 text-gray-600" : ""
                        }
                        onChange={(e) =>
                            setFieldValue(field.id, e.target.value)
                        }
                    />
                ) : field.element === "upload" ? (
                    <div className="space-y-2">
                        <Input
                            id={field.id}
                            type="file"
                            accept="image/*,.pdf"
                            disabled={field.disabled}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    eventStore.setFile(file);
                                }
                            }}
                        />
                        {fieldValue && (
                            <p className="text-sm text-green-600">
                                Selected: {fieldValue}
                            </p>
                        )}
                    </div>
                ) : field.element === "select" ? (
                    <Select
                        disabled={field.disabled}
                        value={fieldValue as string}
                        onValueChange={(value) => {
                            setFieldValue(field.id, value);
                        }}
                    >
                        <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map(
                                (option: any, index: number) => (
                                    <SelectItem
                                        key={index}
                                        value={String(option)}
                                    >
                                        {String(option)}{" "}
                                        {field.id === "guest-no"
                                            ? "guests"
                                            : ""}
                                    </SelectItem>
                                ),
                            )}
                        </SelectContent>
                    </Select>
                ) : null}
            </div>
        );
    };

    return (
        <div className="w-full mt-5 space-y-6 h-full">
            <div className="p-4 md:p-6 rounded-lg  ">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {EVENT_FORM_FIELDS.slice(6).map((field) =>
                        renderField(field),
                    )}
                </div>
            </div>
        </div>
    );
}
