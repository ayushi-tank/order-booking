// app/data.js
let cartItems = [];

export async function getMenuItems() {
  return [
    { id: 1, name: 'Pizza', description: 'Delicious cheese pizza', price: 9.99, imageUrl: 'pizza.jpg' },
    { id: 2, name: 'Burger', description: 'Juicy beef burger', price: 12.99, imageUrl: 'https://unsplash.com/photos/a-cheeseburger-with-mushrooms-on-a-wooden-plate-14L8fUX0GY4' },
    { id: 3, name: 'Pasta', description: 'Creamy Alfredo pasta', price: 14.99, imageUrl: 'https://unsplash.com/photos/three-round-white-plates-with-pasta-near-two-glass-cuups--F_5g8EEHYE' },
  ];
}

export async function getCartItems() {
  const menuItems = await getMenuItems();
  return cartItems.map(item => {
    const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
    return menuItem ? { ...menuItem, quantity: item.quantity } : null;
  }).filter(item => item !== null);
}

export function addToCart(itemId) {
  const existingItem = cartItems.find(item => item.id === itemId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id: itemId, quantity: 1 });
  }
}
