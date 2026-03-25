# 👕 T-Shirt Shop API

Esta es una API REST desarrollada con **Node.js** y **Express** para la gestión de un catálogo de camisetas y el procesamiento de pedidos. El proyecto implementa una arquitectura de capas: **Ruta → Controlador → Servicio**.

## Características principales

* **Gestión de Catálogo**: Consulta de productos con filtros avanzados (talla, color, etiquetas, búsqueda de texto) y ordenación dinámica por precio y nombre.
* **Procesamiento de Comandas**: Sistema robusto de creación de pedidos que incluye:
    * Validación de datos de cliente (nombre y email con Regex).
    * Comprobación de existencia de productos y disponibilidad de tallas/colores.
    * Cálculo automático de subtotales por artículo y total de la orden.
* **Arquitectura Desacoplada**: Los servicios manejan la lógica de negocio pura, mientras que los controladores gestionan el protocolo HTTP.

## Instalación y Configuración

1.  **Clonar el proyecto** y situarse en la carpeta raíz.
2.  **Instalar las dependencias**:
    ```bash
    npm install
    ```
3.  **Iniciar el servidor**:
    ```bash
    node server.js
    ```
    *El servidor estará disponible en `http://localhost:3000`*.

## Endpoints de la API

### Camisetas (`/api/tshirts`)
* **GET `/`**: Lista todas las camisetas. Soporta filtros por query string:
    * `?size=M`
    * `?color=Blue`
    * `?sort=precio_asc` (opciones: `precio_asc`, `precio_desc`, `nombre_asc`, `nombre_desc`)
* **GET `/:id`**: Detalle de una camiseta específica por su ID.

### Pedidos (`/api/order`)
* **POST `/`**: Crea un nuevo pedido. Requiere un JSON con datos de cliente e items.
* **GET `/`**: Lista el histórico de todas las comandas realizadas.
* **GET `/:id`**: Recupera una comanda específica mediante su ID generado (`ORD-XXXX`).

## Ejemplo de Prueba (POST)

Para crear un pedido, utiliza **Thunder Client** enviando una petición `POST` a `http://localhost:3000/api/order` con el siguiente cuerpo:

```json
{
  "client": {
    "name": "Alex ITB",
    "email": "alex@itb.cat"
  },
  "address": "Calle Falsa 123, Barcelona",
  "items": [
    {
      "tshirtId": "00001",
      "size": "M",
      "color": "Red",
      "quantity": 2
    },
    {
      "tshirtId": "00003",
      "size": "L",
      "color": "Blue",
      "quantity": 1
    }
  ]
}
