import Settings from "../assets/settings.png";
import Documents from "../assets/documents.png";
import SolarDocuments from "../assets/solar_documents.png";
import chart from "../assets/chart.png";
import icon1 from "../assets/Icon1.png";
import icon2 from "../assets/Icon2.png";
import icon3 from "../assets/Icon3.png";

// export const sidebarLinks = [
//   {
//     imgURL: chart,
//     route: "/dashboard",
//     label: "Dashboard",
//   },
//   {
//     imgURL: SolarDocuments,
//     route: "/resume",
//     label: "All Resumes",
//   },
//   {
//     imgURL: Documents,
//     route: "/sop",
//     label: "All SOPs",
//   },
//   {
//     imgURL: Settings,
//     route: "/settings",
//     label: "Settings",
//   },
// ];

export const sidebarLinks = [
  {
    imgURL: chart,
    route: "/assigned-candidates",
    label: "Assigned Candidates",
  },
  {
    imgURL: SolarDocuments,
    route: "/refine-resume",
    label: "Refine Resume",
  },
  {
    imgURL: Documents,
    route: "/craft-sop",
    label: "Craft SOPs",
  },
  {
    imgURL: Settings,
    route: "/profile",
    label: "Profile",
  },
];

export const smallBox = [
  {
    icon: icon1,
    number: 10,
    name: "Number Of Assigned Candidates",
  },
  {
    icon: icon2,
    number: 2,
    name: "Number Of Jobs Completed",
  },
  {
    icon: icon3,
    number: 8,
    name: "Number Of Jobs Unfinished",
  },
];
