import { useFoodCourtEventFormStore } from "@/store/seat-form-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GuestEventSeatFormProps {
    guestId: string;
}

export default function GuestEventSeatForm({
    guestId,
}: GuestEventSeatFormProps) {
    const { guest, setGuestField, setGuestFile } = useFoodCourtEventFormStore();

    // Find the specific guest data (might not exist yet)
    const guestData = guest.find((g) => g.id === guestId);

    const handleFieldChange = (
        field: "name" | "email" | "phone_number",
        value: string,
    ) => {
        // This will create the guest entry if it doesn't exist, or update if it does
        setGuestField(guestId, field, value);
    };

    const handleFileChange = (file: File | null) => {
        // This will create the guest entry if it doesn't exist, or update if it does
        setGuestFile(guestId, file);
    };

    return (
        <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
                <Label htmlFor={`${guestId}-name`}>Full Name *</Label>
                <Input
                    id={`${guestId}-name`}
                    type="text"
                    placeholder="Enter guest full name"
                    value={guestData?.name || ""}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <Label htmlFor={`${guestId}-email`}>Email *</Label>
                <Input
                    id={`${guestId}-email`}
                    type="email"
                    placeholder="Enter guest email"
                    value={guestData?.email || ""}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
                <Label htmlFor={`${guestId}-phone`}>Phone Number</Label>
                <Input
                    id={`${guestId}-phone`}
                    type="tel"
                    placeholder="Enter guest phone number"
                    value={guestData?.phone_number || ""}
                    onChange={(e) =>
                        handleFieldChange("phone_number", e.target.value)
                    }
                />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
                <Label htmlFor={`${guestId}-file`}>Aadhar/PAN Card *</Label>
                <Input
                    id={`${guestId}-file`}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileChange(file);
                    }}
                />
                {guestData?.adhaar_or_pan_card && (
                    <p className="text-sm text-green-600">
                        ✓ File uploaded: {guestData.adhaar_or_pan_card.name}
                    </p>
                )}
            </div>
        </div>
    );
}
