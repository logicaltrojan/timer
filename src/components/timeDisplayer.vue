<template>
    <div>



<!--        <v-progress-circular-->
<!--                v-for="(item, index) in timerInfoArray"-->
<!--                :key="index"-->
<!--                style="position: absolute"-->
<!--                :value="secondPercentageArray[index]"-->
<!--                size="200"-->
<!--                width="20"-->
<!--                :color="item.color"-->
<!--                :rotate=""-->
<!--        >-->
<!--            <p>{{item.minute}}</p>-->
<!--        </v-progress-circular>-->
        <v-progress-circular
                style="position: absolute"
                :value="secondPercentageArray[0]"
                size="200"
                width="20"
                color="red"
                :rotate="rotateValueTransformer(0)"
        >
        </v-progress-circular>
        <v-progress-circular
                style="position: absolute"
                :value="secondPercentageArray[1]"
                size="200"
                width="20"
                color="blue"
                :rotate="rotateValueTransformer(360*(0.8))"
        >
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
            secondPercentageArray(){
                let calculatedArray= [];
                let sum = 0;
                for(var idx in this.minuteSecondsArray)  {
                    sum += this.minuteSecondsArray[idx];
                }

                this.minuteSecondsArray.forEach(function(seconds){
                    let calculatedValue = CommonUtil.calculatePercentageAsRoundedNumber(seconds, sum);
                    calculatedArray.push(calculatedValue);
                });

                return calculatedArray;

            },
            minuteSecondsArray(){

                let calculatedSecondArray= [];

                this.timerInfoArray.forEach(function(timerInfo){
                    let calculatedSecondValue = CommonUtil.minuteToSecond(timerInfo.minute);

                    calculatedSecondArray.push(calculatedSecondValue);
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
        },
        created(){
            this.calculateRotateValueByPercentage([80,20])   ;
        },
        methods : {
            rotateValueTransformer(value){
                return (value-90)%360;
            },

            //TODO NEED DATA STANDARD
            calculateRotateValueByPercentage(percentageArray){

                let rotateValueArray= [0];
                let percentageAccumulate= 0;

                for(let i = 0 ; i < percentageArray.length-1 ; i++){
                    percentageAccumulate += percentageArray[i];
                    rotateValueArray.push(Math.round((360/100) * percentageAccumulate));
                }

                return rotateValueArray;




            }
        }
    }
</script>

<style scoped>

</style>