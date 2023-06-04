import { SubmitHandler, useForm } from "react-hook-form";
import { InfoGraphics } from "../../store/services/types";
import TitledSwitch from "./TitledSwitch";

interface Props {
  title: string;
  currentInfoGraphic: InfoGraphics;
  onChangeInfoGraphic: (infographic: InfoGraphics) => void;
  onSubmitSearch: (search: string) => void;
}

interface SearchForm {
  search: string;
}

const AnalyticsHeader = ({
  title,
  currentInfoGraphic,
  onChangeInfoGraphic,
  onSubmitSearch,
}: Props) => {
  const { register, handleSubmit } = useForm<SearchForm>();
  const onSubmit: SubmitHandler<SearchForm> = (data) =>
    onSubmitSearch(data.search);

  function isChecked() {
    return currentInfoGraphic === InfoGraphics.Graphs;
  }

  function onCheck(val: boolean) {
    onChangeInfoGraphic(val ? InfoGraphics.Graphs : InfoGraphics.Sheet);
  }

  return (
    <div className="flex flex-row items-center justify-between">
      <h4 className="text-text_color text-xl">{title}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("search")}
          className="bg-lightest_blue text-base outline-none rounded-lg p-2 w-96"
          placeholder="Search..."
        />
      </form>
      <TitledSwitch
        onCheck={onCheck}
        isChecked={isChecked()}
        offTitle="Graph"
        onTitle="Sheet"
      />
    </div>
  );
};

export default AnalyticsHeader;
