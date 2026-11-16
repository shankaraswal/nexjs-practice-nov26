import { connection } from "next/server";
import { getPublicUsers } from "@/features/users/data";

export async function GET() {
  await connection();

  try {
    const users = await getPublicUsers();
    return Response.json({ users });
  } catch (error) {
    console.error("User list API failed:", error);
    return Response.json(
      { status: "error", message: "Could not load users" },
      { status: 503 },
    );
  }
}
