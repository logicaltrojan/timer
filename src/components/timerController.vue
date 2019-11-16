<template>
    <div>
        <time-displayer
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
                timerInfoArray : [
                    {
                        minute : 1,
                        color : "blue"
                    },
                    {
                        minute : 1,
                        color : "red"
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>