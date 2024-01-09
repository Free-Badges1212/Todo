interface ButtonProps {
  type: "red" | "green";
  title: string;
}

export const Button = ({ title, type }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`flex items-center gap-2 px-4 py-2 text-white disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 ${
        type == "green"
          ? "bg-green-600 hover:bg-green-800 rounded-md"
          : "bg-rose-900 hover:bg-rose-800 rounded-md"
      }`}
    >
      {title}
    </button>
  );
};
