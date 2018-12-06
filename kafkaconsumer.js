var UserProfile = require('./Models/UserProfile.js')
var kafka = require('kafka-node')


module.exports = {
    kafkaConsumer : function() {
        var Consumer = kafka.Consumer,
            client = new kafka.KafkaClient({kafkaHost: '149.165.170.59:9092'}),
            consumer = new Consumer(client,
            [{ topic: 'updateProfile', offset: 0}],
            {
                autoCommit: true,
                encoding :'buffer'
            }
        )

        consumer.on('ready', () => {
            console.log("Consumer ready ho gaya!!")
        })
        
        consumer.on('message', (message) => {
            var buf = new Buffer(message.value,"binary")
            var decodedMessage = JSON.parse(buf.toString())
            console.log("decodedmessage: ", decodedMessage)
            UserProfile.updateUserProfile(decodedMessage)
        })

        consumer.on('error', (err) => {
            console.log("error pe aaya")
            console.log('Error:',err);
        })

        consumer.on('offsetOutOfRange', (err) => {
            console.log("offsetOutofRange pe aaya")
            console.log('offsetOutOfRange:',err);
        })
    }
}