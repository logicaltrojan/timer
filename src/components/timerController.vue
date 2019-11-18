<template>
    <div>
        <v-btn @click= "isStarted = true">START TIMER</v-btn>
        <v-btn @click = "isPaused = true">PAUSE</v-btn>
        <v-btn @click = "isPaused = false">RESUME</v-btn>
        <v-btn @click= "isStopped = false">RESET</v-btn>


        <div style="z-index: -9999">
            <time-displayer
                    :isStarted="isStarted"
                    :is-stopped="isStopped"
                    :is-paused="isPaused"
                    :timerInfoArray="timerInfoArray">
            </time-displayer>

        </div>
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
                        minute : 1,
                        color : "purple"
                    },
                    {
                        minute : 1,
                        color : "red"
                    },
                    {
                        minute : 1,
                        color : "green"
                    },
                    {
                        minute : 1,
                        color : "blue"
                    },
                    {
                        minute : 1,
                        color : "black"
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>