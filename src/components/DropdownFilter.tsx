interface IDropdownFilter {
  label: string;
  data: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function DropdownFilter({
  label,
  data,
  handleChange,
}: IDropdownFilter) {
  return (
    <label className="form-control w-full max-w-sm">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>

      <select
        required
        className="select select-bordered w-full"
        onChange={handleChange}
        defaultValue={data[0]}
      >
        {data.map((item, index) => (
          <option disabled={index === 0} key={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
