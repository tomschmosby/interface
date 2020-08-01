<template>
    <div id="controlscontainer">
        <strong>Connected: {{connected}}</strong><br><br><br>
        <div class="half">
            <h4>Presets</h4>
            <button v-on:click="lichtR()" :disabled="!connected ">Rot</button>
            <button v-on:click="lichtG()" :disabled="!connected ">Grün</button>
            <button v-on:click="lichtB()" :disabled="!connected ">Blau</button>
            <button v-on:click="lichtA()" :disabled="!connected ">Aus</button>
            <div id= "rect" v-bind:style="{ color: farbe }"></div>
            <button id = "rect" v-bind:style="{ backgroundColor: farbe }"></button>
        </div>
        <div class="half">
            <h4>Current Waiting Queue {{this.currentTimer}}</h4>
            <SimpleQueue :currentQueue="currentQueue" :ownId="ownId" :ownName="clientName"></SimpleQueue>
        </div>
    </div>
</template>

<script>
   import SimpleQueue from "./SimpleQueueComponent"

    export default {
        components: {
            SimpleQueue
        },
        methods: {
            //CHANGEME: die Namen der Nachrichten die ihr mit emit() verschickt müssen mit dem Backend matchen
            lichtA: function () {
                //console.log("lichta");
                this.$socket.emit('lichtA');
            },
            lichtR: function () {
                this.$socket.emit('rotAn');
            },
            lichtG: function () {
                this.$socket.emit('gruenAn');
            },
            lichtB: function () {
                this.$socket.emit('blauAn');
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
                this.connected = true;
                this.$store.state.ownId = this.$socket.id;
                this.$socket.emit("register_front")
            },
            disconnect: function () {
                console.log('socket disconnected')
                this.connected = false;
            },
            //CHANGEME: die Namen der Nachrichten hier reinkommen müssen mit dem Backend matchen (Funktionsname = Nachrichtenname)
            nsp_list: function (data) {
                console.log("NSPs:" + data);
            },
            update_queue: function (data) {
                this.currentQueue = data;
            },
            queue_ping: function() {
                this.$socket.emit("queue_pong")
            },
            update_timer:function(data) {
                this.currentTimer = data;
            },
            client_name: function(data) {
                this.clientName = data;
            },
            farbwert: function(data) {
                console.log(data);
                 this.farbe = data;
            
            },
        },

          
     
        data: function () {
            return {
                connected: false,
                currentQueue: [],
                ownId: "undefined",
                clientName: "undefined",
                currentTimer: 0,
                farbe: '#000000',

            }
        },
        computed: {
            amIActive: function() {
                if(this.currentQueue.length == 0) return false;
                return this.currentQueue[1][0].id === this.ownId;
            }
        }
        
    }
</script>

<style>
    .half {
        display: inline-block;
        max-width: 50%;
        width: 50%;
        vertical-align: top;
    }

    #rect {
        border: black;
        background-color: #000000;
        display: inline-block;
        max-width: 50%;
        width: 50%;
        height: 30px;
        vertical-align: top;
    }



</style>