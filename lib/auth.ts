import { cookies } from 'next/headers';

// In a real app, this might come from a DB or env vars
function getAuthorizedEmails() {
    const envEmails = process.env.AUTHORIZED_EMAILS;
    if (!envEmails) {
        // Default list if not set in environment
        return ['test@example.com'];
    }
    return envEmails.split(',').map(email => email.trim().toLowerCase());
}

export function isEmailAuthorized(email: string) {
    const authorizedEmails = getAuthorizedEmails();
    return authorizedEmails.includes(email.trim().toLowerCase());
}

export async function createSession() {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const cookieStore = await cookies();

    cookieStore.set('auth_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_session');
}
