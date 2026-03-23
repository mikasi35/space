
// ── BRAND TOKENS ────────────────────────────────────
export const BRAND = {
    orange: "#3bdfdf",
    red: "#ba0000",
    dark: "#0A0A0B",
    navy: "#0D1B3E",
    white: "#FFFFFF",
    offwhite: "#F8F7F4",
    gray: "#6B7280",
    lightgray: "#E5E7EB",
    ivory: "#F8F5EF",
    navyMid: "#16213A",
    gold: "#C9A84C",
    goldLight: "#E2C47A",
    goldDim: "#A0803A",
    slate: "#4A5568",
    mist: "#8896A8",
        green: "#6f0202",

    


};

export const FONT = {
    heading: `'Cormorant Garamond', 'Playfair Display', Georgia, serif`,
    body: `'DM Sans', 'Outfit', system-ui, sans-serif`,
    mono: `'DM Mono', 'Fira Code', monospace`,
};

export const FONTS_HREF =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
export const SECTION_PAD = "100px 24px";
export const MAX_WIDTH = 1200;


// ── SITE DATA ───────────────────────────────────────
export const STATS = [
    { value: "2000+", label: "Housing Units Planned" },
    { value: "500+", label: "Jobs Created" },
    { value: "4", label: "Counties Active" },
    { value: "100%", label: "Quality Commitment" },
];

