<!-- In dieser Komponente werden die Interaktiven bedienelemente geschaffen  -->
<template><!-- hier wird mit HTML das Gerüst für die Komponente gebaut. --> 
    <div id="controlscontainer"><!-- mit der id kann im css Teil der Komponente ein Styling vorgenommen werden, welches auf mehrere Objekte angewant werden kann. -->
        <strong>Connected: {{connected}}</strong><br><br><br><!--  Das Strong Tag gibt an dass diese Typo in "Bold" gerendert werden soll, anschließend folgen 2 zeilenumbrüche. --> 
        <div class="half"> <!-- Mit hier wird ein Container mit der Classe "half" auf gemacht-->
            <h4>Presets</h4> <!--Überschrift-->
            <button v-on:click="lichtR()" :disabled="!connected ">Rot</button> <!-- Erzeuge einen Button der Auf das Event onClick also Mausklick die Funktion lichtR() ausführen soll, außerdem soll der Button Desabled sein wenn die verbindung zum Backend nicht Steht. Der Button hat das Lable Rot -->
            <button v-on:click="lichtG()" :disabled="!connected ">Grün</button><!-- Erzeuge einen Button der Auf das Event onClick also Mausklick die Funktion lichtG() ausführen soll, außerdem soll der Button Desabled sein wenn die verbindung zum Backend nicht Steht. Der Button hat das Lable Grün -->
            <button v-on:click="lichtB()" :disabled="!connected ">Blau</button><!-- Erzeuge einen Button der Auf das Event onClick also Mausklick die Funktion lichtB() ausführen soll, außerdem soll der Button Desabled sein wenn die verbindung zum Backend nicht Steht. Der Button hat das Lable Blau -->
            <button v-on:click="lichtA()" :disabled="!connected ">Aus</button><!-- Erzeuge einen Button der Auf das Event onClick also Mausklick die Funktion lichtA() ausführen soll, außerdem soll der Button Desabled sein wenn die verbindung zum Backend nicht Steht. Der Button hat das Lable Aus -->
            <div id= "rect" v-bind:style="{ backgroundColor: farbe}"></div> <!-- Dieser Container erhällt einen neuen Wert für die Hintergrundfarbe wird dieses Atribut hier neu definiert überschreibt es die Vorgeben der Klasse aus dem Styling. -->
        </div> <!-- Schließtendes Kontainer Tag-->
        <div class="half"> <!--Öffnet ein weiteren Kontainer mit den Atributen, die in der Classe "half" definiert wurden -->
            <h4>Current Waiting Queue {{this.currentTimer}}</h4><!-- Überschrift -->
            <SimpleQueue :currentQueue="currentQueue" :ownId="ownId" :ownName="clientName"></SimpleQueue><!-- Einbinden der Komponente SimpleQueue-->
        </div>
    </div>
</template><!-- Schließendes template Tag Ende des Konstucor-->

<script> // mit dem script Tag   
   import SimpleQueue from "./SimpleQueueComponent" //Importieren der Komponente Simplequeue von dieser Adresse.

    export default { //Um die Inhalt also die Funktionen dieser Komponente in Nutzen zu Können muss diese "Ausgegeben" werden, dies geschieht für die Funktionen Dieser Componente und der Gelisteten Componenten: SimpleQueue.
        components: {
            SimpleQueue
        },
        methods: { // hier werden die Funktionen definiert die von den Events aus dem Konstruktor initialisiert werden. 
            //CHANGEME: die Namen der Nachrichten die ihr mit emit() verschickt müssen mit dem Backend matchen
            lichtA: function () {  //wenn der Button mit dieser Funktion gedrückt wird soll die Nachricht 'lichtA' via SocketIO gesendet werden, Die Nachricht wird in dem Channel Gepostet in dem sich auch der Backend Client befindet.
                //console.log("lichta"); //String ausgabe zum debuggen 
                this.$socket.emit('lichtA');//wenn diese funktion aufgerufen wird soll dies (innere) Funktion ausgeführt werden. Sende die Nachricht lichtA über SocketIO
                this.farbe = this.originalcolor;
            },
            lichtR: function () {
                this.$socket.emit('rotAn');//wenn diese funktion aufgerufen wird soll dies (innere) Funktion ausgeführt werden. Sende die Nachricht rotAn über SocketIO
            },
            lichtG: function () {
                this.$socket.emit('gruenAn');//wenn diese funktion aufgerufen wird soll dies (innere) Funktion ausgeführt werden. Sende die Nachricht gruenAn über SocketIO
            },
            lichtB: function () {
                this.$socket.emit('blauAn');//wenn diese funktion aufgerufen wird soll diese (innere) Funktion ausgeführt werden. Sende die Nachricht blauAn über SocketIO
            }
        },
        sockets: { // hier wird der Socket client für das Frontend aufgesetzt 
            connect: function () { //mit dieser Funktion wird die Verbindung für den Socket aufgebaut 
                console.log('socket connected')// gib den Status connected aus 
                this.connected = true; //setzte die Veriable connectet auf true wenn connected 
                this.$store.state.ownId = this.$socket.id; //speicher die Socked ID in der dieser Variable 
                this.$socket.emit("register_front") //sende diese Nachricht nach dem jedem verbinden. 
            },
            disconnect: function () { // auf disconnect führe diese funktion aus
                console.log('socket disconnected') // gib diese Nachricht aus 
                this.connected = false; // setzte die Veriable connected auf false
            },
            //CHANGEME: die Namen der Nachrichten hier reinkommen müssen mit dem Backend matchen (Funktionsname = Nachrichtenname)
            nsp_list: function (data) { //gib die liste der Angemeldeten Bots in der Console aus 
                console.log("NSPs:" + data);
            },
            update_queue: function (data) { // höre auf die Nachricht "update_queue" und Speichere den Inhalt in der Variable currentQueue
                this.currentQueue = data;
            },
            queue_ping: function() {  // Höre auf die Nachricht "queue_ping" und Sende die nachricht "queue_pong"
                this.$socket.emit("queue_pong")
            },
            update_timer:function(data) { //Höre auf die Nachricht "update_timer" und speichere den Inhalt in der Variable currentTimer
                this.currentTimer = data; 
            },
            client_name: function(data) {  // Höre auf die Nachricht "client_name" und speichere den Inhalt in der Variable clientName
                this.clientName = data; 
            },
            farbe: function(data) {  // Höre auch die Nachticht "farbwert" und speichere den Inhalt in der Variable farbe
                console.log(data);
                 this.farbe = data;
            
            },
        },

          
     
        data: function () { //mit dieser Methode werden die folgenden Variablen erstellt.
            return { 
                connected: false,
                currentQueue: [],
                ownId: "undefined",
                clientName: "undefined",
                currentTimer: 0,
                farbe: '#000000',
                originalcolor: '#000000',


            }
        },
        computed: { //diese Variable wird ständig neu bereuchnet
            amIActive: function() { 
                if(this.currentQueue.length == 0) return false;
                return this.currentQueue[1][0].id === this.ownId;
            }
        }
        
    }
</script>

<style> /* diese beiden Klassen definieren einen bestimmten style nach dem die Objekte im Konstruktor gerendert werden */
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