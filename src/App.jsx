// App.jsx
import React, { useState } from 'react';
import PurchaseSuccessAlert from './components/exito.jsx';

// Definición de datos de productos
const productsData = [
  { id: 1, name: 'Verde Flor', price: 45, image: 'public/images/yerba1.jpg', description: 'Yerba Mate Compuesta Verde Flor Hierbas 500 Gr' },
  { id: 2, name: 'Cbse', price: 20, image: 'public/images/yerba2.jpg', description: 'Yerba Mate Cbse Hierbas Serranas 1kg' },
  { id: 3, name: 'La Merced', price: 40, image: 'public/images/yerba3.jpg', description: 'Yerba Mate La Merced De Campo 500g.' },
  { id: 4, name: 'Taragui', price: 15, image: 'public/images/yerba4.jpg', description: 'Yerba Mate 4f Taragui 1 Kg' },
  { id: 5, name: 'Cruz de Malta', price: 25, image: 'public/images/yerba5.jpg', description: 'Yerba Mate Selección Especial Cruz De Malta 1 Kg' },
  { id: 6, name: 'Playadito', price: 35, image: 'public/images/yerba6.jpg', description: 'Yerba Mate Suave Playadito 1kg' },
];

// Número de productos a mostrar por página
const itemsPerPage = 3;

// Componente principal de la aplicación
const App = () => {
  // Estados para el carrito, precio total, página actual y éxito de compra
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPurchaseSuccess, setIsPurchaseSuccess] = useState(false);

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = productsData.slice(indexOfFirstItem, indexOfLastItem);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Actualiza la cantidad si el producto ya está en el carrito
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Agrega el producto al carrito con cantidad 1 si no está en el carrito
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Actualiza el precio total
    setTotalPrice(totalPrice + product.price);
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    const removedProduct = cart.find((product) => product.id === productId);
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    setTotalPrice(totalPrice - removedProduct.price * removedProduct.quantity);
  };

  // Función para cambiar la página actual
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Función para manejar la compra
  const handlePurchase = () => {
    // Verifica si el carrito está vacío antes de procesar la compra
    if (cart.length === 0) {
      alert('El carrito está vacío. Agregue productos antes de realizar la compra.');
      return;
    }

    // Simula el proceso de compra y muestra la alerta de éxito
    setIsPurchaseSuccess(true);
    setTimeout(() => {
      setIsPurchaseSuccess(false);
    }, 9000);
  };

  // Renderiza la interfaz de la aplicación
  return (
    <div className="container mx-auto p-4">
      {/* Encabezado de la aplicación */}
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">ShopCart</h1>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          // Tarjeta de producto
          <div key={product.id} className="bg-white p-6 rounded shadow-md transition transform hover:scale-105">
            <img src={product.image} alt={product.name} className="mb-4 rounded-md h-48 object-cover" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-800 font-semibold">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none transition"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(productsData.length / itemsPerPage) }, (_, index) => (
          // Botones de paginación
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Carrito de compras */}
      <div className="mt-12 bg-gray-100 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Carrito de Compras</h2>
        <ul>
          {cart.map((product) => (
            // Elementos del carrito
            <li key={product.id} className="mb-4 text-gray-800">
              {product.name} - ${product.price} x {product.quantity}{' '}
              <button
                onClick={() => removeFromCart(product.id)}
                className="ml-2 focus:outline-none text-red-500"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        {/* Total y botón de compra */}
        <p className="mt-4 text-xl font-semibold text-gray-800">Total: ${totalPrice}</p>
        <button
          onClick={handlePurchase}
          className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none transition"
        >
          Comprar
        </button>
      </div>

      {/* Alerta de éxito de compra */}
      {isPurchaseSuccess && <PurchaseSuccessAlert onClose={() => setIsPurchaseSuccess(false)} />}
    </div>
  );
};

// Exporta el componente principal
export default App;
