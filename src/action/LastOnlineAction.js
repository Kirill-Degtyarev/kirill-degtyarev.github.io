export default class LastOnlineAction {
    static getLastOnline(time) {
        const currentDate = new Date();
        const lastOnlineDate = new Date(time);

        const currentHours = currentDate.getHours();
        const currentMinute =
            currentDate.getMinutes() < 10
                ? "0" + currentDate.getMinutes()
                : currentDate.getMinutes();
        const currentDay = currentDate.getDate();
        // eslint-disable-next-line
        const currentMonth =
            currentDate.getMonth() + 1 > 10
                ? currentDate.getMonth() + 1
                : "0" + +(currentDate.getMonth() + 1);
        // eslint-disable-next-line
        const currentYear = currentDate.getFullYear();

        const lastOnlineHours = lastOnlineDate.getHours();
        const lastOnlineMinute =
            lastOnlineDate.getMinutes() < 10
                ? "0" + lastOnlineDate.getMinutes()
                : lastOnlineDate.getMinutes();
        const lastOnlineDay = lastOnlineDate.getDate();
        // eslint-disable-next-line
        // const lastOnlineMonth =
        //     lastOnlineDate.getMonth() + 1 > 10
        //         ? lastOnlineDate.getMonth() + 1
        //         : "0" + +(lastOnlineDate.getMonth() + 1);
        // eslint-disable-next-line
        // const lastOnlineYear = lastOnlineDate.getFullYear();

        const differenceOfHours = currentHours - lastOnlineHours;
        const differenceOfMinute = currentMinute - lastOnlineMinute;
        const differenceOfDays = currentDay - lastOnlineDay;

        if (
            differenceOfMinute > 0 &&
            differenceOfMinute <= 60 &&
            differenceOfDays === 0 &&
            differenceOfHours === 0
        ) {
            return `last online ${differenceOfMinute} minutes ago`;
        } else if (differenceOfMinute === 0 && differenceOfDays === 0 && differenceOfHours === 0) {
            return "last online now";
        }

        if (differenceOfHours > 0 && differenceOfHours < 5 && differenceOfDays === 0) {
            return `last online ${differenceOfHours} hours ago`;
        } else if (differenceOfHours > 0 && differenceOfHours >= 5 && differenceOfDays === 0) {
            return `latest online today at ${lastOnlineHours + ":" + lastOnlineMinute}`;
        }

        if (differenceOfDays > 0 && differenceOfDays < 7) {
            return `last online ${
                differenceOfDays > 1 ? differenceOfDays + " days ago" : "yesterday"
            } `;
        } else if (differenceOfDays >= 7 && differenceOfDays <= 14) {
            return "last online a week ago";
        }
    }
}
