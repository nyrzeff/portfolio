import { useScreen } from "@/context/ScreenContext";
import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isOpen,
  setIsOpen,
}: HeaderProps) => {
  const { isDesktopExperience } = useScreen();

  return (
    <>
      {isDesktopExperience ? (
        <HeaderDesktop />
      ): (
        <HeaderMobile isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};
