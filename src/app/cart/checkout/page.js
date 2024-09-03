"use client"
import { useState, useEffect } from 'react';
import { getCartItems } from '../../data';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    alert('Order placed successfully!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="space-y-4 mb-6">
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
          <div className="mb-6 border-t pt-4">
            <h2 className="text-xl font-bold">Grand Total: ${total.toFixed(2)}</h2>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold mb-4">Billing Information</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-semibold mb-2">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Place Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
