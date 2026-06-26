export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  colSpan: string;
  rowSpan: string;
}

export const features: Feature[] = [
  {
    id: "f1",
    title: "Real-time Processing",
    description: "Stream data with sub-millisecond latency. Handle millions of events per second without dropping frames.",
    icon: "zap",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-4",
    rowSpan: "row-span-1"
  },
  {
    id: "f2",
    title: "Predictive Models",
    description: "Forecast trends with machine learning. Identify patterns before they become obvious to the human eye.",
    icon: "chart",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1"
  },
  {
    id: "f3",
    title: "Automated Workflows",
    description: "Connect your tools and let AI handle the repetitive tasks automatically and seamlessly.",
    icon: "cpu",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1"
  },
  {
    id: "f4",
    title: "Enterprise Security",
    description: "Bank-grade encryption, SOC2 compliance, and role-based access control built-in from day one.",
    icon: "shield",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1"
  },
  {
    id: "f5",
    title: "Seamless Integration",
    description: "Deploy in minutes with our native connectors for Postgres, MongoDB, and every major data warehouse.",
    icon: "plug",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1"
  }
];
