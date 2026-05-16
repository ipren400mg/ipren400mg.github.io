export function TextField({
  id,
  label,
  error,
  className = '',
  decoratorClassName = '',
  inputClassName = '',
  ...props
}) {
  return (
    <div className={`text-field ${className}`.trim()}>
      <input className={inputClassName} id={id} placeholder=" " {...props} />
      <div className={`field-decorator ${decoratorClassName}`.trim()} data-error={error}>
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
        <span className="field-underline" />
      </div>
    </div>
  );
}

export function SelectField({
  children,
  className = '',
  decoratorClassName = '',
  id,
  label,
  prefix,
  ...props
}) {
  return (
    <div className={`select-field ${className} ${prefix ? 'has-prefix' : ''}`.trim()}>
      {label ? (
        <label className="select-field-label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      {prefix ? <span className="select-prefix">{prefix}</span> : null}
      <select id={id} {...props}>
        {children}
      </select>
      <div className={`select-decorator ${decoratorClassName}`.trim()}>
        <span className="field-underline" />
      </div>
    </div>
  );
}

export function CheckboxField({ checked, id, label, onChange }) {
  return (
    <label className="checkbox-field" htmlFor={id}>
      <span className="checkbox-box">
        <input checked={checked} id={id} onChange={onChange} type="checkbox" />
        <span className="checkbox-mark" />
      </span>
      <span>{label}</span>
    </label>
  );
}
