import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '🌿 Plant Disease Detector',
  description: 'AI-powered plant health analysis using TensorFlow.js and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-gray-200`}
      >
        {/* Header */}
        <header className="w-full py-6 backdrop-blur-md bg-white/10 border-b border-white/20 text-center shadow-lg">
          <h1 className="text-3xl font-extrabold text-green-300 drop-shadow-md">
            🌱 Plant Disease Detector
          </h1>
          <p className="text-sm mt-1 text-gray-300 tracking-wide">
            Powered by TensorFlow.js & Next.js
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-4xl mx-auto px-4 py-10 w-full">
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-4 text-sm text-gray-400 backdrop-blur-md bg-white/5 border-t border-white/10">
          © {new Date().getFullYear()} Plant AI — All Rights Reserved
        </footer>
      </body>
    </html>
  );
}