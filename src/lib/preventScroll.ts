export const preventDefaultScroll = (e: Event): void => e.preventDefault();
export const allowScrollWithoutPropagation = (e: Event): void =>
    e.stopPropagation();

export const lockParentWithScrollingChild = (
    parentSelector: string,
    childSelector: string,
): void => {
    const parentElement = document.querySelector(parentSelector) as HTMLElement;
    const childElement = document.querySelector(childSelector) as HTMLElement;

    parentElement.style.overflow = "hidden";
    parentElement.classList.add("locked-scroll");
    parentElement.addEventListener("wheel", preventDefaultScroll, {
        passive: false,
    });
    parentElement.addEventListener("touchmove", preventDefaultScroll, {
        passive: false,
    });

    childElement.addEventListener(
        "wheel",
        allowScrollWithoutPropagation,
        false,
    );
    childElement.addEventListener(
        "touchmove",
        allowScrollWithoutPropagation,
        false,
    );
};

export const unlockParentWithScrollingChild = (
    parentSelector: string,
    childSelector: string,
): void => {
    const parentElement = document.querySelector(parentSelector) as HTMLElement;
    const childElement = document.querySelector(childSelector) as HTMLElement;

    parentElement.style.overflow = "auto";

    parentElement.classList.remove("locked-scroll");
    parentElement.removeEventListener("wheel", preventDefaultScroll);
    parentElement.removeEventListener("touchmove", preventDefaultScroll);

    childElement.removeEventListener("wheel", allowScrollWithoutPropagation);
    childElement.removeEventListener(
        "touchmove",
        allowScrollWithoutPropagation,
    );
};
