import { create } from "zustand";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

type NavigationItem = {
  name: string;
  href: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  current: boolean;
};

type CurrentUser = {
  name: string;
  image: string;
  role: "ADMIN" | "USER";
};

type StoreState = {
  navigation: NavigationItem[];
  updateNavigationCurrent: (index: number) => void;
  currentUser: CurrentUser;
  getUser: () => Promise<void>;
};

const useStore = create<StoreState>((set) => ({
  //
  // Navigation for sidebar
  navigation: [
    { name: "Home", href: "/", icon: HomeIcon, current: true },
    { name: "Team", href: "/team", icon: UsersIcon, current: false },
    { name: "Projects", href: "/projects", icon: FolderIcon, current: false },
    { name: "Calendar", href: "/calendar", icon: CalendarIcon, current: false },
    { name: "Documents", href: "/documents", icon: InboxIcon, current: false },
    { name: "Reports", href: "/reports", icon: ChartBarIcon, current: false },
  ],

  updateNavigationCurrent: (index) =>
    set((state) => {
      const newNavigation = [...state.navigation];
      newNavigation.forEach((item, i) => {
        item.current = i === index;
      });
      return { navigation: newNavigation };
    }),

  // User Management
  currentUser: {
    name: "Loading...",
    image: "https://plchldr.co/i/150x150?text=Loading...",
    role: "USER",
  },

  getUser: async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      set(() => ({ currentUser: data.user }));
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useStore;
