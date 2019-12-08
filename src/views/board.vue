<template>
    <div>
        <v-container>
            <v-row>
                <entry-display-card
                        v-for="(entry, index) in entries"
                        :key="index"
                        @click="showEntryDialog(entry._id)"
                        :entry="entry"
                ></entry-display-card>
            </v-row>
            {{dialog}}
        </v-container>
        <v-dialog
        v-model="dialog">
            <entry-dialog
                    :entry_id="entry_id"
            ></entry-dialog>

        </v-dialog>
        <v-btn><router-link to="/editor">EDIT</router-link></v-btn>
    </div>
    
</template>

<script>
    import entryDisplayCard from "../components/entryDisplayCard";
    import entryDialog from "../components/entryDialog";
    import axios from 'axios';

    export default {
        created(){
            axios.get('http://localhost:3000/api/entries')
            .then(entries => {
                this.entries = entries.data;
            })
            .catch(err => {
                console.log(err);
            })
        },
        components : {
            entryDisplayCard, entryDialog
        },
        name: "board",
        data(){
            return {
                entries : [],
                dialog : false,
                entry_id : ""
            }
        },
        methods : {
            showEntryDialog(entry_id){
                this.entry_id = entry_id;
                this.dialog = true;

            }
        }
    }
</script>

<style scoped>

</style>