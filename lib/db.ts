import { createClient } from "@libsql/client/web";

const url = process.env.TURSO_DATABASE_URL?.trim()?.replace("libsql://", "https://");
const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

if (!url || !authToken) {
    throw new Error("Missing Turso database credentials");
}

export const db = createClient({
    url,
    authToken,
});
