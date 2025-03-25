import {
  HomeIcon,
  EnvelopeOpenIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  Cog8ToothIcon,
  ChartPieIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

export const menuItems = [
  { name: "Dashboard", icon: HomeIcon, path: "/" },
  {
    name: "Email Management",
    icon: EnvelopeOpenIcon,
    path: "/email-management",
  },
  { name: "Team Management", icon: UserGroupIcon, path: "/team-management" },
  { name: "Telegram Bot", icon: PaperAirplaneIcon, path: "/telegram-bot" },
  { name: "Analytics", icon: ChartPieIcon, path: "/analytics" },
  { name: "Notifications", icon: BellAlertIcon, path: "/notifications" },
  { name: "Settings", icon: Cog8ToothIcon, path: "/settings" },
];
