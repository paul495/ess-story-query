import { cookies } from 'next/headers';

// In a real app, this might come from a DB or env vars
function getAuthorizedUsers() {
    const envUsers = process.env.AUTHORIZED_USERS;
    if (!envUsers) {
        // Default list if not set in environment (email:password)
        return [{ email: 'test@example.com', password: 'password123' }];
    }
    return envUsers.split(',').map(pair => {
        const [email, password] = pair.split(':');
        return {
            email: email?.trim().toLowerCase() || '',
            password: password?.trim() || ''
        };
    });
}

export function verifyCredentials(email: string, password: string) {
    const authorizedUsers = getAuthorizedUsers();
    const lowerEmail = email.trim().toLowerCase();
    return authorizedUsers.some(
        user => user.email === lowerEmail && user.password === password
    );
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
