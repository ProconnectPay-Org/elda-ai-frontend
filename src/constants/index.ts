import Settings from "../assets/settings.png";
import Documents from "../assets/documents.png";
import SolarDocuments from "../assets/solar_documents.png";
import chart from "../assets/chart.png";
import icon1 from "../assets/Icon1.png";
import icon2 from "../assets/Icon2.png";
import icon3 from "../assets/Icon3.png";
import SocialIcons1 from "../assets/Social icons1.png";
import SocialIcons3 from "../assets/Social icons3.png";
import SocialIcons4 from "../assets/Social icons4.png";
import SocialIcons5 from "../assets/Social icons5.png";
import SocialIcons6 from "../assets/youtube.png";

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

export const businessLinks = [
  {
    url: "https://proconnectpay.com/pricing",
    name: "Service Fee Pricing",
  },
  {
    url: "https://proconnectpay.com/supported-schools",
    name: "List of Supported Schools",
  },
  {
    url: "https://proconnectpay.com/interest",
    name: "Signify your interest",
  },
  {
    url: "https://proconnectpay.com/local-loan",
    name: "Local loan",
  },
  {
    url: "https://proconnectpay.com/global-loan",
    name: "Global Loan",
  },
  {
    url: "https://proconnectpay.com/privacy-policy",
    name: "Privacy Policy",
  },
  {
    url: "https://proconnectpay.com/global-loan#terms-conditions",
    name: "Terms and Conditions",
  },
];

export const locationLinks = [
  {
    url: "https://proconnectpay.com/contact",
    name: "Global HQ US",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Africa HQ Lagos",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Accra Office",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Kampala Office",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Nairobi Office",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Kigali Office",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Toronto Office",
  },
];

export const socialIcons = [
  { name: SocialIcons1, url: "https://web.facebook.com/proconnectpay" },
  { name: SocialIcons3, url: "https://twitter.com/ProconnectPAY" },
  { name: SocialIcons4, url: "https://www.instagram.com/proconnectpay/" },
  { name: SocialIcons5, url: "https://ng.linkedin.com/company/proconnectpay" },
  {
    name: SocialIcons6,
    url: "https://www.youtube.com/channel/UCsX-weJpSWORcMUAQ-g0HdA",
  },
];
