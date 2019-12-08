<template>
    <v-card
    class="mx-auto"
    v-on="listeners">
        {{entry.tags}}
        <v-card-title>
            {{entry.title}}
        </v-card-title>
        <v-card-subtitle>
            {{entry.subtitle}}
        </v-card-subtitle>
        <v-card-text>
            {{entry.abstractContent}}
        </v-card-text>
        <v-card-actions>

            {{entry.author}}
            {{toDate(entry.createdDate)}}
            <v-icon>mdi-heart</v-icon>
            <span>{{entry.meta.likes}}</span>
            <v-icon>mdi-share-variant</v-icon>
            <span>{{entry.meta.views}}</span>
        </v-card-actions>
    </v-card>
    
</template>

<script>

    import moment from 'moment';
    export default {
        name: "entryDisplayCard",
        props : {
            entry : {
                type : Object
            }
        },
        computed : {
            listeners() {
                const { ...listeners } = this.$listeners;
                return listeners;
            },
        },
        methods : {
            toDate(timeStamp){
               return moment(timeStamp).format("YYYY-MM-DD");
            }
        }
    }
</script>

<style scoped>

</style>