function Select({
  name,
  label,
  additonalCls,
  specialClass,
  required,
  options,
  additonalLabelCls,
  onChange,
  defaultText,
  value, 
}) {
  return (
    <div className={additonalCls}>
      <label className={`mb-2 text-secondary-700 ${additonalLabelCls}`} htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>

      <select
        id={name}
        onChange={onChange}
        className={`textField__input mb-4 ${specialClass}`}
        value={value}
      >
        <option value="" disabled>
          {defaultText}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
