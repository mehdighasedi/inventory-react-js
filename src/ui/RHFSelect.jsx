function RHFSelect({
  name,
  label,
  additonalCls,
  specialClass,
  required,
  options,
  register,
  additonalLabelCls,
  onChange,
}) {
  return (
    <div className={additonalCls}>
      <label className={`mb-2 text-secondary-700 ${additonalLabelCls}  `} htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      <select
        onChange={onChange}
        className={`textField__input mb-4 ${specialClass}`}
        {...register(name)}
        id={name}
      >
        <option value="">یک گزینه را انتخاب کنید</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RHFSelect;
