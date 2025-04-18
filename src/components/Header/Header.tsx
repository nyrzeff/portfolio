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
  return (
    <>
      {isLandscapeOrWide ? (
        <BigHeader />
      ) : (
        <SmallHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};
