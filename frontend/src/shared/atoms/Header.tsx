interface Props {
  onClickLogo: () => void;
}

const Header = ({ onClickLogo }: Props) => {
  return (
    <div className="flex p-4 drop-shadow-xl bg-bg_color">
      <button onClick={onClickLogo}>
        <h1 className="text-lg font-bold text-text_color">Stream Matrics</h1>
      </button>
    </div>
  );
};

export default Header;
