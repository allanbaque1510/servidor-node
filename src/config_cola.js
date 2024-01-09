import amqp from "amqplib";

//Variables
const RABBIT_HOST = "192.168.100.5";
const RABBIT_PORT = "5672";
const RABBIT_USERNAME = "allan";
const RABBIT_PASSWORD = "allan";
const RABBIT_VHOST = "host-cola";

//Coneccion
const RABBITMQ_URL = `amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${RABBIT_HOST}:${RABBIT_PORT}/${RABBIT_VHOST}`;
class RabbitMQConfig {
  constructor() {
    this.channel = null;
  }

  async connect() {
    try {
      const conn = await amqp.connect(RABBITMQ_URL);
      this.channel = await conn.createChannel();
      console.log(`Conectado a Rabbit: ${RABBITMQ_URL}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createQueue(queueName, options) {
    await this.channel.assertQueue(queueName, options);
  }

  async publishToQueue(queueName, message) {
    this.channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Enviando mensaje a ${queueName} en ${RABBIT_VHOST}`);
  }

  async subscribeToQueue(queueName, callback, options) {
    await this.channel.consume(
      queueName,
      (msg) => {
        const message = msg.content.toString();
        callback(message);
        this.channel.ack(msg);
      },
      options
    );
  }

  async close() {
    await this.channel.close();
  }
}
export default RabbitMQConfig;
