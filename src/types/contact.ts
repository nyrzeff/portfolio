export interface FormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = "idle" | "sending" | "success" | "error";
