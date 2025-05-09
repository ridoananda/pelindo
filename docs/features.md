# Website PT. Pelabuhan Indonesia (persero) cabang sibolga

## Tech Stack
- Laravel 12
- Inertia JS 2
- React JS
- Headless UI
- Tailwind CSS

## 1. **Dashboard Utama**

**Fungsi:**

* Menampilkan **ringkasan data utama** secara cepat.
* Komponen yang bisa ditampilkan:

  * Jumlah kapal
  * Jumlah logistik
  * Jumlah aktivitas bongkar muat
  * Status risiko atau notifikasi

**Fitur Tambahan:**

* Akses cepat ke modul lainnya melalui navigasi.
* Tampilan visual menarik seperti **card info** dan **grafik ringkasan**.

---

## 2. **Data Kapal**

**Fungsi:**

* Menyimpan dan menampilkan daftar kapal yang terdaftar.
* Terdapat informasi seperti:

  * Nama Kapal
  * Kapasitas
  * Asal dan Tujuan
  * Status aktif/tidak aktif

**Fitur Tambahan:**

* Tombol tambah/edit/hapus data kapal.
* Pencarian/filtering kapal berdasarkan kriteria tertentu.

---

## 3. **Data Logistik**

**Fungsi:**

* Menyimpan dan mengelola data barang/logistik yang diangkut kapal.

**Fitur Tambahan:**

* Kolom: nama barang, jumlah, jenis, berat, asal, tujuan, tanggal pengiriman.
* Opsi ekspor data (kemungkinan ke Excel atau PDF).
* Fungsi CRUD (Create, Read, Update, Delete).

---

## 4. **Bongkar Muat**

**Fungsi:**

* Mengelola aktivitas **bongkar muat barang** di pelabuhan.

**Fitur Tambahan:**

* Data terkait tanggal, waktu, kapal yang terlibat, jenis barang, jumlah, status.
* Validasi status apakah proses sudah selesai atau masih berlangsung.
* Integrasi dengan data kapal dan logistik.

---

## 5. **Analisis Risiko**

**Fungsi:**

* Menampilkan potensi risiko operasional (misalnya keterlambatan, cuaca, kerusakan).

**Fitur Tambahan:**

* Klasifikasi risiko berdasarkan tingkat: rendah, sedang, tinggi.
* Penilaian risiko berdasarkan faktor penyebab.

---

## 6. **Mitigasi Risiko**

**Fungsi:**

* Menyediakan solusi atau strategi untuk **mengurangi risiko** yang telah diidentifikasi.

**Fitur Tambahan:**

* Kolom tindakan mitigasi dan penanggung jawab.
* Prioritas tindakan mitigasi.

---

## 7. **Generate Laporan**

**Fungsi:**

* Menghasilkan laporan dari seluruh data (kapal, logistik, bongkar muat, risiko).
* Bisa digunakan untuk laporan bulanan, tahunan, atau sesuai filter tanggal.

**Fitur Tambahan:**

* Pilihan ekspor PDF atau cetak langsung.
* Filter berdasarkan jenis laporan atau periode waktu.
* Terdapat tombol aksi seperti “Generate” dan opsi tampilan laporan sebelum unduh/cetak.

---

## 🔄 Hubungan Antar-Fitur

* Semua fitur saling terhubung:

  * **Data Kapal** berhubungan dengan **Bongkar Muat** dan **Logistik**
  * **Bongkar Muat** dan **Logistik** akan memengaruhi data di **Analisis Risiko**
  * Semua data bisa diolah dalam **Generate Laporan**

---
