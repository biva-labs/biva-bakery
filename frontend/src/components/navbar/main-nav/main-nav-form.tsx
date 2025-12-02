import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useNavigate } from "react-router-dom";

export default function MainNavForm() {
    const navigate = useNavigate();

    return (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-50">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const email = formData.get("email");

                    // Navigate to confirmation page with the email data
                    navigate("/booking-confirmation", {
                        state: {
                            email: email,
                            submittedAt: new Date().toLocaleString(),
                            bookingType: "Email Subscription",
                        },
                    });
                }}
                className="flex flex-col gap-3"
            >
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full"
                />
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </div>
    );
}
