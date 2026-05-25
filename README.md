# TechStore - Documentación del Proyecto

## Descripción General

TechStore es un sistema de gestión de tienda tecnológica compuesto por un backend en Spring Boot y un frontend en React. La base de datos es PostgreSQL gestionada con Docker y versionada con Liquibase.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Backend | Spring Boot 3.5.0 / Java 17 |
| Frontend | React + Vite |
| Base de Datos | PostgreSQL (Docker) |
| ORM | Hibernate / Spring Data JPA |
| Migraciones | Liquibase |
| Build Tool | Gradle (Kotlin DSL) |
| Estilos Frontend | Bootstrap + CSS personalizado |

---

## Estructura del Backend

```
com.techstore.backend
├── config/
│   └── CorsConfig.java
├── controller/
│   ├── CategoryController.java
│   ├── ClientController.java
│   ├── CouponController.java
│   ├── InventoryController.java
│   ├── OrderController.java
│   ├── PaymentController.java
│   ├── ProductController.java
│   └── ShippingController.java
├── dto/
│   ├── CategoryDTO.java
│   ├── ClientDTO.java
│   ├── CouponDTO.java
│   ├── InventoryDTO.java
│   ├── OrderDTO.java
│   ├── PaymentDTO.java
│   ├── ProductDTO.java
│   └── ShippingDTO.java
├── entity/
│   ├── Category.java
│   ├── Client.java
│   ├── Coupon.java
│   ├── Inventory.java
│   ├── Order.java
│   ├── Payment.java
│   ├── Product.java
│   └── Shipping.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   └── ResourceNotFoundException.java
├── repository/
│   ├── CategoryRepository.java
│   ├── ClientRepository.java
│   ├── CouponRepository.java
│   ├── InventoryRepository.java
│   ├── OrderRepository.java
│   ├── PaymentRepository.java
│   ├── ProductRepository.java
│   └── ShippingRepository.java
├── service/
│   ├── CategoryService.java
│   ├── ClientService.java
│   ├── CouponService.java
│   ├── InventoryService.java
│   ├── OrderService.java
│   ├── PaymentService.java
│   ├── ProductService.java
│   └── ShippingService.java
└── TechstoreApplication.java
```

---

## Estructura del Frontend

```
techstore-frontend/
├── src/
│   ├── api/
│   │   └── axiosConfig.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Clients.jsx
│   │   ├── Coupons.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Inventory.jsx
│   │   ├── Login.jsx
│   │   ├── Orders.jsx
│   │   ├── Payments.jsx
│   │   ├── Products.jsx
│   │   └── Shipping.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   ├── categoryService.js
│   │   ├── clientService.js
│   │   ├── couponService.js
│   │   ├── inventoryService.js
│   │   ├── orderService.js
│   │   ├── paymentService.js
│   │   ├── productService.js
│   │   └── shippingService.js
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
```

---

## Base de Datos

- **Motor:** PostgreSQL
- **Esquema:** `techstore`
- **Migraciones:** Liquibase
- **Total de tablas:** 54

### Tablas principales mapeadas

| Entidad Java | Tabla PostgreSQL | PK |
|---|---|---|
| Product | product | id_product |
| Category | category | id_category |
| Client | client | id_client |
| Order | order_table | id_order |
| Payment | payment_transaction | id_transaction |
| Inventory | stock | id_stock |
| Shipping | shipping | id_shipping |
| Coupon | coupon | id_coupon |

### ENUMs de PostgreSQL

| ENUM | Valores |
|---|---|
| product_status | Active, Inactive, Discontinued |
| user_status | Active, Inactive, Blocked |
| order_status | Pending, Confirmed, Preparing, Shipped, Delivered, Cancelled |
| payment_status | Pending, Processed, Approved, Rejected, Cancelled, Refunded |
| shipping_status | Pending, In Transit, Delivered, Not Delivered, Returned |
| document_type | CC, TI, PP, CE, NIT |
| client_type | Natural, Corporate |

