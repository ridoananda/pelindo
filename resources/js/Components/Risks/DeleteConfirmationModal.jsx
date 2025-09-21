import { useState } from 'react';
import Button from '@/Components/Button';

/**
 * Modal konfirmasi untuk menghapus data
 * @param {Object} props - Props komponen
 * @param {boolean} props.isOpen - Status modal terbuka/tutup
 * @param {Function} props.onClose - Callback untuk menutup modal
 * @param {Function} props.onConfirm - Callback untuk konfirmasi hapus
 * @param {string} props.title - Judul modal
 * @param {string} props.message - Pesan konfirmasi
 * @param {string} props.itemName - Nama item yang akan dihapus
 * @param {boolean} props.isDeleting - Status sedang menghapus
 */
export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isDeleting = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {message}
            </p>
            {itemName && (
              <p className="text-sm font-medium text-gray-900 bg-gray-100 p-3 rounded-md">
                "{itemName}"
              </p>
            )}
            <p className="text-xs text-red-600 mt-2">
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Menghapus...' : 'Hapus'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
