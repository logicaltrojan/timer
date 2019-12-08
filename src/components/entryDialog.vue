<template>
    <v-card>
        <title>{{entryInfo.title}}</title>
        <viewer
        :value="entryInfo.content">
        </viewer>
    </v-card>
</template>

<script>
    import axios from 'axios'
    import 'tui-editor/dist/tui-editor-contents.css';
    import 'highlight.js/styles/github.css';
    import Viewer from '@toast-ui/vue-editor/src/Viewer.vue'

    export default {
        name: "entryDialog",
        components : {
            Viewer
        },
        props : {
            entry_id : {
                type : String
            }
        },
        data(){
            return {
                entryInfo : {}
            }
        },
        watch : {
            entry_id : {
                immediate: true,
                handler(entry_id) {
                    axios.get("http://localhost:3000/api/entry/" + entry_id)
                        .then(res => {
                            this.entryInfo = res.data;

                        }).catch(err => {
                        console.log(err);
                    })
                }
            }

        }
    }
</script>

<style scoped>

</style>