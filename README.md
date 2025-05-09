# PT. Pelabuhan Indonesia (Persero) Cabang Sibolga

## About

Web application for PT. Pelabuhan Indonesia (Persero) Cabang Sibolga for managing port operations including ships, logistics, cargo loading/unloading, and risk analysis.

## Tech Stack

- Laravel 12
- Inertia JS 2
- React JS
- Headless UI
- Tailwind CSS

## Features

- **Dashboard**: Overview of key metrics and company information
- **Data Kapal**: Ship management (add, edit, delete ships)
- **Bongkar Muat**: Cargo loading/unloading activities management
- **Data Logistik**: Logistics and inventory management
- **Analisis Risiko**: Risk analysis and mitigation tools
- **Produksi**: Production management and tracking
- **Generate Laporan**: Report generation with PDF/Excel export options

## Installation

### Prerequisites

- PHP 8.1+
- Composer
- Node.js & NPM
- MySQL or PostgreSQL

### Setup

1. Clone the repository
   ```
   git clone https://github.com/yourusername/web-pelabuhan.git
   cd web-pelabuhan
   ```

2. Install PHP dependencies
   ```
   composer install
   ```

3. Install JavaScript dependencies
   ```
   npm install
   ```

4. Copy the environment file and configure your database
   ```
   cp .env.example .env
   ```

5. Generate application key
   ```
   php artisan key:generate
   ```

6. Run migrations and seed the database
   ```
   php artisan migrate --seed
   ```

7. Build frontend assets
   ```
   npm run build
   ```

8. Start the development server
   ```
   php artisan serve
   ```

9. Visit `http://localhost:8000` in your browser

## Default Users

After running the seeders, you can log in with the following credentials:

- **Admin**: admin@pelabuhan.com / password
- **Operator**: operator@pelabuhan.com / password

## Development

- Run frontend in development mode: `npm run dev`
- Watch for changes: `npm run watch`

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Submit a pull request

## License

This project is proprietary and confidential.
