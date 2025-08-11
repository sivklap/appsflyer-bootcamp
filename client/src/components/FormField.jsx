//############################
export default function FormField({ field, value, onChange }) {
  if (field.type === 'textarea') {
    return (
      <div>
        <label>{field.label}</label>
        <textarea
          name={field.name}
          value={value}
          onChange={onChange}
          required={field.required}
        />
      </div>
    );
  }

  if (field.type === 'multiselect') {
    return (
      <div>
        <label>{field.label}</label>
        {field.options.map((option) => (
          <div key={option}>
            <input
              type="checkbox"
              value={option}
              checked={value.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange({
                    target: { name: field.name, value: [...value, option] }
                  });
                } else {
                  onChange({
                    target: { name: field.name, value: value.filter((v) => v !== option) }
                  });
                }
              }}
            />
            {option}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <label>{field.label}</label>
      <input
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
        required={field.required}
      />
    </div>
  );
}
