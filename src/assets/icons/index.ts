import { SkillLevel, type StackItem } from "@/types/stack";
import Eye from "./eye-of-nyrzeff.svg?react";
import { ChevronRight, Contact, Mail, Github, MapPin } from "lucide-react";

export const icons = {
  eye: Eye,
  chevronRight: ChevronRight,
  contact: Contact,
  mail: Mail,
  github: Github,
  mapPin: MapPin,
};

export const stackItems: StackItem[] = [
  {
    title: "C#",
    devicon: "devicon-csharp-plain colored",
  },
  {
    title: "Java",
    devicon: "devicon-java-plain colored",
  },
  {
    title: "HTML5",
    devicon: "devicon-html5-plain colored",
  },
  {
    title: "CSS3",
    devicon: "devicon-css3-plain colored",
  },
  {
    title: "JavaScript",
    devicon: "devicon-javascript-plain colored",
  },
  {
    title: "TypeScript",
    devicon: "devicon-typescript-plain colored",
  },
  {
    title: ".NET Core",
    devicon: "devicon-dotnetcore-plain colored",
  },
  {
    title: "React",
    devicon: "devicon-react-plain colored",
  },
  {
    title: "Node.js",
    devicon: "devicon-nodejs-plain colored",
  },
  {
    title: "PostgreSQL",
    devicon: "devicon-postgresql-plain colored",
  },
  {
    title: "Microsoft SQL Server",
    devicon: "devicon-microsoftsqlserver-plain colored",
  },
  {
    title: "Sass",
    devicon: "devicon-sass-plain colored",
  },
  {
    title: "Mocha",
    devicon: "devicon-mocha-plain colored",
  },
  {
    title: "Git",
    devicon: "devicon-git-plain colored",
  },
  {
    title: "Linux",
    devicon: "devicon-linux-plain",
  },
  {
    title: "Figma",
    devicon: "devicon-figma-plain colored",
  },
  {
    title: "OpenAPI",
    devicon: "devicon-openapi-plain colored",
  },
  {
    title: "Vercel",
    devicon: "devicon-vercel-plain",
  },
];
