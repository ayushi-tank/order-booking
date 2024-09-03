import Link from "next/link";

export default function CartLayout({ children }) {
    return (
      <div className="flex">
        <aside className="w-64 p-4 bg-gray-100 border-r border-gray-300">
          <h2 className="text-xl font-bold">Cart Actions</h2>
          <ul className="mt-4">
            <li><Link href='/cart/view-summary' className="block p-2 text-blue-500 hover:underline">View Order Summary</Link></li>
            <li><Link href="/cart/checkout" className="block p-2 text-blue-500 hover:underline">Checkout</Link></li>
          </ul>
        </aside>
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    );
  }
  