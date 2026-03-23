
// ── BRAND TOKENS ────────────────────────────────────
export const BRAND = {
  orange:    "#C84B11",
  red:    "#ba0000",
  dark:      "#0A0A0B",
  navy:      "#0D1B3E",
  white:     "#FFFFFF",
  offwhite:  "#F8F7F4",
  gray:      "#6B7280",
  lightgray: "#E5E7EB",
};

export const FONT = {
  heading: "'Syne', sans-serif",
  body:    "'DM Sans', sans-serif",
};

export const SECTION_PAD = "100px 24px";
export const MAX_WIDTH   = 1200;


// ── SITE DATA ───────────────────────────────────────
export const STATS = [
  { value: "2000+",  label: "Housing Units Planned"  },
  { value: "500+", label: "Jobs Created"   },
  { value: "4",    label: "Counties Active"   },
  { value: "100%", label: "Quality Commitment"   },
];

export const SERVICES = [
  {
    id: 1,
    title: "General export construction",
    desc:  "From foundations to finishing — full-cycle export construction with precision scheduling, quality control, and safety compliance.",
    icon: `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
  },
  {
    id: 2,
    title: "Road & Bridge Works",
    desc:  "Highways, local roads, bridges and rehabilitation — built to international standards with meticulous attention to durability.",
    icon: `<path d="M3 17l3-6h12l3 6M5 17h14M8 11V7M16 11V7M12 11V5"/>`,
  },
  {
    id: 3,
    title: "Electrical Works",
    desc:  "Solar LED street lighting, solar water heating, solar farms, and off-grid power solutions for efficiency and sustainability.",
    icon: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  },
  {
    id: 4,
    title: "Water Works",
    desc:  "Borehole drilling, dam export construction, water catchment systems and community solar pumping — delivering water where it matters.",
    icon: `<path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>`,
  },
  {
    id: 5,
    title: "Project Design & Management",
    desc:  "End-to-end project planning, risk management, and delivery control — on time, within budget, without compromise.",
    icon: `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>`,
  },
  {
    id: 6,
    title: "Interior Design & Renovation",
    desc:  "Transforming commercial and residential spaces with cutting-edge design thinking and impeccable craftsmanship.",
    icon: `<path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>`,
  },
];

export const VALUES = [
  { title: "Professionalism", desc: "Every engagement reflects our highest standard of conduct and technical mastery." },
  { title: "Integrity",       desc: "Accountable, transparent, and honest in every project and partnership."          },
  { title: "Innovation",      desc: "Embracing new talent and technologies to deliver cutting-edge solutions."        },
  { title: "Teamwork",        desc: "Collaborative by nature — with clients, communities, and our crews."             },
];

export const PROJECTS = [
  { type: "Buildings",   label: "Residential & Commercial"   },
  { type: "Roads",       label: "Highways & Local Roads"     },
  { type: "Hospitals",   label: "Healthcare Facilities"      },
  { type: "Schools",     label: "Educational Institutions"   },
  { type: "Dams",        label: "Water Reservoirs"           },
  { type: "Boreholes",   label: "Water Access Points"        },
  { type: "Apartments",  label: "Multi-unit Developments"    },
  { type: "Solar",       label: "Renewable Energy Farms"     },
];

export const CONTACT_INFO = [
  {
    label: "Location",
    value: "Nairobi, Kenya",
    icon: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>`,
  },
  {
    label: "Phone",
    value: "+254 700 000 000",
    icon: `<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>`,
  },
  {
    label: "Email",
    value: "info@spacemine.co.ke",
    icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`,
  },
];

export const NAV_LINKS = ["About", "Services", "Projects", "Values", "Contact"];

export const ENVIRONMENT_CARDS = [
  {
    title: "Environmental Policy",
    body:  "We integrate long-term economic, environmental, and social dimensions into every project — preserving resources for future generations.",
    icon:  `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  },
  {
    title: "Corporate Responsibility",
    body:  "We give back through job creation, volunteerism, internship programmes, and active support of community development projects.",
    icon:  `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>`,
  },
  {
    title: "Risk Management",
    body:  "Risk identification and mitigation is a core driver across all operations — using international best-practice systems and skilled professionals.",
    icon:  `<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
  },
];

export const VIDEO_WEBM = "./assets/hero-video.webm";
export const VIDEO_MP4  = "./assets/hero-video.mp4";
export const POSTER_SRC = "./assets/hero-poster.jpg";
