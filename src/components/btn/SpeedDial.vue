<template>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      fixed
    >
      <v-btn
        slot="activator"
        v-model="fab"
        :color="colorSpeedDial"
        dark
        fab
        large
      >
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
    
        <router-link :to="{name: printPage.componentNameToPrint}" target="_blank">
            <v-tooltip left>
                <v-btn slot="activator" dark color="green" fab>
                    <v-icon dark>print</v-icon>
                </v-btn>
                <span>Imprimir</span>
            </v-tooltip>
        </router-link>

      <v-tooltip left v-for="(item, detail) in items" :key="detail">
        <v-btn slot="activator" dark :color="item.color" @click="item.function" fab small><v-icon dark>{{item.icon}}</v-icon></v-btn>
        <span>{{item.detail}}</span>
      </v-tooltip> 
      
      <v-tooltip left>
        <v-btn slot="activator" dark color="indigo" @click="goBack" fab small><v-icon dark>keyboard_backspace</v-icon></v-btn>
        <span>Voltar</span>
      </v-tooltip>

    <v-tooltip left>
        <v-btn slot="activator" dark color="secondary" to="/home" fab small><v-icon dark>house</v-icon></v-btn>
        <span>Inicio</span>
    </v-tooltip> 

    </v-speed-dial>
</template>
<script>
export default {
    props:{
        colorSpeedDial: {
            type: String,
            required: false,
            default: 'orange'
        },
        printPage: {
            componentNameToPrint: {
                type: String,
                required: true
            }
        },
        
        // {detail:'Detalhes', color: 'primary', function: exibeModalDetalhe, icon: 'open_in_new'}
        items:{
            type: Array,
            required: false,
            default: null,
            validator: function(valueItems){
                if(valueItems === null){
                    return true;
                }
                else{
                    let i;
                    let isValid = true;

                    for(i=0; i < valueItems.length; i++){
                        let item = valueItems[i];
                        
                        //check if any attribute is null
                        if(item.detail === null || item.color === null || item.function === null || item.icon === null){
                            isValid = false;
                            break;
                        }
                    }

                    return isValid;
                }
            }
        }
    },
     data: () => ({
      //Speed-Dial
      fab: true,
      direction: 'top',
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition'
     }),
    methods: {
      newTabPrint(){
        let routeData = this.$router.resolve({path: 'ccheque-imprimir'});
        window.open(routeData.href, '_blank');
      },
      goBack(){
          this.$emit('goBack');
      }
    }
}
</script>
