<template>
    <div>



        <v-progress-circular
                v-for="(item, index) in timerInfoArray"
                :key="index"
                style="position: absolute"
                :value="percentageValueArray[index]"
                size="200"
                width="20"
                :color="item.color"
                :rotate="rotateValueTransformer(rotateValueArray[index])"
        >
            <p>{{item.minute}}</p>
        </v-progress-circular>
        {{msArray}}


    </div>
</template>

<script>

    //TODO REFACTORING TEST AND THIS

    import CommonUtil from "../CommonUtil";

    export default {
        name: "timeDisplayer",
        props : {
            timerInfoArray : {
                type : Array,
                default(){
                    return [25, 5];

                }
            }
        },
        watch : {
            timerInfoArray :{
                immediate : true,
                handler(timerInfoArray){
                    this.msArray = this.minuteToSecondValue(timerInfoArray);
                    this.totalSumOfTimerSeconds= timerInfoArray.reduce(function(accumulator, currentValue){
                        return accumulator+currentValue.minute*60;
                    }, 0);
                    // eslint-disable-next-line no-unused-vars

                    this.msValueArray= new Array(timerInfoArray.length).fill(0);


                }
            },
            msValueArray: {
                handler(msValueArray){

                   if(msValueArray[this.runningTimerIndex] === this.msArray[this.runningTimerIndex]){
                       this.runningTimerIndex++;
                   }

                }

            }


        },

        computed : {
            percentageValueArray(){

                let calculatedArray= [];

                var vm = this;

                this.msValueArray.forEach(function(seconds){
                    let calculatedValue = CommonUtil.calculatePercentageAsRoundedNumber(seconds, vm.totalSumOfTimerSeconds);
                    calculatedArray.push(calculatedValue);
                });

                return calculatedArray;
            },
            secondPercentageArray(){
                let calculatedArray= [];

                var vm = this;

                this.msArray.forEach(function(seconds){
                    let calculatedValue = CommonUtil.calculatePercentageAsRoundedNumber(seconds, vm.totalSumOfTimerSeconds);
                    calculatedArray.push(calculatedValue);
                });

                return calculatedArray;

            },
            timerStyle(){
                return  {
                    position : "absolute"
                }
            }
        },
        data(){
            return {
                msArray : [],
                msValueArray : [],
                rotateValueArray: [],
                totalSumOfTimerSeconds : 0,
                runningTimerIndex : 0



            }
        },
        created(){
            this.rotateValueArray = this.calculateRotateValueByPercentage(this.secondPercentageArray);

            var vm = this;
            // eslint-disable-next-line no-unused-vars
            var timerInterval= setInterval(function(){
                vm.$set(vm.msValueArray, vm.runningTimerIndex, vm.msValueArray[vm.runningTimerIndex]+1);

            }, 1000) ;

        },
        methods : {
            rotateValueTransformer(value){
                var translatedRotateValue = (value-90)%360;
                return translatedRotateValue === 0 ? 360 : translatedRotateValue;
            },
            minuteToSecondValue(minuteArray){

                let calculatedSecondArray= [];
                minuteArray.forEach(function(timerInfo){
                    let calculatedSecondValue = CommonUtil.minuteToSecond(timerInfo.minute);

                    calculatedSecondArray.push(calculatedSecondValue);
                });

                return calculatedSecondArray;

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