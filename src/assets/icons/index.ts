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
    title: "React",
    devicon: "devicon-react-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
      isActivelyLearning: true,
    },
  },
  {
    title: "JavaScript",
    devicon: "devicon-javascript-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
    },
  },
  {
    title: "TypeScript",
    devicon: "devicon-typescript-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
    },
  },
  {
    title: "Bash",
    devicon: "devicon-bash-plain",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "C",
    devicon: "devicon-c-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "Python",
    devicon: "devicon-python-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "Rust",
    devicon: "devicon-rust-plain",
    additionalInfo: {
      skillLevel: SkillLevel.Novice,
      isActivelyLearning: true,
    },
  },
  {
    title: "HTML5",
    devicon: "devicon-html5-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
    },
  },
  {
    title: "CSS3",
    devicon: "devicon-css3-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Sass",
    devicon: "devicon-sass-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Vue.js",
    devicon: "devicon-vuejs-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Vuetify",
    devicon: "devicon-vuetify-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Gatsby",
    devicon: "devicon-gatsby-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "Tailwind CSS",
    devicon: "devicon-tailwindcss-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Novice,
      isActivelyLearning: true,
    },
  },
  {
    title: "Node.js",
    devicon: "devicon-nodejs-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Mocha",
    devicon: "devicon-mocha-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "MongoDB",
    devicon: "devicon-mongodb-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
      isActivelyLearning: true,
    },
  },
  {
    title: "Elasticsearch",
    devicon: "devicon-elasticsearch-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "Express",
    devicon: "devicon-express-original",
    additionalInfo: {
      skillLevel: SkillLevel.Novice,
      isActivelyLearning: true,
    },
  },
  {
    title: "Git",
    devicon: "devicon-git-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
    },
  },
  {
    title: "GitHub",
    devicon: "devicon-github-original",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
    },
  },
  {
    title: "GitLab",
    devicon: "devicon-gitlab-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "ESLint",
    devicon: "devicon-eslint-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Vite",
    devicon: "devicon-vite-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
    },
  },
  {
    title: "Webpack",
    devicon: "devicon-webpack-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "Docker",
    devicon: "devicon-docker-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "Jenkins",
    devicon: "devicon-jenkins-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "Linux",
    devicon: "devicon-linux-plain",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
    },
  },
  {
    title: "Arch Linux",
    devicon: "devicon-archlinux-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Vim",
    devicon: "devicon-vim-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Neovim",
    devicon: "devicon-neovim-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "PNPM",
    devicon: "devicon-pnpm-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
    },
  },
  {
    title: "Homebrew",
    devicon: "devicon-homebrew-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Next.js",
    devicon: "devicon-nextjs-plain",
    additionalInfo: {
      skillLevel: SkillLevel.Novice,
      isActivelyLearning: true,
    },
  },
  {
    title: "Java",
    devicon: "devicon-java-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "Gradle",
    devicon: "devicon-gradle-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Novice,
    },
  },
  {
    title: "Figma",
    devicon: "devicon-figma-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "Inkscape",
    devicon: "devicon-inkscape-plain",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "GraphQL",
    devicon: "devicon-graphql-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
  {
    title: "JSON",
    devicon: "devicon-json-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Proficient,
    },
  },
  {
    title: "Lua",
    devicon: "devicon-lua-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Novice,
      isActivelyLearning: true,
    },
  },
  {
    title: "Markdown",
    devicon: "devicon-markdown-plain",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "MaterialUI",
    devicon: "devicon-materialui-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Novice,
      isActivelyLearning: true,
    },
  },
  {
    title: "OpenAPI",
    devicon: "devicon-openapi-plain colored",
    additionalInfo: {
      skillLevel: SkillLevel.Competent,
    },
  },
  {
    title: "Vercel",
    devicon: "devicon-vercel-plain",
    additionalInfo: {
      skillLevel: SkillLevel.Familiar,
    },
  },
];
