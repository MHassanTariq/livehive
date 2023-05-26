import ReactSwitch from "react-switch";

interface Props {
  isChecked: boolean;
  onCheck: (val: boolean) => void;
  onTitle: string;
  offTitle: string;
}

const TitledSwitch = ({ isChecked, offTitle, onTitle, onCheck }: Props) => {
  const selectedStyles = "text-text_color font-bold";
  const unselectedStyles = "text-placeholder";
  const onTitleStyles = isChecked ? unselectedStyles : selectedStyles;
  const offTitleStyles = isChecked ? selectedStyles : unselectedStyles;
  return (
    <div className="flex flex-row items-center">
      <p className={`text-sm mr-2 ${onTitleStyles}`}>{onTitle}</p>
      <ReactSwitch
        checked={isChecked}
        onChange={onCheck}
        offColor="#576CA8"
        onColor="#576CA8"
        checkedIcon={false}
        uncheckedIcon={false}
      />
      <p className={`text-sm ml-2 ${offTitleStyles}`}>{offTitle}</p>
    </div>
  );
};

export default TitledSwitch;
