import {
  Wifi,
  Droplet,
  Home,
  Coffee,
  Thermometer,
  Box,
  Tv,
  Lock,
  type LucideIcon 
} from "lucide-react";

const amenitiesData = [
  { label: "Complimentary Wi-Fi Services", Icon: Wifi },
  { label: "Drinking Water", Icon: Droplet },
  { label: "Housekeeping Services", Icon: Home },
  { label: "In room Dining Service", Icon: Coffee },
  { label: "Centralized Air Conditioning", Icon: Thermometer },
  { label: "Closet", Icon: Box },
  { label: "Minibar", Icon: Box, unavailable: true },
  { label: "Iron / Iron Board on Request", Icon: Home },
  { label: "Intercom", Icon: Home },
  { label: "Tea / Coffee Kettle", Icon: Coffee },
  { label: "Safe Deposit Locker", Icon: Lock, unavailable: true },
  { label: '43" Inch HD Smart TV', Icon: Tv },
];

export default function Amenities() {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Amenities</h3>
      <div className="grid grid-cols-2 gap-4">
        {amenitiesData.map((amenity, i) => {
          const Icon = amenity.Icon as LucideIcon;
          return (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon className={`w-6 h-6 text-gray-700`} />
              </div>
              {amenity.unavailable ? (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 line-through">{amenity.label}</span>
                  <span className="text-xs text-red-500">Not Available</span>
                </div>
              ) : (
                <span className="text-sm font-medium text-gray-700">{amenity.label}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

