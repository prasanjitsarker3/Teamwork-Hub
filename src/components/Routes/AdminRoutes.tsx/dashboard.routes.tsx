import { Layout, ShieldPlus, Users, FolderOpenDot } from "lucide-react";

export const adminRoutes = [
  { href: "/dashboard", icon: Layout, label: "Dashboard" },
  { href: "/admin/team", icon: ShieldPlus, label: "Team Management" },
  { href: "/admin/projects", icon: FolderOpenDot, label: "Projects Mang" },
  { href: "/admin/user", icon: Users, label: "User Management" },
];
