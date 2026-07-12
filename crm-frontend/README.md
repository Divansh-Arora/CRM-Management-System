# Divansh CRM — Frontend

A React + Vite + Tailwind CSS frontend for the `crm-backend` Spring Boot API. Covers auth, a
dashboard with charts, and full CRUD + search/pagination for customers, leads, tasks and employees.

## Stack

- React 19 + Vite
- Tailwind CSS
- React Router v7
- Axios (JWT auto-attached from `localStorage`)
- Recharts (dashboard charts)
- react-hot-toast (notifications)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`. In development, Vite proxies any request to
`/api/*` through to `http://localhost:8080` (see `vite.config.js`), so make sure the
Spring Boot backend is running on port 8080.

To build for production:

```bash
npm run build
npm run preview   # serve the production build locally
```

## Connecting to the backend

The frontend talks to these endpoints, matching `crm-backend` exactly:

- `POST /api/auth/register`, `POST /api/auth/login`
- `GET/POST/PUT/DELETE /api/customers`, `GET /api/customers/search?name&page&size&sortBy`
- `GET/POST/PUT/DELETE /api/leads`, `GET /api/leads/search?customerName&page&size&sortBy`, `POST /api/leads/{id}/convert`
- `GET/POST/PUT/DELETE /api/tasks`, `GET /api/tasks/search?title&page&size&sortBy`
- `GET/POST/PUT/DELETE /api/employees`, `GET /api/employees/search?name&page&size&sortBy`
- `GET /api/dashboard`

The API base URL is controlled by `VITE_API_BASE_URL` in `.env` (defaults to `/api`,
which relies on the dev proxy). For a production deployment where the frontend and backend
are on different origins, set `VITE_API_BASE_URL` to the full backend URL, e.g.
`https://api.yourdomain.com/api`.

### CORS

The uploaded backend does not currently define a CORS policy. If you deploy the frontend on a
different origin than the backend (i.e. you're not using the Vite dev proxy or a reverse proxy
that unifies both under one domain), add a CORS config to the Spring Boot app, for example:

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173", "https://your-frontend-domain.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*");
        }
    };
}
```

## Auth notes

- The backend's `/api/auth/login` and `/api/auth/register` responses only contain a JWT
  (`{ token }`), no user profile. The frontend decodes the token locally to read the `sub`
  (email) claim, and remembers the display name you typed at registration for the session.
- The token is stored in `localStorage` and attached as `Authorization: Bearer <token>` to
  every API request. A 401 response automatically logs the user out and redirects to `/login`.

## Project structure

```
src/
  api/            axios instance + one module per resource (auth, customers, leads, tasks, employees, dashboard)
  components/
    layout/       Sidebar, Topbar, AppLayout, AuthShell
    ui/           Button, Field, Modal, ConfirmDialog, DataTable, Pagination, StatusPill, Toolbar, Misc
    ProtectedRoute.jsx
  context/        AuthContext (login/register/logout, token persistence)
  hooks/          useDebounce
  pages/          Login, Register, Dashboard, NotFound
  pages/customers, pages/leads, pages/tasks, pages/employees   (list page + add/edit modal each)
```

## Design

Dark ink sidebar with a cobalt-blue primary accent, teal/amber/rose/violet status colors, Sora
for display type and Inter for UI text, with JetBrains Mono for dashboard numerics — a "control
room" feel appropriate for an operational CRM.
