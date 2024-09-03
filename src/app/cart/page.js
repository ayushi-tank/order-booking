"use client"
import { useEffect, useState } from 'react';
import { getCartItems } from '../data';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        setCartItems(data);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="border p-4 flex justify-between items-center bg-white shadow rounded">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${item.price.toFixed(2)} x {item.quantity}</p>
                  <p className="text-md font-semibold mt-1">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">Grand Total: ${total.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
