export const getDaysInMonth = (date: Date): number => {
    const month = date.getMonth();
    const year = date.getUTCFullYear();
    let daysInMonth = -1;

    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            daysInMonth = 31;
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            daysInMonth = 30;
            break;
        case 1:
            if (year % 4 === 0) {
                if (year % 100 === 0) {
                    if (year % 400 === 0) {
                        daysInMonth = 29;
                    } else {
                        daysInMonth = 28;
                    }
                } else {
                    daysInMonth = 29;
                }
            } else {
                daysInMonth = 28;
            }
            break;
    };

    return daysInMonth;
};

export const formatDate = (date: Date): string => {
    const chunks = date.toDateString().split(" ");
    return chunks[1] + " " + chunks[3];
};

export const getAmountOfDays = (startDate: Date, endDate: Date): number => {
    return (endDate.getTime() - startDate.getTime())
        / (1000 * 60 * 60 * 24);
};

export const beautify = (str: string): string => {
    return str.replace(str.charAt(0), str.charAt(0).toUpperCase())
        .replace(/([A-Z])/g, " $1").trim();
};
