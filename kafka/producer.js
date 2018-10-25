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
    client = new kafka.KafkaClient(),
    producer = new Producer(client);

producer.on('ready', function () {
    console.log('Producer is ready');
});

producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
})


app.post('/kafkaproducer',function(req, res){
    console.log("req.body.topic: ", req.body.topic)
    const buffer = new Buffer.from(JSON.stringify(req.body.data));
    payloads = [
        { topic: req.body.topic, messages:buffer , partition: 0 }
    ];
    producer.send(payloads, function (err, data) {
        console.log(data)
        res.json(data);
    });
})

async function ZK (server) {
    await zk.zkCreateClient(server)
}

const server = app.listen(4004, () => {
    console.log(`Kafka producer now running on ${server.address().address} :${server.address().port}/kafkaProducer`)
    ZK(server)
})