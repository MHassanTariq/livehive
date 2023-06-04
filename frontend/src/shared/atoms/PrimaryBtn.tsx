interface Props {
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
  containerClassName?: string;
}

const PrimaryBtn = ({
  text,
  onClick,
  containerClassName,
  isDisabled,
}: Props) => {
  const disabledClass = isDisabled ? "bg-placeholder" : "bg-primary";
  return (
    <button
      onClick={onClick}
      className={`${disabledClass} my-2 py-2 px-4 rounded-lg ${containerClassName}`}
      disabled={isDisabled}
    >
      <p className="text-white">{text}</p>
    </button>
  );
};

export default PrimaryBtn;
