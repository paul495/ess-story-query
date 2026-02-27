'use client';

import { useState } from 'react';
import { SearchForm } from '@/components/search-form';
import { ResultsTable } from '@/components/results-table';
import { Story } from './actions';

export default function Home() {
  const [results, setResults] = useState<Story[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 -left-1/4 w-[150%] h-[500px] bg-gradient-to-b from-indigo-900/40 via-purple-900/20 to-transparent blur-3xl -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
      <div className="absolute top-0 right-0 w-1/3 h-[400px] bg-fuchsia-900/20 blur-3xl -z-10 rounded-full" />
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-900/10 blur-[120px] -z-10 rounded-full mix-blend-screen" />

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ease-in-out">
        <div className={`text-center transition-all duration-700 ${hasSearched ? 'mb-8 scale-95 opacity-90' : 'mb-16'}`}>
          <div className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium tracking-wide shadow-sm shadow-indigo-500/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>Data Intelligence Hub</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-100 drop-shadow-sm mb-4">
            ESS Story Explorer
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400 sm:text-xl font-light leading-relaxed">
            Query, filter, and analyze production data with precision.
          </p>
        </div>

        <div className="transform transition-all duration-500 w-full max-w-5xl mx-auto">
          <SearchForm onResults={(res) => { setResults(res); setHasSearched(true); }} />
        </div>

        <div className={`transition-all duration-1000 ease-out ${hasSearched ? 'opacity-100 translate-y-0 mt-8' : 'opacity-0 translate-y-10 pointer-events-none absolute'}`}>
          <ResultsTable results={results} />
        </div>
      </div>
    </main>
  );
}
