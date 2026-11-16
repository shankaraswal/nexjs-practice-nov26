"use server";

import { MongoServerError } from "mongodb";
import { hashPassword } from "@/lib/password";
import { createUser } from "./data";
import type { RegistrationState } from "./registration-state";

function getTextField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function registerUser(
  _previousState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const name = getTextField(formData, "name").trim();
  const email = getTextField(formData, "email").trim().toLowerCase();
  const password = getTextField(formData, "password");
  const confirmPassword = getTextField(formData, "confirmPassword");

  if (name.length < 2 || name.length > 80) {
    return { status: "error", message: "Name must be 2 to 80 characters." };
  }

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { status: "error", message: "Enter a valid email address." };
  }

  if (!/^[0-9]{4}$/.test(password)) {
    return { status: "error", message: "PIN must be exactly 4 digits." };
  }

  if (password !== confirmPassword) {
    return { status: "error", message: "PINs do not match." };
  }

  try {
    await createUser({
      name,
      email,
      passwordHash: await hashPassword(password),
    });

    return {
      status: "success",
      message: "Account registered. Sign-in is not enabled yet.",
    };
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return {
        status: "error",
        message: "An account with this email already exists.",
      };
    }

    console.error("User registration failed:", error);
    return {
      status: "error",
      message: "Registration failed. Check the database connection and try again.",
    };
  }
}
