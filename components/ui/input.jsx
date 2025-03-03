export default function Input({ value, onChange, placeholder, className }) {
    return (
        <input
            value={value}
            onChange={onChange}
            type="text"
            placeholder={placeholder}
            className="w-full bg-black/5 max-w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
    )
}


