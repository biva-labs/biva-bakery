import { Home, Menu, Info, Phone, Briefcase, Star, MapPin, Mail, Truck, FileText, RotateCcw } from "lucide-react";

export const QUICK_LINKS = {
  "navigation": [
    { href: "/", label: "Home", icon: Home },
    { href: "/bakery", label: "Bakery", icon: Menu },
    { href: "/food", label: "Food Court", icon: Info },
    { href: "/#gallery", label: "Gallery", icon: Star },
    { href: "/#contact", label: "Contact", icon: Phone },
    { href: "/table/booking", label: "Book Table", icon: Briefcase },
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



