export function numberToTime(num: any) {
    const hours = Math.floor(num / 60);
    let minutes = num % 60;
    let minute = minutes.toString();
    if (minutes < 10) {
        minute = '0' + minutes;
    }
    return hours + ":" + minute;
}

export function timeToNumber(value: any, seperate: any) {
    let time = value.split(seperate);
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    return hours * 60 + minutes;
}