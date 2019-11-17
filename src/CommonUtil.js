


function calculatePercentageAsRoundedNumber(ele, sum){

    return Math.round((ele/sum) * 100);
}

// eslint-disable-next-line no-unused-vars
function secondToMinuteFloor(second){
    return Math.floor(second/60);
}
function minuteToSecond(minute) {
    return minute*60;
}

export default {
    calculatePercentageAsRoundedNumber,
    minuteToSecond
};
