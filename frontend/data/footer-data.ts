import wa_link from "@/utils/wa-link";
import { Home, Menu, Info, Phone, Briefcase, Star, MapPin, Mail, Truck, FileText, RotateCcw } from "lucide-react";
import { PHONE } from "./phone-data";
import { isExternal } from "util/types";

export const QUICK_LINKS = {
  "navigation": [
    { href: "/", label: "Home", icon: Home, isExternal: false },
    { href: "/bakery", label: "Bakery", icon: Menu, isExternal: false },
    { href: "/food", label: "Food Court", icon: Info, isExternal: false },
    { href: "/#gallery", label: "Gallery", icon: Star, isExternal: false },
    { href: wa_link("Hey!", PHONE["admin"]), label: "Contact", icon: Phone, isExternal: true },
    { href: "/food", label: "Book Table", icon: Briefcase, isExternal: false },
  ],
  "address": [
    { text: "Station Road, Silchar, Assam", icon: MapPin },
    { text: "+91 8135938393", icon: Phone },
    { text: "hotelbiva@gmail.com", icon: Mail },
  ],
  "terms": [
    { href: "https://merchant.razorpay.com/policy/RA3QHOsSbirhdr/shipping", label: "Shipping", icon: Truck },
    { href: "https://merchant.razorpay.com/policy/RA3QHOsSbirhdr/terms", label: "Terms", icon: FileText },
    { href: "https://merchant.razorpay.com/policy/RA3QHOsSbirhdr/refund", label: "Refunds", icon: RotateCcw },
  ]
}



