export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  href?: string;
  children?: NavChild[];
};

export const navigation: NavGroup[] = [
  {
    id: "what-we-do",
    label: "What we do",
    children: [
      {
        label: "AI-Augmented Development",
        href: "/services/ai-augmented-development",
        description: "AI in the delivery loop, measured on your codebase.",
      },
      {
        label: "AI Consulting & Implementation",
        href: "/services/ai-consulting-implementation",
        description: "Strategy to production with governed rollouts.",
      },
      {
        label: "AI Agent Development",
        href: "/services/ai-agent-development",
        description: "Custom agents and multi-agent orchestration.",
      },
      {
        label: "Technology Consulting",
        href: "/services/technology-consulting",
      },
      {
        label: "Digital Transformation",
        href: "/services/digital-transformation",
      },
      {
        label: "Custom Solution Development",
        href: "/services/custom-solution-development",
      },
      {
        label: "Team Extension",
        href: "/services/team-extension",
      },
      {
        label: "Software Product Engineering",
        href: "/services/software-product-engineering",
      },
      {
        label: "Application Modernization",
        href: "/services/application-modernization",
      },
      {
        label: "QA Automation",
        href: "/services/qa-automation",
      },
      {
        label: "Mobile App Development",
        href: "/services/mobile-app-development",
      },
      {
        label: "UI/UX Design",
        href: "/services/ui-ux-design",
      },
      {
        label: "Cloud Solutions & Consulting",
        href: "/services/cloud-solutions",
        description: "Migration, DevOps, infrastructure, modernization.",
      },
      {
        label: "Intelligent Platforms & Automation",
        href: "/services/intelligent-platforms",
        description: "RPA, ERP, enterprise integrations.",
      },
      {
        label: "Data & Analytics",
        href: "/services/data-analytics",
        description: "Engineering, lakes, warehouses, governance, BI.",
      },
      {
        label: "Security & Quality",
        href: "/services/security-quality",
        description: "DevSecOps, AppSec, pen testing, continuity.",
      },
      {
        label: "Embedded & IoT",
        href: "/services/embedded-iot",
      },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    children: [
      { label: "Finance", href: "/industries/finance" },
      { label: "Retail / E-commerce", href: "/industries/retail" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Telecom", href: "/industries/telecom" },
      { label: "Energy & Utilities", href: "/industries/energy" },
      { label: "Logistics & Supply Chain", href: "/industries/logistics" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "Agritech", href: "/industries/agritech" },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    href: "/insights",
    children: [
      { label: "Expert blog", href: "/insights?type=blog" },
      { label: "Reports", href: "/insights?type=report" },
      { label: "Whitepapers", href: "/insights?type=whitepaper" },
      { label: "Webinars", href: "/insights?type=webinar" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
  },
];
