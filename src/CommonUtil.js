


function calculatePercentageAsRoundedNumber(ele, sum){

    return Math.round((ele/sum) * 100);
}

function minuteToSecond(minute) {


    return minute*60;


}

export default {
    calculatePercentageAsRoundedNumber,
    minuteToSecond
};
