<template>
    <div>
        <v-form>
            <v-container>
                <v-text-field
                label="Title"
                v-model="title"> </v-text-field>
                <v-text-field
                label="tags"
                v-model="tags"> </v-text-field>
                <v-text-field
                label="Author"
                v-model="author"> </v-text-field>
                <div>
                    <editor v-model="markDownText"
                    preview-style="vertical"
                    height="500px"></editor>
                </div>
                <v-btn
                @click="submit">SUBMIT</v-btn><v-btn>TEMP SAVE</v-btn>

            </v-container>
        </v-form>
    </div>
</template>
<script>
    import 'tui-editor/dist/tui-editor.css';
    import 'tui-editor/dist/tui-editor-contents.css';
    import 'codemirror/lib/codemirror.css';
    import axios from 'axios';
    import Editor from '@toast-ui/vue-editor/src/Editor.vue'


    export default {
        name: "MyEditor",
        components : {
            Editor
        },
        data(){
            return {
                markDownText : "",
                options : {},
                title : "",
                author :"",
                tags : ""
            }
        },
        methods : {
            submit(){
                 axios.post('http://localhost:3000/api/entry',
                 {
                     title : this.title,
                     content : this.markDownText,
                     tags : this.tags,
                     author : this.author,
                     meta : {
                         likes : 0,
                         views : 0
                     }
                 });
            }
        }
    }
</script>

<style scoped>

</style>