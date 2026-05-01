const portfolioData = {
  name: "Faisal Khan Pathan",
  tagline: "AI & Data Science Engineer · Full-Stack Developer · Automation Architect",
  about:
    "Co-founder building AI-powered automation solutions for business workflows. Passionate about deep learning, computer vision, and building scalable full-stack systems. Currently pursuing B.Tech in AI & Data Science at KL University with 8.7 CGPA. Published researcher in computer vision and real-world AI deployment.",

  contact: {
    phone: "+91-7416252210",
    email: "faisal96kp@gmail.com",
    location: "Hyderabad, India",
  },

  links: {
    github: "https://github.com/faisal96kp",
    linkedin: "https://linkedin.com/in/faisal96kp",
    codechef: "https://www.codechef.com/users/faisalkhan_79",
  },

  skills: [
    {
      category: "Core Computer Science",
      items: ["Data Structures & Algorithms", "OOP", "Problem Solving"],
    },
    {
      category: "Deep Learning & CV",
      items: [
        "CNNs",
        "Transfer Learning",
        "Model Regularization",
        "Image Classification",
        "Grad-CAM",
        "t-SNE",
        "OpenCV",
        "TensorFlow/Keras",
      ],
    },
    {
      category: "ML & Data Science",
      items: ["Scikit-learn", "NumPy", "Pandas", "Model Evaluation", "Dataset Curation"],
    },
    {
      category: "Automation & Workflows",
      items: ["n8n", "Workflow Design", "API Integration", "Automation Anywhere"],
    },
    {
      category: "Full-Stack & Systems",
      items: ["Django", "React.js", "Node.js", "REST APIs"],
    },
    {
      category: "Databases",
      items: ["MongoDB", "SQL"],
    },
    {
      category: "Languages",
      items: ["Python", "Java", "JavaScript"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "Linux", "VS Code", "Google Colab", "Docker"],
    },
  ],

  experience: [
    {
      role: "Co-Founder",
      company: "Artisan Systems",
      type: "AI Automation Startup",
      period: "Present",
      highlights: [
        "Co-founded a startup building AI-powered automation solutions for business workflows",
        "Developing automated outreach agents to streamline business communication",
        "Designed HR automation systems: resume parsing, candidate shortlisting, communication pipelines",
        "Built finance automation workflows for invoice processing and approval systems",
        "Developed scalable automation pipelines using n8n with APIs, databases, and conditional logic",
      ],
    },
    {
      role: "Machine Learning Intern",
      company: "Unified Mentor",
      type: "Internship",
      period: "2024",
      highlights: [
        "Learned core ML concepts: supervised learning, model evaluation, data preprocessing",
        "Developed ASL hand sign detection system using CNNs and OpenCV",
        "Built a heart disease prediction model using patient data and classical ML techniques",
        "Gained hands-on experience with Python, Scikit-learn, and data handling workflows",
      ],
    },
  ],

  projects: [
    {
      title: "Synapse",
      subtitle: "AI-Powered Organizational Intelligence Platform",
      techStack: ["Full-stack Systems", "LLMs", "RAG"],
      description:
        "Built a full-stack platform integrating enterprise data sources (Google Drive, Gmail, Calendar, databases) for centralized AI-driven insights. Implemented semantic search using vector embeddings and retrieval-based querying. Developed intelligent query system with fallback mechanisms for LLM reliability.",
      github: "",
      live: "",
    },
    {
      title: "Automation Systems",
      subtitle: "HR, Finance and Data Orchestration",
      techStack: ["Workflow Automation", "API Integration", "Data Pipelines"],
      description:
        "Built end-to-end automation pipelines for HR and financial operations. Implemented resume parsing, candidate filtering, and automated communication systems. Designed production-grade data orchestration pipelines using n8n.",
      github: "",
      live: "",
    },
    {
      title: "ARMS",
      subtitle: "Academic Resource Management System",
      techStack: ["Full-stack Systems", "Deployment"],
      description:
        "Designed and deployed a centralized academic resource platform for students. Supports course-wise material uploads, search, notifications, and contributor ranking. Actively used by classmates with real-world deployment and usability.",
      github: "",
      live: "",
    },
    {
      title: "Emergency Gesture Recognition",
      subtitle: "ASL-Based Emergency Detection",
      techStack: ["Computer Vision", "Deep Learning", "CNNs"],
      description:
        "Designed a focused emergency gesture recognition system using static ASL signs (Doctor, Fire, Help, Stop, Exit). Built a compact CNN trained on grayscale 128×128 images. Achieved 97.42% accuracy on a cleaned emergency test set. Implemented Grad-CAM and t-SNE for model interpretability.",
      github: "",
      live: "",
    },
    {
      title: "ML Systems & Models",
      subtitle: "ASL Detection, Crypto Predictor, Heart Disease",
      techStack: ["CNN", "OpenCV", "Deep Learning", "ML"],
      description:
        "ASL Hand Sign Detection: Real-time gesture recognition using CNN and OpenCV. Crypto Predictor: Deep learning model using multi-feature market data. Heart Disease Detection: ML-based prediction using patient health data.",
      github: "",
      live: "",
    },
    {
      title: "Web & Real-Time Platforms",
      subtitle: "SyncStream, The Radio, PeerFusion",
      techStack: ["Socket.IO", "Real-time", "Web Platforms"],
      description:
        "Built multiple real-time and interactive web platforms. Implemented real-time synchronization using Socket.IO for multi-user interaction. Designed systems for media streaming, shared sessions, and real-time communication.",
      github: "",
      live: "",
    },
  ],

  education: [
    {
      institution: "KL University, Hyderabad",
      degree: "B.Tech in Artificial Intelligence & Data Science",
      cgpa: "8.7 / 10",
      period: "2024 – Present",
    },
  ],

  achievements: [
    "ThinkAI 2025 — Research paper accepted, presented, and published in Springer LNCS proceedings",
    "GDG Agentathon 2025 — Participant in the world's largest Agentic AI hackathon (Guinness World Record)",
    "Competitive Programming — CodeChef 2-star rated; solved 300+ problems",
    "University Hackathons — Participated in multiple AI-focused hackathons",
  ],

  certifications: [
    "Cambridge English Linguaskill (General) — CEFR Level B2",
    "Automation Anywhere Certified Professional",
    "ThinkAI 2025 Presenter Certificate",
  ],

  research: [
    {
      title: "Published Research Paper at ThinkAI 2025 (Springer LNCS)",
      areas: ["Computer Vision", "Gesture Recognition", "Real-world AI Deployment"],
    },
  ],
}

export default portfolioData
