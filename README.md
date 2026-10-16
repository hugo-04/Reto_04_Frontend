# Customers Frontend

Aplicación web para gestionar clientes y consultar indicadores de natalidad. Consume el API REST del repositorio
[Reto-04-Backend](https://github.com/hugo-04/Reto-04-Backend).

## Funcionalidades

- **Clientes**: listado en tabla con filtro de búsqueda por DNI y/o email.
- **Nuevo cliente**: formulario con validaciones y mensajes de error del servidor.
- **Indicadores**: total de clientes, mes/año con más y menos nacimientos, gráfico de barras y tabla con la tasa de natalidad.

## Tecnologías

| Componente | Versión |
|---|---|
| React | 19 |
| TypeScript | 7 |
| Vite | 8 |
| Tailwind CSS | 4 |
| Recharts | 3 |
| Pruebas | Vitest + Testing Library |

## Estructura

```
.
├── index.html
├── vite.config.ts
├── .env.example
└── src/
    ├── api/                    # Cliente HTTP y llamadas al backend
    ├── config/                 # Variables de entorno
    ├── types/                  # Tipos del dominio y de la API
    ├── utils/                  # Utilidades compartidas (fechas, clases)
    ├── components/
    │   ├── layout/             # Encabezado y navegación
    │   └── ui/                 # Componentes reutilizables (Button, Input, Alert, Card)
    ├── features/
    │   ├── customers/          # Tabla, búsqueda, formulario, hooks y validaciones
    │   └── indicators/         # Resumen, gráfico, tabla y hook de indicadores
    ├── pages/                  # Páginas que componen cada vista
    ├── App.tsx
    └── main.tsx
```

## Requisitos previos

- Node.js 20.19+ (recomendado 22)
- npm 10+
- Backend [Reto-04-Backend](https://github.com/hugo-04/Reto-04-Backend) en ejecución (por defecto en `http://localhost:8080`)

## Instalación y ejecución

### 1. Levantar el backend

Seguir las instrucciones del README del backend (`docker compose up -d` y `mvn spring-boot:run`).
El backend permite por defecto peticiones CORS desde `http://localhost:5173`, que es el puerto del frontend.

### 2. Configurar variables de entorno

```bash
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env
```

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `VITE_API_URL` | URL base del backend | `http://localhost:8080` |

Si no se crea el `.env`, se usa el valor por defecto.

### 3. Instalar dependencias y ejecutar

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

### 4. Build de producción

```bash
npm run build
npm run preview
```

## Validaciones

Se validan en el navegador antes de llamar al backend, con las mismas reglas del API.

| Campo | Creación | Filtro de búsqueda |
|---|---|---|
| DNI | Obligatorio, exactamente 8 dígitos | Opcional; si se informa, exactamente 8 dígitos |
| Email | Obligatorio, formato válido, máximo 150 caracteres | Opcional; si se informa, formato válido |
| Nombre / Apellido | Obligatorios, solo letras, máximo 100 caracteres | — |
| Fecha de nacimiento | Obligatoria y anterior a hoy | — |

El campo DNI solo acepta dígitos al escribir. El email se envía sin espacios y en minúsculas.

## Pruebas unitarias

```bash
npm test
```

| Archivo | Qué valida |
|---|---|
| `features/customers/utils/validation.test.ts` | Reglas de validación de creación y filtro (obligatorios, DNI, email, nombres, fecha) |
| `features/customers/components/CustomerSearch.test.tsx` | Filtro: DNI solo dígitos, errores de DNI/email, búsqueda y limpieza |
| `api/customersApi.test.ts` | Construcción de la URL de búsqueda y manejo de errores del backend |
| `features/customers/components/CustomerForm.test.tsx` | Formulario: errores de validación, envío exitoso y error del servidor |

## Comunicación con el backend

| Vista | Endpoint |
|---|---|
| Clientes | `GET /api/customers` · `GET /api/customers?dni=...&email=...` |
| Nuevo cliente | `POST /api/customers` |
| Indicadores | `GET /api/customers/indicators` |

Los errores del backend (`400`, `409`, `500`) se muestran con el mensaje y los detalles que devuelve el API.
Si el backend no está disponible, se muestra un mensaje indicando que no se pudo conectar con el servidor.