---

## Configuración

### application.yml

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/techstore
    username: postgres
    password: Postgres2026*
  jpa:
    hibernate:
      ddl-auto: none
    show-sql: true
    properties:
      hibernate:
        format_sql: true
liquibase:
  change-log: classpath:db/changelog/db.changelog-master.yaml
server:
  port: 8080
```

### axiosConfig.js (Frontend)

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

## API Endpoints

### Products `/api/products`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/products | Listar todos |
| GET | /api/products/{id} | Obtener por ID |
| POST | /api/products | Crear producto |
| PUT | /api/products/{id} | Actualizar producto |
| DELETE | /api/products/{id} | Eliminar producto |

### Categories `/api/categories`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/categories | Listar todas |
| POST | /api/categories | Crear categoría |
| DELETE | /api/categories/{id} | Eliminar categoría |

### Clients `/api/clients`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/clients | Listar todos |
| GET | /api/clients/{id} | Obtener por ID |
| POST | /api/clients | Crear cliente |
| PUT | /api/clients/{id} | Actualizar cliente |
| DELETE | /api/clients/{id} | Eliminar cliente |

### Orders `/api/orders`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/orders | Listar todas |
| GET | /api/orders/{id} | Obtener por ID |
| POST | /api/orders | Crear orden |
| DELETE | /api/orders/{id} | Eliminar orden |

### Payments `/api/payments`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/payments | Listar todos |
| GET | /api/payments/{id} | Obtener por ID |
| POST | /api/payments | Crear pago |
| DELETE | /api/payments/{id} | Eliminar pago |

### Inventory `/api/inventory`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/inventory | Listar todo |
| GET | /api/inventory/{id} | Obtener por ID |
| POST | /api/inventory | Crear registro |
| PUT | /api/inventory/{id} | Actualizar registro |
| DELETE | /api/inventory/{id} | Eliminar registro |

### Shipping `/api/shipping`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/shipping | Listar todos |
| GET | /api/shipping/{id} | Obtener por ID |
| POST | /api/shipping | Crear envío |
| DELETE | /api/shipping/{id} | Eliminar envío |

### Coupons `/api/coupons`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/coupons | Listar todos |
| POST | /api/coupons | Crear cupón |
| DELETE | /api/coupons/{id} | Eliminar cupón |

---

## Rutas del Frontend

| Ruta | Página | Descripción |
|---|---|---|
| / | Login.jsx | Pantalla de inicio de sesión |
| /dashboard | Dashboard.jsx | Resumen general con estadísticas |
| /products | Products.jsx | CRUD de productos |
| /orders | Orders.jsx | CRUD de órdenes |
| /clients | Clients.jsx | CRUD de clientes |
| /inventory | Inventory.jsx | CRUD de inventario |
| /payments | Payments.jsx | CRUD de pagos |
| /shipping | Shipping.jsx | CRUD de envíos |
| /coupons | Coupons.jsx | CRUD de cupones |

---

## Componentes Principales

### Navbar
- Barra superior oscura con nombre del sistema
- Color: `#16213e`

### Sidebar
- Navegación lateral con iconos y links activos resaltados
- Color base: `#1a1a2e`
- Link activo: `#0f3460`
- Links: Dashboard, Products, Orders, Clients, Inventory, Payments, Shipping, Coupons

### MainLayout
- Wrapper que combina Navbar + Sidebar + contenido
- El contenido se renderiza como `children`

---

## Flujo de la Aplicación

```
React (localhost:5173)
        ↓ HTTP (Axios)
Spring Boot (localhost:8080)
        ↓ JPA / Hibernate
PostgreSQL (Docker - localhost:5432)
```

---

## Orden de Inicio

1. Levantar Docker (PostgreSQL)
2. Correr el backend Spring Boot
3. Correr el frontend con `npm run dev`

---
