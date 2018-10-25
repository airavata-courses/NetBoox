var UserProfile = require('./Models/UserProfile.js')
var kafka = require('kafka-node')


module.exports = {
    kafkaConsumer : function() {
        Consumer = kafka.Consumer
        // client = new kafka.KafkaClient({kafkaHost: '10.3.100.196:9092'}),
        client = new kafka.KafkaClient({kafkaHost: '10.3.100.196:9092'})
        consumer = new Consumer(client,
            [{ topic: 'updateProfile', offset: 0}],
            {
                autoCommit: true,
                encoding :'buffer'
            }
        );
        consumer.on('message', function (message) {
            var buf = new Buffer(message.value,"binary")
            var decodedMessage = JSON.parse(buf.toString())
            UserProfile.updateUserProfile(decodedMessage)
        })

        consumer.on('error', function (err) {
            console.log("error pe aaya")
            console.log('Error:',err);
        })

        consumer.on('offsetOutOfRange', function (err) {
            console.log("offsetOutofRange pe aaya")
            console.log('offsetOutOfRange:',err);
        })
    }
}