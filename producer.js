var express = require('express')
var kafka = require('kafka-node')
var app = express()
var zk = require('./zookeeperService.js')

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var Producer = kafka.Producer,
    client = new kafka.KafkaClient({kafkaHost: '149.165.170.59:9092'}),
    producer = new Producer(client)

producer.on('ready', function () {
    console.log('Producer is ready');
});

producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
})

app.get('/', (req, res) => {
    res.send('Welcome to the world of Kafka Producer for Netboox!!')
})

app.post('/kafkaProducer',function(req, res){
    const buffer = new Buffer.from(JSON.stringify(req.body.data));
    payloads = [
        { topic: req.body.topic, messages:buffer , partition: 0 }
    ];
    console.log(`Topic received is ${req.body.topic} and Message is ${JSON.stringify(req.body.data)}`)
    producer.send(payloads, (err, data) => {
        if (err)
            console.log(err)
        
        console.log(data)
        res.json(data)
    })
})

async function ZK (server) {
    var text = await zk.zkCreateClient(server)
    console.log(text)
}

const server = app.listen(4004, () => {
    console.log(`Kafka producer now running on ${server.address().address} :${server.address().port}/kafkaProducer`)
    // ZK(server)
})