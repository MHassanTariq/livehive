import { useLocation, useNavigate } from "react-router-dom";

/**
 * Nav bar category is used to differentiate between the category title and the pathname
 * it will be redirected upon clicking the category
 */
type NavBarCategory = {
  title: string;
  pathname: string;
};

/**
 * These are the list of all categories that will be shown to the user
 */
const navBarCategories: NavBarCategory[] = [
  { title: "Location", pathname: "/location" },
  { title: "Apps", pathname: "/apps" },
  { title: "Weblink", pathname: "/weblink" },
];

interface Props {
  currentOption: NavBarCategory;
  isActive: boolean;
  onClickNavBarOption: (option: NavBarCategory, isActive: boolean) => void;
}

/**
 * NavBarOption displays a single category in the nav bar
 */
const NavBarOption = ({
  currentOption,
  isActive,
  onClickNavBarOption,
}: Props) => {
  function onClick() {
    onClickNavBarOption(currentOption, isActive);
  }

  const activeContainerStyles = isActive
    ? "bg-gradient-to-r from-lightest_blue to-transparent"
    : "";
  const activeTextStyles = isActive ? "font-bold" : "";
  const activeFlagStyles = isActive ? "bg-primary" : "";

  return (
    <button
      onClick={onClick}
      className={`${activeContainerStyles} mt-4 flex-row flex items-center`}
    >
      <div className={`h-5 w-1 ${activeFlagStyles} rounded-r-md`} />
      <h6 className={`${activeTextStyles} text-base text-text_color px-4 py-1`}>
        {currentOption.title}
      </h6>
    </button>
  );
};

/**
 * This component render the entire nav bar on the left of the screen
 */
const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  function onClickNavBarOption(barOption: NavBarCategory, isActive: boolean) {
    if (isActive) return;
    navigate(barOption.pathname);
  }
  function isActiveCategory(barOption: NavBarCategory) {
    return location.pathname.includes(barOption.pathname);
  }

  return (
    <div className="flex-col flex items-start mt-2 h-screen">
      {navBarCategories.map((cat, index) => (
        <NavBarOption
          onClickNavBarOption={onClickNavBarOption}
          isActive={isActiveCategory(cat)}
          currentOption={cat}
          key={index.toString()}
        />
      ))}
    </div>
  );
};
export default NavBar;
