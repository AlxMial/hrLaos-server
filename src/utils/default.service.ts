export function numberToTime(num: any) {
    const hours = Math.floor(num / 60);
    let minutes = num % 60;
    let minute = minutes.toString();
    if (minutes + ''.length < 2) {
        minute = '0' + minutes;
    }
    return hours + ":" + minute;
}