export const SERVICES = [
    {
        id: 1,
        title: "General export construction",
        desc: "From foundations to finishing — full-cycle export construction with precision scheduling, quality control, and safety compliance.",
        icon: `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    },
    {
        id: 2,
        title: "Road & Bridge Works",
        desc: "Highways, local roads, bridges and rehabilitation — built to international standards with meticulous attention to durability.",
        icon: `<path d="M3 17l3-6h12l3 6M5 17h14M8 11V7M16 11V7M12 11V5"/>`,
    },
    {
        id: 3,
        title: "Electrical Works",
        desc: "Solar LED street lighting, solar water heating, solar farms, and off-grid power solutions for efficiency and sustainability.",
        icon: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
    },
    {
        id: 4,
        title: "Water Works",
        desc: "Borehole drilling, dam export construction, water catchment systems and community solar pumping — delivering water where it matters.",
        icon: `<path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>`,
    },
    {
        id: 5,
        title: "Project Design & Management",
        desc: "End-to-end project planning, risk management, and delivery control — on time, within budget, without compromise.",
        icon: `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>`,
    },
    {
        id: 6,
        title: "Interior Design & Renovation",
        desc: "Transforming commercial and residential spaces with cutting-edge design thinking and impeccable craftsmanship.",
        icon: `<path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>`,
    },
];

export const VALUES = [
    { title: "Professionalism", desc: "Every engagement reflects our highest standard of conduct and technical mastery." },
    { title: "Integrity", desc: "Accountable, transparent, and honest in every project and partnership." },
    { title: "Innovation", desc: "Embracing new talent and technologies to deliver cutting-edge solutions." },
    { title: "Teamwork", desc: "Collaborative by nature — with clients, communities, and our crews." },
];

export const PROJECTS = [
    { type: "Buildings", label: "Residential & Commercial" },
    { type: "Roads", label: "Highways & Local Roads" },
    { type: "Hospitals", label: "Healthcare Facilities" },
    { type: "Schools", label: "Educational Institutions" },
    { type: "Dams", label: "Water Reservoirs" },
    { type: "Boreholes", label: "Water Access Points" },
    { type: "Apartments", label: "Multi-unit Developments" },
    { type: "Solar", label: "Renewable Energy Farms" },
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
        body: "We integrate long-term economic, environmental, and social dimensions into every project — preserving resources for future generations.",
        icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    },
    {
        title: "Corporate Responsibility",
        body: "We give back through job creation, volunteerism, internship programmes, and active support of community development projects.",
        icon: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>`,
    },
    {
        title: "Risk Management",
        body: "Risk identification and mitigation is a core driver across all operations — using international best-practice systems and skilled professionals.",
        icon: `<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
    },
];

export const VIDEO_WEBM = "./assets/hero-video.webm";
export const VIDEO_MP4 = "./assets/hero-video.mp4";
export const POSTER_SRC = "./assets/hero-poster.jpg";

export const SERVICE_META = {
    1: {
        photo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=600&fit=crop&auto=format&q=75",
        category: "Civil",
        stats: [{ label: "Projects", value: "47+" }, { label: "Avg. Duration", value: "14 mo" }, { label: "On-Time Rate", value: "98%" }],
    },
    2: {
        photo: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=600&fit=crop&auto=format&q=75",
        category: "Infrastructure",
        stats: [{ label: "km Built", value: "340+" }, { label: "Bridges", value: "12" }, { label: "ISO Compliance", value: "100%" }],
    },
    3: {
        photo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&h=600&fit=crop&auto=format&q=75",
        category: "Energy",
        stats: [{ label: "Capacity Added", value: "+480MW" }, { label: "Substations", value: "7" }, { label: "Uptime SLA", value: "99.98%" }],
    },
    4: {
        photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop&auto=format&q=75",
        category: "Utility",
        stats: [{ label: "Pipeline km", value: "340+" }, { label: "Communities", value: "2.1M" }, { label: "Zero LTIs", value: "8 yrs" }],
    },
    5: {
        photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=600&fit=crop&auto=format&q=75",
        category: "Management",
        stats: [{ label: "Projects Led", value: "60+" }, { label: "On Budget", value: "96%" }, { label: "Client Retention", value: "91%" }],
    },
    6: {
        photo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&h=600&fit=crop&auto=format&q=75",
        category: "Design",
        stats: [{ label: "Spaces Done", value: "35+" }, { label: "Satisfaction", value: "4.9/5" }, { label: "Repeat Clients", value: "78%" }],
    },
};

export const ENRICHED = SERVICES.map(s => ({ ...s, ...(SERVICE_META[s.id] || SERVICE_META[1]) }));

export const SERVICE_CATEGORIES = [
    {
        id: "construction",
        title: "General Construction",
        category: "Civil",
        tagline: "From foundations to finishing — full-cycle construction with precision scheduling, quality control, and safety compliance.",
        photo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=700&fit=crop&auto=format&q=75",
        color: BRAND.orange,
        subServices: [
            {
                title: "Construction of Buildings",
                desc: "Site clearance, setting out, excavation of foundations, reinforcement placement and concrete casting — from residential to institutional.",
                photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Construction of Dams",
                desc: "Dam and reservoir specialists applying expertise from design-assist through roller-compacted concrete, conventional concrete, and earth fill placement.",
                photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Construction of Boreholes",
                desc: "Drilling at appropriate diameters to client specifications. Equipment maintained to highest Health & Safety standards for efficient, low-disruption drilling.",
                photo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Construction of Schools",
                desc: "Hands-on management of schedule, cost and quality — all with a vigilant focus on safety — delivering functional, durable learning environments.",
                photo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Construction of Hospitals",
                desc: "Every healthcare project is unique. Single-floor renovations, complex seismic upgrades, wayfinding and infection control protocol — we manage it all.",
                photo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Construction of Apartments",
                desc: "A construction method that surpasses stick-building approaches — saving time, delivering unprecedented quality, and extending system-built capabilities.",
                photo: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Perimeter Walls & Security",
                desc: "Whole security systems from perimeter walls to integrated alarm and surveillance — for commercial and residential estates.",
                photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format&q=75",
            },
        ],
        stats: [{ label: "Projects", value: "47+" }, { label: "On-Time Rate", value: "98%" }, { label: "ISO Compliance", value: "100%" }],
    },
    {
        id: "roads",
        title: "Road & Bridge Works",
        category: "Infrastructure",
        tagline: "Highways, local roads, bridges and rehabilitation — built to international standards with meticulous attention to durability.",
        photo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=700&fit=crop&auto=format&q=75",
        color: "#2a6b9c",
        subServices: [
            {
                title: "Road Building",
                desc: "Vast experience across all paving types: highways, local roads, private drives, subdivisions, commercial parking lots, and industrial drives.",
                photo: "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Road Rehabilitation",
                desc: "Restoring deteriorated road infrastructure to full operational standard — cost-effective programmes that extend asset life significantly.",
                photo: "https://images.unsplash.com/photo-1597106776019-b75892be2b7a?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Road Marking",
                desc: "Precision line marking for highways, commercial parking areas, intersections and pedestrian crossings — conforming to Kenya Roads Board standards.",
                photo: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Bridge Construction",
                desc: "From clearance and setting-out through foundation excavation, reinforcement, and concrete casting — bridges engineered for longevity.",
                photo: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=500&fit=crop&auto=format&q=75",
            },
        ],
        stats: [{ label: "km Built", value: "340+" }, { label: "Bridges", value: "12" }, { label: "Avg. Delivery", value: "On Time" }],
    },
    {
        id: "electrical",
        title: "Electrical Works",
        category: "Energy",
        tagline: "Solar LED street lighting, solar water heating, solar farms, and off-grid power solutions for efficiency and sustainability.",
        photo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=700&fit=crop&auto=format&q=75",
        color: "#c47f1a",
        subServices: [
            {
                title: "Solar LED Street Lighting",
                desc: "Cost-effective outdoor lighting for residential streets, parking areas, and security applications — especially valuable off-grid.",
                photo: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Solar Water Heating Systems",
                desc: "Rooftop and outdoor solar panels providing commercial and domestic hot water without heavy power bills. Eco-friendly and now a legal requirement.",
                photo: "https://images.unsplash.com/photo-1611365892117-bede7a956882?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Solar Farms (Off-Grid & Telecoms)",
                desc: "Supply, installation and maintenance of solar farms from 1MWp and above — ideal for off-grid locations and telecoms power supply.",
                photo: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Community Solar Water Pumping",
                desc: "Low-cost pumping systems with as few as four solar modules — delivering clean water access to rural and remote communities.",
                photo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Solar Power House (SPH) Backup",
                desc: "Grid-connected and hybrid energy backup solutions combining solar, wind, and grid connectivity for homes and commercial premises.",
                photo: "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=800&h=500&fit=crop&auto=format&q=75",
            },
        ],
        stats: [{ label: "Capacity Added", value: "+480MW" }, { label: "Substations", value: "7" }, { label: "Uptime SLA", value: "99.98%" }],
    },
    {
        id: "water",
        title: "Water Works",
        category: "Utility",
        tagline: "Borehole drilling, dam construction, water catchment systems and community solar pumping — delivering water where it matters.",
        photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=700&fit=crop&auto=format&q=75",
        color: "#2e7d5e",
        subServices: [
            {
                title: "Borehole Drilling",
                desc: "Drilling at appropriate diameters for required water yield. Equipment maintained to highest standards — efficient, minimising disruption.",
                photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Dam Construction",
                desc: "Best-in-class dam and reservoir specialists applying expertise from design-assist through roller-compacted and conventional concrete or earth fill.",
                photo: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Water Catchment Systems",
                desc: "Residential and commercial rainwater harvesting and catchment construction — sustainable water security for buildings and communities.",
                photo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Community Solar Pumping",
                desc: "Low-cost solar-powered water pumping for rural communities — the only viable solution in many remote areas.",
                photo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&auto=format&q=75",
            },
        ],
        stats: [{ label: "Pipeline km", value: "340+" }, { label: "Communities", value: "2.1M" }, { label: "Zero LTIs", value: "8 Yrs" }],
    },
    {
        id: "design",
        title: "Project Design & Management",
        category: "Management",
        tagline: "End-to-end project planning, risk management, and delivery control — on time, within budget, without compromise.",
        photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=700&fit=crop&auto=format&q=75",
        color: "#7a3d8f",
        subServices: [
            {
                title: "Project Planning & Scheduling",
                desc: "Detailed project plans built prior to commencement — partnering with clients to ensure timeous resourcing of people, material and equipment.",
                photo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Risk Management",
                desc: "Best-practice risk methodologies filtering through all processes — identifying and mitigating risk across both the organisation and individual projects.",
                photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Cost Estimation & Control",
                desc: "Up-to-date estimating, accounting and project control software — bids verified against extensive cost histories for accuracy and competitiveness.",
                photo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Quality Assurance",
                desc: "ISO-aligned quality management systems maintained and continually improved — services verified against applicable requirements at every stage.",
                photo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&auto=format&q=75",
            },
        ],
        stats: [{ label: "Projects Led", value: "60+" }, { label: "On Budget", value: "96%" }, { label: "Client Retention", value: "91%" }],
    },
    {
        id: "interior",
        title: "Interior Design & Renovation",
        category: "Design",
        tagline: "Transforming commercial and residential spaces with cutting-edge design thinking and impeccable craftsmanship.",
        photo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=700&fit=crop&auto=format&q=75",
        color: "#c0392b",
        subServices: [
            {
                title: "Commercial Fit-Out",
                desc: "Office, retail, and hospitality interiors designed around functionality, brand expression, and long-term durability.",
                photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Residential Renovation",
                desc: "Full and partial home renovations — from structural reconfiguration to finish specification — managed end-to-end.",
                photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop&auto=format&q=75",
            },
            {
                title: "Space Planning & Design",
                desc: "Innovative, sustainable design solutions developed by new talent with cutting-edge tools — translating ideas into spaces that upgrade living standards.",
                photo: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&h=500&fit=crop&auto=format&q=75",
            },
        ],
        stats: [{ label: "Spaces", value: "35+" }, { label: "Satisfaction", value: "4.9/5" }, { label: "Repeat Clients", value: "78%" }],
    },
];

export const PRIMARY = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Investors", href: "/investors" },
    { label: "Contact", href: "/contact" },
];