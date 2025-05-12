export enum SkillLevel {
  Novice = "Novice",
  Familiar = "Familiar",
  Competent = "Competent",
  Proficient = "Proficient",
  Master = "Master",
}

export interface AdditionalInfo {
  skillLevel: SkillLevel;
  isActivelyLearning?: boolean;
}

export interface StackItem {
  title: string;
  devicon: string;
  additionalInfo: AdditionalInfo;
}
