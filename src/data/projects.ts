/**
 * All project data lives here. Edit freely.
 *
 * - `image`: optional path under /public (e.g. "/projects/optify.webp").
 *   When omitted, a generated gradient + monogram placeholder is shown.
 * - `featured`: shown on the home page.
 * - Projects are displayed in the order listed below.
 */

export const categories = [
  "Products",
  "Full stack",
  "Backend",
  "Machine learning",
  "Blockchain",
  "Web",
] as const;

export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  year: number;
  category: Category;
  url: string;
  repo?: string;
  tech: string[];
  featured?: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "optify-seo-ai",
    title: "Optify",
    blurb:
      "AI-powered SEO platform that researches keywords, writes and publishes articles to connected sites, and audits on-page SEO from one dashboard.",
    year: 2026,
    category: "Products",
    url: "https://optifyseo.ai",
    repo: "https://github.com/ikbalrslan/optify-seo-ai",
    tech: ["TypeScript"],
    featured: true,
  },
  {
    slug: "fdg",
    title: "FDG",
    blurb:
      "Factory monitoring app that collects robot and industrial PC states into MySQL, with live and historical views in a web dashboard.",
    year: 2026,
    category: "Full stack",
    url: "https://github.com/ikbalrslan/FDG",
    repo: "https://github.com/ikbalrslan/FDG",
    tech: ["JavaScript", "React", "Node.js", "Socket.io", "MySQL"],
    featured: true,
  },
  {
    slug: "lether",
    title: "Lether",
    blurb: "Website for Lether, built with Next.js.",
    year: 2024,
    category: "Web",
    url: "https://lether.vercel.app",
    repo: "https://github.com/ikbalrslan/lether",
    tech: ["TypeScript", "Next.js"],
  },
  {
    slug: "github-io",
    title: "ikbalrslan.github.io",
    blurb: "An earlier version of my personal portfolio site, built with Django.",
    year: 2023,
    category: "Web",
    url: "https://github.com/ikbalrslan/ikbalrslan.github.io",
    repo: "https://github.com/ikbalrslan/ikbalrslan.github.io",
    tech: ["Python", "Django"],
  },
  {
    slug: "socialmedia",
    title: "Social Media Backend",
    blurb: "Backend for a social media app with post APIs, built with Spring Boot and PostgreSQL.",
    year: 2022,
    category: "Backend",
    url: "https://github.com/ikbalrslan/socialmedia",
    repo: "https://github.com/ikbalrslan/socialmedia",
    tech: ["Java", "Spring Boot", "PostgreSQL"],
  },
  {
    slug: "reading-is-good",
    title: "ReadingIsGood",
    blurb:
      "Online book retail backend covering customers, books, orders and stock, built with Spring Boot and MongoDB.",
    year: 2022,
    category: "Backend",
    url: "https://github.com/ikbalrslan/ReadingIsGood",
    repo: "https://github.com/ikbalrslan/ReadingIsGood",
    tech: ["Java", "Spring Boot", "MongoDB", "Docker"],
    featured: true,
  },
  {
    slug: "student-control-system",
    title: "Student Control System",
    blurb: "Open-source student control web application built with Spring Boot, Hibernate and PostgreSQL.",
    year: 2021,
    category: "Backend",
    url: "https://github.com/ikbalrslan/StudentControlSystem",
    repo: "https://github.com/ikbalrslan/StudentControlSystem",
    tech: ["Java", "Spring Boot", "Hibernate", "PostgreSQL"],
  },
  {
    slug: "detection-of-fake-news",
    title: "Detection of Fake News",
    blurb: "Machine learning project for detecting fake news, developed in Jupyter notebooks.",
    year: 2020,
    category: "Machine learning",
    url: "https://github.com/ikbalrslan/Detection-of-FakeNews",
    repo: "https://github.com/ikbalrslan/Detection-of-FakeNews",
    tech: ["Python", "Jupyter"],
    featured: true,
  },
  {
    slug: "real-estate-price-estimation",
    title: "Real Estate Price Estimation",
    blurb:
      "Course project that estimates real estate prices from listing data and room photos, ending in a hybrid neural network and CNN model.",
    year: 2020,
    category: "Machine learning",
    url: "https://github.com/ikbalrslan/Price-estimation-for-real-estates",
    repo: "https://github.com/ikbalrslan/Price-estimation-for-real-estates",
    tech: ["Python", "Neural networks", "CNN"],
  },
  {
    slug: "flower-classification",
    title: "Flower Classification",
    blurb: "Neural network that classifies flower images, with train and test scripts and a report notebook.",
    year: 2020,
    category: "Machine learning",
    url: "https://github.com/ikbalrslan/Classification-of-flowers-using-NeuralNetwork",
    repo: "https://github.com/ikbalrslan/Classification-of-flowers-using-NeuralNetwork",
    tech: ["Python", "Jupyter"],
  },
  {
    slug: "book-recommendation",
    title: "Book Recommendation System",
    blurb: "Early-stage book recommendation system project.",
    year: 2020,
    category: "Machine learning",
    url: "https://github.com/ikbalrslan/Book-recommendation-system",
    repo: "https://github.com/ikbalrslan/Book-recommendation-system",
    tech: [],
  },
  {
    slug: "blockchain-smart-contract",
    title: "Shared Taxi Smart Contract",
    blurb: "Solidity smart contract for a shared taxi business, handling ticket payments, driver salaries and profit sharing.",
    year: 2020,
    category: "Blockchain",
    url: "https://github.com/ikbalrslan/Blockchain-SmartContract",
    repo: "https://github.com/ikbalrslan/Blockchain-SmartContract",
    tech: ["Solidity"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
