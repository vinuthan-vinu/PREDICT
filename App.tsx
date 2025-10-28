
import React, { useState, useCallback } from 'react';
import { AssociationRule } from './types';
import { analyzeTransactions } from './services/geminiService';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { Controls } from './components/Controls';
import { ResultsDisplay } from './components/ResultsDisplay';

const App: React.FC = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [rules, setRules] = useState<AssociationRule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [minSupport, setMinSupport] = useState<number>(0.02);
  const [minConfidence, setMinConfidence] = useState<number>(0.2);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFileContent(text);
        setFileName(file.name);
        setRules([]);
        setError(null);
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
        setFileContent(null);
        setFileName(null);
      }
      reader.readAsText(file);
    }
  };
  
  const handleAnalyze = useCallback(async () => {
    if (!fileContent) {
      setError('Please upload a file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRules([]);

    try {
      const result = await analyzeTransactions(fileContent, minSupport, minConfidence);
      setRules(result);
    } catch (err) {
      setError(err instanceof Error ? `Analysis failed: ${err.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [fileContent, minSupport, minConfidence]);

  return (
    <div className="min-h-screen font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <Header />

        <main className="mt-8 bg-white/60 rounded-2xl shadow-2xl shadow-sky-900/10 ring-1 ring-black/5 backdrop-blur-md">
          <div className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1 space-y-6">
                 <FileUpload fileName={fileName} onFileChange={handleFileChange} />
                 <Controls
                   minSupport={minSupport}
                   setMinSupport={setMinSupport}
                   minConfidence={minConfidence}
                   setMinConfidence={setMinConfidence}
                 />
              </div>
              <div className="lg:col-span-2">
                 <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !fileContent}
                    className="w-full flex items-center justify-center gap-3 text-lg font-bold bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:from-teal-400 hover:to-blue-500 disabled:bg-slate-400 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                  >
                   {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing Data...
                      </>
                    ) : (
                      'Discover Associations'
                    )}
                 </button>
              </div>
            </div>

            {error && (
              <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 border-t border-slate-300/70">
            <ResultsDisplay isLoading={isLoading} rules={rules} />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-slate-600 text-sm">
            <p>Powered by Google Gemini. Built for retail insights.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
