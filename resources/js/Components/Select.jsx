import { forwardRef } from 'react';

/**
 * Komponen Select untuk form
 * @param {Object} props - Props komponen
 * @param {string} props.label - Label untuk select
 * @param {string} props.name - Nama select
 * @param {string} props.value - Nilai select
 * @param {Function} props.onChange - Handler perubahan nilai
 * @param {Array} props.options - Array opsi {value, label}
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Pesan error
 * @param {boolean} props.required - Apakah select wajib diisi
 * @param {boolean} props.disabled - Apakah select disabled
 * @param {string} props.className - Class tambahan
 */
const Select = forwardRef(({
  label,
  name,
  value,
  onChange,
  options = [],
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
      <select
        ref={ref}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
