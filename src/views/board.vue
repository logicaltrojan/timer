<template>
    <div>
        <v-container>
            <v-layout row wrap >
                <v-flex
                    lg6 md6 xs12
                    :key="index"
                    v-for="(entry, index) in entries"
                    class="pa-3"
                >
                        <entry-display-card
                                @click="showEntryDialog(entry._id)"
                                :entry="entry"
                        />
                </v-flex>
            </v-layout>
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