import { connection } from "next/server";
import { getMongoClient } from "@/lib/mongodb";

export async function GET() {
  await connection();

  try {
    const client = await getMongoClient();
    await client.db().command({ ping: 1 });

    return Response.json({ status: "ok", database: client.db().databaseName });
  } catch (error) {
    console.error("MongoDB health check failed:", error);
    return Response.json(
      { status: "error", message: "MongoDB connection failed" },
      { status: 503 },
    );
  }
}
