export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  highlights?: string[];
  links?: { label: string; href: string }[];
  embed?: { title: string; src: string };
};

export type Publication = {
  title: string;
  venue: string;
  year: string;
  notes?: string;
  links?: { label: string; href: string }[];
};

export const PROFILE = {
  name: "Saurabh Kulkarni",
  role: "Full‑Stack Developer • ML/AI • Embedded/FPGA",
  location: "Pune, India",
  education:
    "PICT • 2025 passout • E&TC background with AIML Honors",
  headline:
    "I build clean, fast web apps and practical ML/embedded systems — with strong documentation, measurable results, and production-minded engineering.",
  email: "saurabh.work555@gmail.com",
  phone: "+91 9765820449",
  availability: "Open to full-time roles • Internships • Freelance",
  socials: [
    { label: "GitHub", href: "https://github.com/saurabhdotdev" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
} as const;

export const STATS = [
  { label: "Scopus-indexed paper", value: "1" },
  { label: "Core domains", value: "Web • ML/AI • Embedded" },
  { label: "Graduation", value: "2025" },
] as const;

export const QUICK_WINS = [
  "Strong fundamentals: DSA, DBs, APIs, and system thinking",
  "Comfortable across stack: UI ↔ backend ↔ data",
  "Communicates clearly: clean README + structured work",
] as const;

export type Experience = {
  company: string;
  title: string;
  type?: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Endureva Innovations LLP",
    title: "Software Developer GTE",
    location: "Pune, Maharashtra",
    start: "Nov. 2025",
    end: "Present",
    bullets: [
      "Developed frontend data workflows using React.js and TanStack Query, optimizing caching, pagination, and refetch strategies, resulting in ~30% fewer redundant API calls.",
      "Designed and optimized PostgreSQL schemas with validations and migrations improving query performance by 25% for list and search endpoints.",
      "Implemented functional and integration tests to validate API correctness, edge cases, and concurrency behavior.",
    ],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  location: string;
  details: string[];
};

export const EDUCATION: Education[] = [
  {
    school: "Pune Institute of Computer Technology",
    degree:
      "B.E. Electronics and Telecommunication (AIML Honors) · CGPA: 7.95/10",
    period: "2021 — 2025",
    location: "Pune, Maharashtra",
    details: [
      "Coursework: Data Structures, Algorithms, Databases, Machine Learning, VLSI, Electronics, Cellular Networks",
      "Research: Published a Scopus indexed research paper on video watermarking using FPGA",
    ],
  },
  {
    school: "S.P. College",
    degree: "12th Standard · 90.00%",
    period: "2021",
    location: "Pune, Maharashtra",
    details: [],
  },
  {
    school: "Abhinava Vidyalaya Highschool",
    degree: "10th Standard · 91.20%",
    period: "2019",
    location: "Pune, Maharashtra",
    details: [],
  },
];

export const RESUME_SKILLS = {
  "Languages & Databases": [
    "Python",
    "C",
    "C++",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Java",
    "System Verilog",
  ],
  "Frameworks & Libraries": [
    "React.js",
    "Node.js",
    "Express.js",
    "Pandas",
    "NumPy",
  ],
  "AI and Data Analytics": [
    "Machine Learning Algorithms",
    "Artificial Intelligence",
    "Data Analysis",
  ],
  Tools: [
    "Git",
    "GitHub",
    "VS Code",
    "Jupyter Notebook",
    "Valgrind",
    "Vivado",
    "GCC",
    "GDB",
  ],
  "Embedded & Systems": [
    "Multi-threading",
    "Memory Management",
    "Operating Systems",
    "IPC",
    "System calls",
  ],
  "Hardware Interfaces": ["GPIO", "ADC", "UART", "I2C", "Serial Communications"],
} as const;

export const SKILLS = [
  "React",
  "TanStack Query",
  "Next.js",
  "Vue.js",
  "Node.js",
  "Express.js",
  "TypeScript",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Python",
  "C",
  "C++",
  "Java",
  "System Verilog",
  "Pandas",
  "NumPy",
  "Tailwind",
  "APIs",
  "ML",
  "AI",
  "Data Analysis",
  "Git",
  "Vivado",
  "GDB",
  "Embedded",
  "FPGA",
] as const;

export const PROJECTS: Project[] = [
  {
    slug: "video-watermarking-fpga",
    title: "Video Watermarking using FPGA",
    description:
      "Hardware-accelerated video watermarking pipeline designed for real-time embedding and extraction, targeting FPGA deployment with an emphasis on throughput and robustness.",
    tags: ["FPGA", "Embedded", "Video", "Security"],
    highlights: [
      "Designed and implemented an FPGA-based video watermarking architecture to embed and extract watermark information for digital content protection. Implemented resource-efficient fixed-point design for hardware constraints.",
      "Achieved 1 pixel/clock throughput with sub-frame latency. Developed real-time video watermarking on FPGA at 30 fps (640×480) using parallel, pipelined hardware.",
      "Performed simulation, timing validation, and hardware testing using Vivado.",
      "Conducted timing analysis and hardware debugging to identify and resolve signal integrity and latency issues.",
    ],
    embed: {
      title: "Demo (add your YouTube/embed URL)",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    links: [{ label: "Scopus indexed paper", href: "#" }],
  },
  {
    slug: "customer-segmentation",
    title: "Customer Segmentation (K-Means + DBSCAN)",
    description:
      "Unsupervised segmentation using K-Means and DBSCAN, with feature engineering and cluster profiling to produce interpretable customer groups.",
    tags: ["Machine Learning", "Clustering", "K-Means", "DBSCAN"],
    highlights: [
      "Performed customer segmentation on datasets with 50k+ records using K-Means and DBSCAN to identify purchasing patterns and customer clusters.",
    ],
  },
  {
    slug: "movie-recommendation",
    title: "Movie Recommendation System",
    description:
      "Recommendation system combining content-based signals and similarity scoring to suggest movies based on user preferences and item metadata.",
    tags: ["Machine Learning", "Recommender", "NLP", "Similarity"],
    highlights: [
      "Built a content-based recommender using metadata + similarity scoring",
      "Evaluated recommendations with simple offline checks and iterative tuning",
    ],
  },
  {
    slug: "text-abstracter-nlp",
    title: "Text Abstracter using NLP",
    description:
      "An NLP-based text summarization system that generates concise summaries for long documents.",
    tags: ["NLP", "Python", "Summarization"],
    highlights: [
      "Developed an NLP-based text summarization system capable of generating concise summaries from documents containing 500+ sentences.",
    ],
  },
  {
    slug: "air-quality-monitoring",
    title: "Air Quality Monitor System and Air filtering",
    description:
      "An IoT-style monitoring setup to track air quality metrics, visualize trends, and trigger alerts when readings exceed thresholds.",
    tags: ["Embedded", "IoT", "Sensors", "Monitoring"],
    highlights: [
      "Developed C-based firmware for ESP microcontroller interfacing with MQ-series sensors via ADC, GPIO, and UART. Implemented threshold-based interrupt-driven logic for real-time air filtration control.",
      "Implemented threshold-driven control logic enabling autonomous air filtration, enabling real-time response to unsafe air quality conditions and stable long-duration operation.",
      "Designed modular sensor abstraction layer and validated via hardware debugging.",
      "Debugged firmware using serial logs and hardware-level validation to detect ADC noise and interrupt misfire.",
    ],
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    title: "Video Watermarking using FPGA (Scopus Indexed)",
    venue: "Scopus Indexed Journal/Conference",
    year: "2025",
    notes:
      "Add the final paper title/venue details and the official link (DOI/Scopus/Publisher) to replace the placeholders.",
    links: [
      { label: "Paper link", href: "#" },
      { label: "DOI", href: "#" },
    ],
  },
];
