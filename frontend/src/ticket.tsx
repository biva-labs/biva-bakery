import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import Footer from "@/components/footer";
import { toast } from "sonner";
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    FileText,
    Mail,
    Phone,
    User,
} from "lucide-react";
import { useTicket } from "@/hooks/useTicket";

const TICKET_CATEGORIES = [
    { value: "booking", label: "Booking Issues" },
    { value: "payment", label: "Payment Problems" },
    { value: "food-quality", label: "Food Quality" },
    { value: "service", label: "Service Related" },
    { value: "facility", label: "Facility Issues" },
    { value: "hygiene", label: "Hygiene Concerns" },
    { value: "website", label: "Website Issues" },
    { value: "other", label: "Other" },
];

export default function Ticket() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        category: "",
        subject: "",
        description: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ticketNumber, setTicketNumber] = useState("");

    // Use the ticket mutation hook
    const ticketMutation = useTicket();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const generateTicketNumber = () => {
        const prefix = "BIVA";
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0");
        return `${prefix}${timestamp.toString().slice(-6)}${random}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.category ||
            !formData.subject ||
            !formData.description
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        // Use the mutation to submit the ticket
        ticketMutation.mutate(formData, {
            onSuccess: (data) => {
                setTicketNumber(data.ticketNumber || generateTicketNumber());
                setIsSubmitted(true);
            },
            onError: (error) => {
                console.error("Submission failed:", error.message);
            },
        });
    };

    if (isSubmitted) {
        return (
            <>
                <div className="min-h-screen bg-[#fefce8] py-16">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h1 className="text-4xl lg:text-5xl outfit font-extrabold text-[#5c3d2e] mb-4 tracking-wide">
                                Ticket Submitted Successfully!
                            </h1>
                            <div className="w-24 h-1 bg-[#a67c52] mx-auto mb-6"></div>
                        </div>

                        <Card className="max-w-2xl mx-auto bg-white border-[#e0c7b7]">
                            <CardHeader>
                                <CardTitle className="text-xl text-[#5c3d2e] flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Ticket Details
                                </CardTitle>
                                <CardDescription>
                                    Your support ticket has been created and our
                                    team will review it shortly.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-[#5c3d2e] text-[#fefce8] p-4 rounded-lg">
                                    <p className="text-sm font-medium mb-1">
                                        Ticket Number
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {ticketNumber}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-[#5c3d2e] mb-1">
                                            Subject
                                        </p>
                                        <p className="text-gray-700">
                                            {formData.subject}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#5c3d2e] mb-1">
                                            Category
                                        </p>
                                        <p className="text-gray-700">
                                            {
                                                TICKET_CATEGORIES.find(
                                                    (cat) =>
                                                        cat.value ===
                                                        formData.category,
                                                )?.label
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#5c3d2e] mb-1">
                                            Status
                                        </p>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                                            <Clock className="h-3 w-3 mr-1" />
                                            Under Review
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-2">
                                        What happens next?
                                    </h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>
                                            • We'll review your ticket within 24
                                            hours
                                        </li>
                                        <li>
                                            • You'll receive email updates at{" "}
                                            {formData.email}
                                        </li>
                                        <li>
                                            • Our team may contact you for
                                            additional information
                                        </li>
                                        <li>
                                            • Save your ticket number for future
                                            reference
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({
                                                name: "",
                                                email: "",
                                                phone: "",
                                                category: "",
                                                subject: "",
                                                description: "",
                                            });
                                        }}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Submit Another Ticket
                                    </Button>
                                    <Button
                                        onClick={() => window.history.back()}
                                        className="flex-1 bg-[#5c3d2e] hover:bg-[#a67c52] text-[#fefce8]"
                                    >
                                        Go Back
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-[#fefce8] py-16">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl outfit font-extrabold text-[#5c3d2e] mb-4 tracking-wide">
                            Raise a Support Ticket
                        </h1>
                        <div className="w-24 h-1 bg-[#a67c52] mx-auto mb-6"></div>
                        <p className="text-lg text-[#5c3d2e] max-w-2xl mx-auto">
                            Having an issue? Let us help you. Fill out the form
                            below and our support team will get back to you as
                            soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quick Info Cards */}
                        <div className="space-y-4">
                            <Card className="bg-white border-[#e0c7b7]">
                                <CardHeader>
                                    <CardTitle className="text-sm text-[#5c3d2e] flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Response Time
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-gray-600">
                                        We typically respond within 24 hours
                                        during business days.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-[#e0c7b7]">
                                <CardHeader>
                                    <CardTitle className="text-sm text-[#5c3d2e] flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4" />
                                        Emergency Contact
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-gray-600 mb-2">
                                        For urgent issues, call us directly:
                                    </p>
                                    <p className="font-medium text-[#5c3d2e]">
                                        +91 12345 67890
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-[#e0c7b7]">
                                <CardHeader>
                                    <CardTitle className="text-sm text-[#5c3d2e] flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Direct Email
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-gray-600 mb-2">
                                        You can also email us directly:
                                    </p>
                                    <p className="font-medium text-[#5c3d2e]">
                                        support@bivabakery.com
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Form */}
                        <div className="lg:col-span-2">
                            <Card className="bg-white border-[#e0c7b7]">
                                <CardHeader>
                                    <CardTitle className="text-xl text-[#5c3d2e]">
                                        Support Ticket Form
                                    </CardTitle>
                                    <CardDescription>
                                        Please provide as much detail as
                                        possible to help us assist you better.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        {/* Personal Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-[#5c3d2e]">
                                                Personal Information
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="name"
                                                        className="text-[#5c3d2e] flex items-center gap-1"
                                                    >
                                                        <User className="h-4 w-4" />
                                                        Full Name *
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "name",
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Enter your full name"
                                                        className="border-[#e0c7b7] focus:border-[#5c3d2e]"
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="email"
                                                        className="text-[#5c3d2e] flex items-center gap-1"
                                                    >
                                                        <Mail className="h-4 w-4" />
                                                        Email Address *
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "email",
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Enter your email"
                                                        className="border-[#e0c7b7] focus:border-[#5c3d2e]"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="phone"
                                                        className="text-[#5c3d2e] flex items-center gap-1"
                                                    >
                                                        <Phone className="h-4 w-4" />
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "phone",
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Enter your phone number"
                                                        className="border-[#e0c7b7] focus:border-[#5c3d2e]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ticket Details */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-[#5c3d2e]">
                                                Ticket Details
                                            </h3>

                                            <div className="space-y-2">
                                                <Label className="text-[#5c3d2e]">
                                                    Category *
                                                </Label>
                                                <Select
                                                    value={formData.category}
                                                    onValueChange={(value) =>
                                                        handleInputChange(
                                                            "category",
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="border-[#e0c7b7] focus:border-[#5c3d2e]">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {TICKET_CATEGORIES.map(
                                                            (category) => (
                                                                <SelectItem
                                                                    key={
                                                                        category.value
                                                                    }
                                                                    value={
                                                                        category.value
                                                                    }
                                                                >
                                                                    {
                                                                        category.label
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="subject"
                                                    className="text-[#5c3d2e]"
                                                >
                                                    Subject *
                                                </Label>
                                                <Input
                                                    id="subject"
                                                    type="text"
                                                    value={formData.subject}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "subject",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Brief description of your issue"
                                                    className="border-[#e0c7b7] focus:border-[#5c3d2e]"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="description"
                                                    className="text-[#5c3d2e]"
                                                >
                                                    Detailed Description *
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    value={formData.description}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "description",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Please provide a detailed description of your issue, including any steps you've already taken to resolve it..."
                                                    rows={6}
                                                    className="border-[#e0c7b7] focus:border-[#5c3d2e]"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex gap-3 pt-4">
                                            <Button
                                                type="submit"
                                                disabled={
                                                    ticketMutation.isPending
                                                }
                                                className="flex-1 bg-[#5c3d2e] hover:bg-[#a67c52] text-[#fefce8] py-6 text-lg font-semibold outfit tracking-wide"
                                            >
                                                {ticketMutation.isPending
                                                    ? "Submitting Ticket..."
                                                    : "Submit Support Ticket"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    window.history.back()
                                                }
                                                className="border-[#5c3d2e] text-[#5c3d2e] hover:bg-[#5c3d2e] hover:text-[#fefce8]"
                                                disabled={
                                                    ticketMutation.isPending
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
