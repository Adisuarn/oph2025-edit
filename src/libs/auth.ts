import { adapter } from "@/server/utils/db";
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
            tag: attributes.tag,
            key: attributes.key,
            email: attributes.email,
            name: attributes.name,
            picture: attributes.picture,
            TUCMC: attributes.TUCMC
        }
    }
});

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.NEXT_PUBLIC_BASE_URL + "/auth/callback"
);

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: {
            tag: string;
            key: string;
            email: string;
            name: string;
            picture: string;
            TUCMC: boolean;
        }
	}
}
