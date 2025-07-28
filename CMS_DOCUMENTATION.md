# Restaurant CMS Documentation

## Overview

CMS (Content Management System) untuk restoran yang dibuat menggunakan React, TypeScript, dan shadcn/ui components. CMS ini menyediakan interface untuk mengelola produk, pesanan, dan pengguna.

## Features

### 1. Products Management

- **Create Product**: Menambah produk baru dengan upload gambar
- **Update Product**: Edit informasi produk termasuk status availability dan best seller
- **Delete Product**: Hapus produk dari sistem
- **Search Products**: Pencarian produk berdasarkan nama atau kode
- **View Products**: Tampilkan semua produk dalam bentuk tabel dengan informasi lengkap

**Fields:**

- Code: Kode unik produk (required)
- Name: Nama produk (required)
- Price: Harga dalam IDR (required)
- Image: Upload gambar produk (optional)
- Available: Status ketersediaan produk
- Best Seller: Status best seller

### 2. Orders Management

- **View Orders**: Tampilkan semua pesanan dengan detail lengkap
- **Order Details**: Lihat detail pesanan termasuk item yang dipesan
- **Delete Order**: Hapus pesanan (khusus admin)
- **Search Orders**: Pencarian berdasarkan tracking number, nama customer, atau nomor meja
- **Table Filter**: Filter pesanan berdasarkan nomor meja

**Order Information:**

- Tracking Number: Nomor unik untuk tracking pesanan
- Customer Name: Nama pemesan
- Table Number: Nomor meja
- Order Items: Daftar produk yang dipesan dengan quantity dan notes
- Total Amount: Total harga pesanan
- Created Date: Tanggal pemesanan

### 3. Users Management

- **Create User**: Tambah pengguna baru
- **Update User**: Edit informasi pengguna
- **Delete User**: Hapus pengguna dari sistem
- **Search Users**: Pencarian berdasarkan username atau email

**User Fields:**

- Username: Nama pengguna unik (required)
- Email: Alamat email (required)
- Password: Password untuk login (required untuk user baru)

## Component Structure

### Main Components

```
src/components/cms/
├── CMSDashboard.tsx          # Main dashboard dengan stats dan tabs
├── ProductsManagement.tsx    # Komponen untuk mengelola produk
├── ProductForm.tsx           # Form untuk create/edit produk
├── OrdersManagement.tsx      # Komponen untuk mengelola pesanan
├── UsersManagement.tsx       # Komponen untuk mengelola pengguna
├── UserForm.tsx              # Form untuk create/edit pengguna
└── index.ts                  # Export semua komponen
```

### Hooks

```
src/hooks/
├── useProducts.ts            # Hook untuk API calls produk
├── useOrders.ts              # Hook untuk API calls pesanan
└── useUsers.ts               # Hook untuk API calls pengguna
```

### Context

```
src/contexts/
└── CMSContext.tsx            # Context untuk state management tabs
```

### Types

```
src/types/
└── api.ts                    # Type definitions untuk API responses
```

## API Integration

### Authentication

Menggunakan JWT token yang disimpan di localStorage. Token diperlukan untuk:

- Mengakses data orders
- Mengakses data users
- Delete operations

### Endpoints Used

- `GET /api/products` - Ambil semua produk
- `POST /api/products` - Buat produk baru (dengan upload gambar)
- `PATCH /api/products/:id` - Update produk
- `DELETE /api/products/:id` - Hapus produk

- `GET /api/orders` - Ambil semua pesanan (perlu auth)
- `DELETE /api/orders/:id` - Hapus pesanan (perlu auth)

- `GET /api/users` - Ambil semua pengguna (perlu auth)
- `POST /api/users` - Buat pengguna baru
- `PATCH /api/users/:id` - Update pengguna (perlu auth)
- `DELETE /api/users/:id` - Hapus pengguna (perlu auth)

## Navigation

### Sidebar Navigation

CMS menggunakan sidebar navigation dengan struktur:

- **Products**
  - Manage Products (tab: products)
  - Categories (coming soon)
- **Orders**
  - All Orders (tab: orders)
  - Order Analytics (coming soon)
- **Users**
  - Manage Users (tab: users)
  - User Roles (coming soon)
- **Settings** (coming soon)

### Tab Management

Menggunakan React Context (`CMSContext`) untuk mengelola tab aktif dan sinkronisasi dengan sidebar navigation.

## Styling

- **Framework**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Layout**: Responsive design dengan sidebar collapsible

## File Upload

- **Products**: Support upload gambar untuk produk
- **Format**: Semua format gambar yang didukung browser
- **Storage**: File disimpan di server dengan nama unik
- **Display**: Gambar ditampilkan dalam tabel products

## Security

- **Authentication**: JWT token validation
- **Authorization**: Role-based access untuk operasi tertentu
- **Input Validation**: Client-side dan server-side validation
- **File Upload**: Validation untuk tipe dan ukuran file

## Getting Started

1. Pastikan API server berjalan di port 3000
2. Pastikan web app berjalan di port yang sesuai
3. Login sebagai admin untuk mengakses CMS
4. Navigate ke `/dashboard` untuk mengakses CMS

## Usage Examples

### Add New Product

1. Klik tab "Products" di sidebar
2. Klik tombol "Add Product"
3. Isi form dengan informasi produk
4. Upload gambar (optional)
5. Set status availability dan best seller
6. Klik "Save"

### View Order Details

1. Klik tab "Orders" di sidebar
2. Klik icon "Eye" pada baris pesanan yang ingin dilihat
3. Dialog akan menampilkan detail lengkap pesanan

### Manage Users

1. Klik tab "Users" di sidebar
2. Gunakan tombol "Add User" untuk menambah pengguna baru
3. Gunakan tombol "Edit" untuk mengubah informasi pengguna
4. Gunakan tombol "Delete" untuk menghapus pengguna

## Dashboard Stats

Dashboard menampilkan statistik real-time:

- Total Products (dengan jumlah yang available)
- Total Orders (semua pesanan)
- Total Users (pengguna terdaftar)
- Total Revenue (dari semua pesanan)
