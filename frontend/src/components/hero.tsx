import { SecondNavbar } from "./secondNav";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div
      className="relative w-full
        h-[30vh] md:h-[40vh] lg:h-[60vh]
        bg-cover bg-center bg-no-repeat top-0"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20">
        <SecondNavbar />
      </div>

      <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Experience
          <br />
          Luxury
        </h1>
        <p className="mt-2 text-xs md:text-lg lg:text-xl text-gray-200 max-w-md  leading-snug">
          Experience luxury and
          <br />
          comfort in the heart of the city.
        </p>
      </div>

      <div className="absolute bottom-0 right-0 p-3 md:p-10 z-20 flex flex-col items-end space-y-2">
        <div className="text-white text-sm md:text-xl">
          Available at just ₹4999/-
        </div>

        <Button variant="orange" className="hover:cursor-pointer">
          Contact Us
        </Button>
      </div>
    </div>
  );
}
