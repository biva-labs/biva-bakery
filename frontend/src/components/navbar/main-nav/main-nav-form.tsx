import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export default function MainNavForm() {
    return (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-50">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    alert("Booking submitted ✅");
                    // setOpenIndex(null);
                }}
                className="flex flex-col gap-3"
            >
                <Input
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
    )
}