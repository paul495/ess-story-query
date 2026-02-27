'use client';

import React, { useTransition, useState, useRef } from "react";
import { searchStories } from "@/app/actions";
import { Loader2, Search, Calendar, Link as LinkIcon, FileText, AlignLeft, Hash, Film, User, Tag } from "lucide-react";

interface SearchFormProps {
    onResults: (results: any[]) => void;
}

export function SearchForm({ onResults }: SearchFormProps) {
    const [isPending, startTransition] = useTransition();
    const [isExpanded, setIsExpanded] = useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);

    function triggerSearch(form: HTMLFormElement) {
        const formData = new FormData(form);
        startTransition(async () => {
            const results = await searchStories(formData);
            onResults(results);
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        triggerSearch(event.currentTarget);
    }

    function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
        const target = event.target as unknown as HTMLInputElement;
        if (target.name === 'essCode') {
            const regex = /^E-0\d{5}$/;
            if (regex.test(target.value) || target.value.length === 0) {
                if (formRef.current) triggerSearch(formRef.current);
            }
        }
    }

    const inputClasses = "mt-1 block w-full rounded-xl border border-slate-700/50 bg-slate-800/50 text-slate-200 shadow-inner placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm p-3 transition-colors duration-200 backdrop-blur-sm";
    const labelClasses = "flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1";

    return (
        <form ref={formRef} onSubmit={handleSubmit} onChange={handleChange} className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-700/50 ring-1 ring-white/5 space-y-6 relative overflow-hidden group">
            {/* Subtle glow effect behind form */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-1000 blur-xl pointer-events-none" />

            <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Primary Search Fields */}
                    <div>
                        <label htmlFor="essCode" className={labelClasses}>
                            <Hash className="w-4 h-4 mr-1.5 text-indigo-400" /> ESS Code
                        </label>
                        <input type="text" name="essCode" id="essCode" placeholder="e.g. E-012345" className={inputClasses} />
                    </div>

                    <div>
                        <label htmlFor="segmentName" className={labelClasses}>
                            <Film className="w-4 h-4 mr-1.5 text-purple-400" /> Story Name
                        </label>
                        <input type="text" name="segmentName" id="segmentName" placeholder="e.g. Good Neighbor" className={inputClasses} />
                    </div>

                    <div>
                        <label htmlFor="producer" className={labelClasses}>
                            <User className="w-4 h-4 mr-1.5 text-blue-400" /> Producer
                        </label>
                        <input type="text" name="producer" id="producer" placeholder="Producer Name" className={inputClasses} />
                    </div>

                    <div>
                        <label htmlFor="status" className={labelClasses}>
                            <Tag className="w-4 h-4 mr-1.5 text-emerald-400" /> Status
                        </label>
                        <select name="status" id="status" className={inputClasses}>
                            <option value="All" className="bg-slate-800">All Statuses</option>
                            <option value="Approved For TV" className="bg-slate-800">Approved For TV</option>
                            <option value="Approved For Digital" className="bg-slate-800">Approved For Digital</option>
                            <option value="Pending For Approval" className="bg-slate-800">Pending For Approval</option>
                            <option value="Approved For Telethon" className="bg-slate-800">Approved For Telethon</option>
                        </select>
                    </div>

                    {/* Secondary Search Fields (Always visible or toggleable, let's keep them visible in the grid) */}
                    <div>
                        <label htmlFor="theme" className={labelClasses}>
                            <Tag className="w-4 h-4 mr-1.5 text-rose-400" /> Theme
                        </label>
                        <input type="text" name="theme" id="theme" placeholder="e.g. Hope" className={inputClasses} />
                    </div>

                    <div>
                        <label htmlFor="uploadDate" className={labelClasses}>
                            <Calendar className="w-4 h-4 mr-1.5 text-orange-400" /> Upload Date
                        </label>
                        <input type="date" name="uploadDate" id="uploadDate" className={`${inputClasses} [color-scheme:dark]`} />
                    </div>

                    <div>
                        <label htmlFor="youtubeLink" className={labelClasses}>
                            <LinkIcon className="w-4 h-4 mr-1.5 text-red-400" /> YouTube Link
                        </label>
                        <input type="text" name="youtubeLink" id="youtubeLink" placeholder="youtu.be/..." className={inputClasses} />
                    </div>

                    <div>
                        <label htmlFor="storySynopsis" className={labelClasses}>
                            <AlignLeft className="w-4 h-4 mr-1.5 text-cyan-400" /> Synopsis
                        </label>
                        <input type="text" name="storySynopsis" id="storySynopsis" placeholder="Keywords in synopsis..." className={inputClasses} />
                    </div>

                    <div className="lg:col-span-3 xl:col-span-4">
                        <label htmlFor="storySummary" className={labelClasses}>
                            <FileText className="w-4 h-4 mr-1.5 text-fuchsia-400" /> Story Summary
                        </label>
                        <input type="text" name="storySummary" id="storySummary" placeholder="Search within the full summary..." className={inputClasses} />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-700/50 pt-6">
                    <p className="text-sm text-slate-400">
                        Fill in any combination of fields to filter the results.
                    </p>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="group relative inline-flex items-center justify-center rounded-xl bg-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:bg-indigo-400 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Search className="-ml-1 mr-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                Execute Query
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
