'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from '@/app/auth/actions';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            {pending ? 'Authenticating...' : 'Sign In'}
        </button>
    );
}

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);

    async function clientAction(formData: FormData) {
        const result = await login(formData);
        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden font-sans selection:bg-indigo-500/30">
            {/* Dynamic Background Effects */}
            <div className="absolute top-0 -left-1/4 w-[150%] h-[500px] bg-gradient-to-b from-indigo-900/40 via-purple-900/20 to-transparent blur-3xl -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-0 right-0 w-1/3 h-[400px] bg-fuchsia-900/20 blur-3xl -z-10 rounded-full" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium tracking-wide shadow-sm shadow-indigo-500/10 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        <span>Secure Access</span>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-100">
                        Welcome Back
                    </h2>
                    <p className="mt-3 text-sm text-slate-400">
                        Sign in with an authorized email to access the Data Intelligence Hub.
                    </p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl py-8 px-6 shadow-2xl shadow-black/50 sm:rounded-2xl sm:px-10 border border-slate-800/60 transition-all duration-300 hover:border-indigo-500/30">
                    <form action={clientAction} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                Email Address
                            </label>
                            <div className="mt-2 text-slate-300">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2.5 border border-slate-700 bg-slate-800/50 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm text-slate-100 placeholder:text-slate-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-md bg-red-900/30 border border-red-500/30 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-400">{error}</h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <SubmitButton />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
