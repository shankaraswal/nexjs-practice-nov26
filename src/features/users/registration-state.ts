export type RegistrationState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialRegistrationState: RegistrationState = {
  status: "idle",
  message: "",
};
