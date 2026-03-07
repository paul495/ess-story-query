'use server';

import { redirect } from 'next/navigation';
import { isEmailAuthorized, createSession, deleteSession } from '@/lib/auth';

export async function login(formData: FormData) {
    const email = formData.get('email') as string;

    if (!email || !isEmailAuthorized(email)) {
        return {
            error: 'Unauthorized email address.',
        };
    }

    await createSession();
    redirect('/');
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}
