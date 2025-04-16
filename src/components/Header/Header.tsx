import { BigHeader } from "./BigHeader";
import { SmallHeader } from "./SmallHeader";

interface HeaderProps {
  isLandscapeOrWide: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  imagePath: string;
}

export const Header: React.FC<HeaderProps> = ({
  isLandscapeOrWide,
  isOpen,
  setIsOpen,
  imagePath,
}: HeaderProps) => {
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
