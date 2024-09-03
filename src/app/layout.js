// app/layout.js
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white p-4">
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/cart">Cart</Link></li>
            </ul>
          </nav>
        </header>
        <main className="flex p-4">{children}</main>
      </body>
    </html>
  );
}
