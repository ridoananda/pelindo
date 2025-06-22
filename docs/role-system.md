# Sistem Role Management - Web Pelabuhan

## Overview
Sistem role management telah berhasil diimplementasikan pada aplikasi Web Pelabuhan sesuai dengan use case diagram yang diberikan. Sistem ini membedakan akses antara **Operator** dan **Manager**.

## Role yang Tersedia

### 1. Operator
**Akses Lengkap ke seluruh sistem:**
- ✅ Dashboard
- ✅ Data Kapal (kelola data kapal)
- ✅ Bongkar Muat (kelola aktivitas cargo)
- ✅ Data Logistik (kelola data logistik)
- ✅ Analisis Risiko (kelola dan mitigasi risiko)
- ✅ Produksi (kelola data produksi)
- ✅ Generate Laporan (semua jenis laporan)

### 2. Manager
**Akses Terbatas:**
- ✅ Dashboard
- ✅ Analisis Risiko (view dan analisis)
- ✅ Generate Laporan (view laporan)
- ❌ Data Kapal (tidak ada akses)
- ❌ Bongkar Muat (tidak ada akses)
- ❌ Data Logistik (tidak ada akses)
- ❌ Produksi (tidak ada akses)

## User Accounts yang Tersedia

Setelah menjalankan seeder, tersedia 3 user default:

1. **Admin Operator**
   - Email: `admin@pelabuhan.com`
   - Password: `password`
   - Role: `operator`

2. **Staff Operator**
   - Email: `operator@pelabuhan.com`
   - Password: `password`
   - Role: `operator`

3. **Manager Pelabuhan**
   - Email: `manager@pelabuhan.com`
   - Password: `password`
   - Role: `manager`

## Fitur yang Diimplementasikan

### 1. Database Schema
- Ditambahkan field `role` pada tabel `users` dengan enum ('operator', 'manager')
- Default role adalah 'operator'

### 2. Middleware Protection
- Dibuat `RoleMiddleware` untuk mengontrol akses berdasarkan role
- Routes dikelompokkan berdasarkan akses role

### 3. Dynamic Navigation
- Sidebar navigation berubah berdasarkan role user
- Operator melihat semua menu
- Manager hanya melihat menu yang diizinkan

### 4. UI Improvements
- Tampilan role user di sidebar dan header
- Role selection saat registrasi
- Informasi role yang jelas di interface

### 5. Route Protection
Routes diproteksi berdasarkan role:

```php
// Akses untuk operator dan manager
Route::middleware(['auth', 'role:operator,manager'])->group(function () {
    Route::get('/', [DashboardController::class, 'index']);
    Route::get('/risks', [RiskController::class, 'index']);
    Route::get('/reports', [ReportController::class, 'index']);
});

// Akses khusus operator
Route::middleware(['auth', 'role:operator'])->group(function () {
    Route::get('/ships', [ShipController::class, 'index']);
    Route::get('/logistics', [LogisticController::class, 'index']);
    Route::get('/cargo-activities', [CargoActivityController::class, 'index']);
    Route::get('/productions', [ProductionController::class, 'index']);
});
```

## Cara Menggunakan

### 1. Login sebagai Manager
- Gunakan email: `manager@pelabuhan.com`
- Password: `password`
- Akan melihat menu terbatas: Dashboard, Analisis Risiko, Generate Laporan

### 2. Login sebagai Operator
- Gunakan email: `admin@pelabuhan.com` atau `operator@pelabuhan.com`
- Password: `password`
- Akan melihat semua menu lengkap

### 3. Registrasi User Baru
- Pada halaman registrasi, pilih role yang diinginkan
- Sistem akan mengatur akses sesuai role yang dipilih

## Keamanan

- Middleware memblokir akses ke route yang tidak diizinkan
- Jika user mencoba mengakses route yang tidak diizinkan, akan mendapat error 403
- Navigation menu otomatis menyembunyikan item yang tidak bisa diakses

## Testing

Untuk menguji sistem:

1. **Test Manager Access:**
   - Login sebagai manager
   - Coba akses `/ships` - akan mendapat error 403
   - Coba akses `/risks` - berhasil

2. **Test Operator Access:**
   - Login sebagai operator
   - Semua route dapat diakses

3. **Test Navigation:**
   - Perhatikan perbedaan menu di sidebar antara manager dan operator

## File yang Dimodifikasi

1. **Migration:** `database/migrations/2025_06_22_132001_add_role_to_users_table.php`
2. **Model:** `app/Models/User.php`
3. **Middleware:** `app/Http/Middleware/RoleMiddleware.php`
4. **Routes:** `routes/web.php`
5. **Seeder:** `database/seeders/UserSeeder.php`
6. **Frontend:** `resources/js/Layouts/MainLayout.jsx`
7. **Registration:** 
   - `app/Http/Controllers/Auth/RegisteredUserController.php`
   - `resources/js/Pages/Auth/Register.jsx`
8. **Middleware Handler:** `app/Http/Middleware/HandleInertiaRequests.php`
9. **Bootstrap:** `bootstrap/app.php`

## Kesimpulan

Sistem role management telah berhasil diimplementasikan sesuai dengan use case diagram. Manager memiliki akses terbatas hanya ke analisis risiko dan generate laporan, sedangkan operator memiliki akses penuh ke seluruh sistem. Tampilan UI tidak rusak dan hanya menambah fungsionalitas role management yang diperlukan. 
