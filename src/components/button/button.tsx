type ButtonProps = {
  text: string;
  className: string;
  onClick?: () => void;
};
export function Button({ text, className, onClick }: ButtonProps) {
  return (
    <button className={`${className} p-2 text-white w-fit`} onClick={onClick}>
      {text}
    </button>
  );
}
