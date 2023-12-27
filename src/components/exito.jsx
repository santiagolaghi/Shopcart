import React from 'react';

// Componente funcional para la alerta de éxito de compra
const PurchaseSuccessAlert = ({ onClose }) => {
  return (
    // Contenedor de la alerta con estilos de color verde
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      {/* Título en negrita de la alerta */}
      <strong className="font-bold">¡Compra exitosa!</strong>
      {/* Mensaje de éxito en línea para pantallas pequeñas */}
      <span className="block sm:inline"> Tu compra se ha realizado con éxito.</span>
      {/* Botón de cierre (icono 'x') en la esquina superior derecha */}
      <span
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        &times;
      </span>
    </div>
  );
};

// Exporta el componente para su uso en otros archivos
export default PurchaseSuccessAlert;
