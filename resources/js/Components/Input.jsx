import { forwardRef } from 'react';

/**
 * Komponen Input untuk form
 * @param {Object} props - Props komponen
 * @param {string} props.label - Label untuk input
 * @param {string} props.name - Nama input
 * @param {string} props.type - Tipe input (text, email, password, dll)
 * @param {string} props.value - Nilai input
 * @param {Function} props.onChange - Handler perubahan nilai
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Pesan error
 * @param {boolean} props.required - Apakah input wajib diisi
 * @param {boolean} props.disabled - Apakah input disabled
 * @param {string} props.className - Class tambahan
 */
const Input = forwardRef(({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
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
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
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

Input.displayName = 'Input';

export default Input;
