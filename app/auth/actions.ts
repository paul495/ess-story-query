'use server';

import { redirect } from 'next/navigation';
import { verifyCredentials, createSession, deleteSession } from '@/lib/auth';

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || !verifyCredentials(email, password)) {
        return {
            error: 'Invalid email or password.',
        };
    }

    await createSession();
    redirect('/');
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}
