<template>
    <div>
        <v-btn @click="isStarted = true">START TIMER</v-btn>
        <v-btn @click = "isPaused = true">PAUSE</v-btn>
        <v-btn @click = "isPaused = false">RESUME</v-btn>
        <v-btn @click= "isStopped = false">RESET</v-btn>



        <time-displayer
                :isStarted="isStarted"
                :is-stopped="isStopped"
                :is-paused="isPaused"
                :timerInfoArray="timerInfoArray">
        </time-displayer>
    </div>
    
</template>

<script>

    import timeDisplayer from "./timeDisplayer";
    export default {
        name: "testComponent",
        components: { timeDisplayer},
        data(){
            return{
                isStarted : false,
                isPaused  : false,
                isStopped : true,
                timerInfoArray : [
                    {
                        minute : 5,
                        color : "purple"
                    },
                    {
                        minute : 3,
                        color : "red"
                    },
                    {
                        minute : 2,
                        color : "green"
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>