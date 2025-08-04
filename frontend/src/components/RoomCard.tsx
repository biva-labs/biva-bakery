import { Card, Box, Text, Button } from "@radix-ui/themes";

export default function RoomCard({ imgurl, title, desc, onAction }) {
  return (
    <Card size="1" variant="surface" className="relative max-w md:max-w-[280px] flex flex-col shadow-gray-600 shadow-xl mb-10">
      {/* Image section */}
      <Box>
        <img
          src={imgurl}
          alt={title}
          className="w-full h-36 object-cover rounded-t-md"
        />
      </Box>

      {/* Content section */}
      <Box className="p-3 pb-12"> {/* extra bottom padding to prevent overlap */}
        <Text as="h3" size="2" weight="bold" className="mb-1">
          {title}
        </Text>
        <Text as="p" size="1" color="gray" className="mb-3">
          {desc}
        </Text>
      </Box>

      {/* Button always bottom-right */}
      <div className="absolute bottom-3 right-3">
        <Button
          onClick={onAction}
          radius="full"
          size="2"
          variant="solid"
          color="mint"
        >
          Book
        </Button>
      </div>
    </Card>
  );
}
