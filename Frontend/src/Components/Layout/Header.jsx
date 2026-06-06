import Button from "../common/Button";

const Header = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      mb-6
      "
    >
      <div>
        <h1
          className="
          text-2xl
          font-bold
          text-slate-900
          "
        >
          {title}
        </h1>

        <p className="text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>

      {buttonText && (
        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Header;