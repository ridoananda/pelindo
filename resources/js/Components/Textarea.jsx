import { forwardRef } from 'react';

/**
 * Komponen Textarea untuk form
 * @param {Object} props - Props komponen
 * @param {string} props.label - Label untuk textarea
 * @param {string} props.name - Nama textarea
 * @param {string} props.value - Nilai textarea
 * @param {Function} props.onChange - Handler perubahan nilai
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Pesan error
 * @param {boolean} props.required - Apakah textarea wajib diisi
 * @param {boolean} props.disabled - Apakah textarea disabled
 * @param {number} props.rows - Jumlah baris
 * @param {string} props.className - Class tambahan
 */
const Textarea = forwardRef(({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 3,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical
          ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
