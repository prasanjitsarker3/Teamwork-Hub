import { GalleryHorizontal, Layout, User } from "lucide-react";

export const dashboardRoutes = [
  { href: "/dashboard", icon: Layout, label: "Dashboard" },
  { href: "/dashboard/user", icon: User, label: "User Info" },
  { href: "/action", icon: GalleryHorizontal, label: "Action" },
];
