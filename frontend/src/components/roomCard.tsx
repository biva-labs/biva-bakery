import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RoomCard({ imgurl, title, desc, onAction }) {
  return (
    <Card className="relative max-w-full md:max-w-[280px] flex flex-col shadow-gray-600 shadow-xl mb-10 overflow-hidden p-0">
 
      <img
        src={imgurl}
        alt={title}
        className="w-full h-36 object-cover"
      />


      <CardContent className="pb-14">
        <CardTitle className="text-base mb-1">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3">
          {desc}
        </CardDescription>
      </CardContent>


      <div className="absolute bottom-3 right-3">
        <Button onClick={onAction} variant="default" className="rounded-full">
          Book
        </Button>
      </div>
    </Card>
  )
}


