import { adapter } from "../server/utils/db";
import { Lucia } from "lucia";
import { Google } from "arctic";

export const lucia = new Lucia(adapter, {
	sessionCookie: {
        name: 'oph2025-auth-cookie',
        expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
    getUserAttributes: (attributes) => {
        return {
            studentID: attributes.studentID,
            email: attributes.email,
            name: attributes.name,
            profile: attributes.profile
        }
    }
});

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.NEXT_PUBLIC_URL + "/api/auth/callback"
);

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: {
            studentID: string;
            email: string;
            name: string;
            profile: string;
        }
	}
}
