import { BigHeader } from "./BigHeader";
import { SmallHeader } from "./SmallHeader";

interface HeaderProps {
  isLandscapeOrWide: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLandscapeOrWide,
  isOpen,
  setIsOpen,
}: HeaderProps) => {
  const imagePath = "/src/assets/images/eye-of-nyrzeff.svg";

  return (
    <>
      {isLandscapeOrWide ? (
        <BigHeader imagePath={imagePath} />
      ) : (
        <SmallHeader
          imagePath={imagePath}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};
