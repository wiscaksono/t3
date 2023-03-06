import { create } from "zustand";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const useStore = create((set) => ({
  navigation: [
    { name: "Home", href: "/", icon: HomeIcon, current: true },
    { name: "Team", href: "/team", icon: UsersIcon, current: false },
    { name: "Projects", href: "/projects", icon: FolderIcon, current: false },
    { name: "Calendar", href: "/calendar", icon: CalendarIcon, current: false },
    { name: "Documents", href: "/documents", icon: InboxIcon, current: false },
    { name: "Reports", href: "/reports", icon: ChartBarIcon, current: false },
  ],

  setCurrent: (index: number, value: boolean): void =>
    set((state: any) => {
      const newNavigation = [...state.navigation]; // Make a copy of the array
      newNavigation[index] = { ...newNavigation[index], current: value }; // Update the item at the specified index
      return { navigation: newNavigation }; // Return a new state object with the updated "navigation" array
    }),
}));

export default useStore;
