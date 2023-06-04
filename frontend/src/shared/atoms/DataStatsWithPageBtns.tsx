import PrimaryBtn from "./PrimaryBtn";

export interface DataStatsProps {
  count: number;
  page: number;
  onPrevPage?: (requiredPage: number) => void;
  onNextPage?: (requiredPage: number) => void;
}

const DataStatsWithPageBtns = ({
  count,
  page,
  onPrevPage,
  onNextPage,
}: DataStatsProps) => {
  // logical functions
  function onClickPrev() {
    if (onPrevPage) onPrevPage(page - 1);
  }

  function onClickNext() {
    if (onNextPage) onNextPage(page + 1);
  }

  const statsClassName = "text-base text-text_color font-bold";

  return (
    <div className="flex-row justify-between flex">
      <PrimaryBtn
        text="Prev"
        onClick={onClickPrev}
        isDisabled={onPrevPage ? false : true}
      />
      <div>
        <p className={statsClassName}>{`Total: ${count}`}</p>
        <p className={statsClassName}>{`Page: ${page}`}</p>
      </div>
      <PrimaryBtn
        text="Next"
        onClick={onClickNext}
        isDisabled={onNextPage ? false : true}
      />
    </div>
  );
};

export default DataStatsWithPageBtns;
