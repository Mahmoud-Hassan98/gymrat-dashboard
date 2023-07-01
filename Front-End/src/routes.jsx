import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Users, EditUsers, AddCoaches} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import AddUsers from "./pages/dashboard/AddUsers";
import Coaches from "./pages/dashboard/Coaches";
import EditPitche from "./pages/dashboard/EditPitche";
import Purchases from "./pages/dashboard/Purchases";
import ContactUs from "./pages/dashboard/ContactUs";
// import Tables from "./pages/dashboard/AboutUs";
import AboutUs from "./pages/dashboard/AboutUs";
import Addproducts from "./pages/dashboard/Addproducts";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "GymRat Home",
        path: "/home",
        element: <Home />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Users",
        path: "/Users",
        element: <Users />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Coaches",
        path: "/Coaches",
        element: <Coaches />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "purchases",
        path: "/Purchases",
        element: <Purchases />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Contact Us",
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "AboutUs",
        path: "/AboutUs",
        element: <AboutUs />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "add products",
        path: "/addproducts",
        element: <Addproducts />,
      },
      
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },

    ],
  },
  {
    title: "without",
    layout: "dashboard",
    pages: [
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Edit Users",
        path: "/users/edit/:id",
        element: <EditUsers />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Add users",
        path: "/users/add",
        element: <AddUsers />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Add pitch",
        path: "/Coaches/add",
        element: <AddCoaches />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Edit pitch",
        path: "/Coaches/edit/:id",
        element: <EditPitche />,
      },
    ],
  },
];

export default routes;
