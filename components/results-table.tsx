import { Story } from "@/app/actions";
import { ExternalLink, ChevronDown, AlignLeft, FileText } from "lucide-react";

interface ResultsTableProps {
    results: Story[];
}

export function ResultsTable({ results }: ResultsTableProps) {
    if (results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl">
                <div className="w-16 h-16 mb-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700/50 shadow-inner">
                    <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-slate-200 mb-2">No stories found</h3>
                <p className="text-slate-400 max-w-sm">
                    We couldn't find any stories matching your current filters. Try adjusting your search criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden ring-1 ring-white/5">
            <div className="overflow-x-auto custom-scrollbar">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-slate-700/50 text-left">
                        <thead className="bg-slate-800/50 backdrop-blur-md">
                            <tr>
                                <th scope="col" className="py-4 pl-6 pr-3 text-xs font-semibold text-slate-300 uppercase tracking-wider whitespace-nowrap">ESS Code</th>
                                <th scope="col" className="px-3 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider whitespace-nowrap">Story Name & Producer</th>
                                <th scope="col" className="px-3 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider whitespace-nowrap">Theme, Status & Lang</th>
                                <th scope="col" className="px-3 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider min-w-[200px]">Synopsis</th>
                                <th scope="col" className="px-3 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider min-w-[250px]">Summary</th>
                                <th scope="col" className="px-3 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider whitespace-nowrap">Upload Date</th>
                                <th scope="col" className="py-4 pl-3 pr-6 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider whitespace-nowrap">Links</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50 bg-transparent">
                            {results.map((story) => (
                                <tr key={story.ESS_CODE} className="hover:bg-slate-800/30 transition-colors duration-200 group">
                                    <td className="whitespace-nowrap py-5 pl-6 pr-3">
                                        <div className="flex items-center">
                                            <span className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 shadow-sm">
                                                {story.ESS_CODE}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-3 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-slate-200 line-clamp-2" title={story.Segment_Name}>
                                                {story.Segment_Name || "—"}
                                            </span>
                                            <span className="text-xs text-slate-400 flex items-center">
                                                By {story.Produced_By || "Unknown"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-3 py-5">
                                        <div className="flex flex-col gap-2 items-start">
                                            {story.Ministry_Category && (
                                                <span className="inline-flex items-center text-[10px] font-medium text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 mb-0.5 whitespace-nowrap" title={story.Ministry_Category}>
                                                    {story.Ministry_Category}
                                                </span>
                                            )}
                                            {story.Segment_Language && (
                                                <span className="inline-flex items-center text-[10px] font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 mb-0.5 whitespace-nowrap" title={`Language: ${story.Segment_Language}`}>
                                                    {story.Segment_Language}
                                                </span>
                                            )}
                                            <span className="text-sm text-slate-400 line-clamp-1" title={story.Story_Theme}>
                                                {story.Story_Theme || "—"}
                                            </span>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium border shadow-sm backdrop-blur-sm
                                                ${story.Approval_Status?.includes("Approved")
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                    : story.Approval_Status?.includes("Pending")
                                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                        : "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>
                                                {story.Approval_Status || "—"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-3 py-5">
                                        <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                                            {story.Story_Synopsis || <span className="text-slate-500 italic">No synopsis available</span>}
                                        </div>
                                    </td>

                                    <td className="px-3 py-5">
                                        <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                                            {story.Story_Summary || <span className="text-slate-500 italic">No summary available</span>}
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-5">
                                        <span className="text-sm text-slate-400 font-medium">
                                            {story.Upload_Date ? new Date(story.Upload_Date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "—"}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap py-5 pl-3 pr-6 text-right">
                                        {story.Youtube_Link ? (
                                            <a
                                                href={story.Youtube_Link.startsWith('http') ? story.Youtube_Link : `https://${story.Youtube_Link}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 border border-red-500/20 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 group-hover:-translate-y-0.5"
                                                title="Watch on YouTube"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <span className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed" title="No link provided">
                                                <ExternalLink className="w-4 h-4 opacity-50" />
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
