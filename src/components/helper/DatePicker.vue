<template>
    <v-menu
        v-model="menuDatePicker"
        :close-on-content-click="true"
        :nudge-right="1"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
    >
    <v-text-field
        placeholder=" "
        slot="activator"
        v-model="computedDateProp"
        :label="labelText"
        persistent-hint
        :readonly="readOnly"
        mask="date"
    ></v-text-field>
        <v-date-picker v-model="dataMutated" no-title></v-date-picker>
    </v-menu> 
</template>
<script>
export default {
    props:{
        labelText: String,
        data: String,
        readOnly: {type: Boolean, default: true}
    },
    data: () => ({
        menuDatePicker: false,
        dataMutated: ''
    }),
    mounted(){
        if(this.data){
            this.dataMutated = this.toDate(this.data).toISOString().substr(0, 10)
        }
    },
    methods: {

     formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },

      toDate(dateStr) {
        var parts = dateStr.split("/")
        return new Date(parts[2], parts[1] - 1, parts[0])
      }

    },
    computed: {

        computedDateProp : {
            get(){
                return this.formatDate(this.dataMutated)
            },
            set(){
                this.$emit('update:data', this.computedDateProp)
            }
        }      

    },
    watch: {
        data(newVal) {
            this.dataMutated = this.toDate(newVal).toISOString().substr(0, 10)
        }  
    }

}
</script>

