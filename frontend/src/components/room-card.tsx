import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RoomCard({
  url,
  title,
  desc,
  onAction,
}: {
  url: string | undefined;
  title: string | undefined;
  desc: string | undefined;
  onAction: () => void | undefined;
}) {
  return (
    <Card className="relative w-full max-w-sm mx-auto flex flex-col overflow-hidden p-0 transition-transform hover:scale-105 shadow-md hover:shadow-lg">
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={url}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-100"
        />
      </div>

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

      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
        <Button
          onClick={onAction}
          variant="default"
          size="sm"
          className="rounded-full px-4 py-2 nexa bg-[#002a3a]"
        >
          Book
        </Button>
      </div>
    </Card>
  );
}
