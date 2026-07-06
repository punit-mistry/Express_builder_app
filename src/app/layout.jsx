import './globals.css';

export const metadata = {
  title: 'Express Builder - Scaffold Express.js APIs Visually',
  description: 'Build production-ready Express.js APIs in minutes with authentication, databases, middleware, testing, and best practices through an interactive visual builder.',
  keywords: ['Express.js', 'Node.js', 'API Builder', 'Scaffolding', 'Backend Generator'],
  openGraph: {
    title: 'Express Builder - Scaffold Express.js APIs Visually',
    description: 'Build production-ready Express.js APIs in minutes with authentication, databases, middleware, testing, and best practices.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
