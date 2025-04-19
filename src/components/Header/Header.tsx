import { useScreen } from "@/context/ScreenContext";
import { BigHeader } from "./BigHeader";
import { SmallHeader } from "./SmallHeader";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isOpen,
  setIsOpen,
}: HeaderProps) => {
  const { isLandscapeOrWide } = useScreen();

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
