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
                        minute : 20,
                        color : "blue"
                    },
                    {
                        minute : 5,
                        color : "red"
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>