<template>
    <div>


        <v-progress-circular
                v-for="(item, index) in timerInfoArray"
                :key="index"
                style="position: absolute"
                :value="minutePercentageArray[index]"
                size="200"
                width="20"
                :color="item.color"
        >
            <p>{{item.minute}}</p>
        </v-progress-circular>


    </div>
</template>

<script>

    import CommonUtil from "../CommonUtil";

    export default {
        name: "timeDisplayer",
        props : {
            timerInfoArray : {
                type : Array,
                default(){

                }
            }
        },
        computed : {
            minutePercentageArray(){
                let calculatedArray= [];
                let sum = 0;
                for(var idx in this.timerInfoArray)  {
                    sum += this.timerInfoArray[idx].minute;
                }


                this.timerInfoArray.forEach(function(ele){
                    let calculatedValue = CommonUtil.calculatePercentageAsRoundedNumber(ele.minute, sum);
                    calculatedArray.push(calculatedValue);
                });

                return calculatedArray;

            },
            minuteSecondsArray(){

                let calculatedSecondArray= [];

                this.timerInfoArray.forEach(function(timerInfo){
                    let calcuatedSecondValue = CommonUtil.minuteToSecond(timerInfo.minute);

                    calculatedSecondArray.push(calcuatedSecondValue);
                });

                return calculatedSecondArray;

            },
            timerStyle(){
                return  {
                    position : "absolute"
                }
            }
        },
        data(){
            return {


            }
        }
    }
</script>

<style scoped>

</style>