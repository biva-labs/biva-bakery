import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RoomCard({ imgurl, title, desc, onAction }) {
  return (
    <Card className="relative w-full max-w-sm mx-auto flex flex-col overflow-hidden p-0 transition-transform hover:scale-105 shadow-md hover:shadow-lg">
      {/* Image container with responsive aspect ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={imgurl}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-100"
        />
      </div>

      {/* Content section with flex-grow to push button to bottom */}
      <CardContent className="flex-1 flex flex-col justify-between p-4 pb-16 sm:pb-14">
        <div className="flex-1">
          <CardTitle className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {desc}
          </CardDescription>
        </div>
      </CardContent>

      {/* Button positioned absolutely at bottom */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
        <Button
          onClick={onAction}
          variant="default"
          size="sm"
          className="rounded-full px-4 py-2 text-xs sm:text-sm font-medium"
        >
          Book
        </Button>
      </div>
    </Card>
  );
}
