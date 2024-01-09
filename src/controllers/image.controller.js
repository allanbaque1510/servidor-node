import User from "../models/user.model.js";
import Imagen from "../models/image.model.js";
import RabbitMQConfig from "../config_cola.js";
export const getAllImages = async (req, res) => {
  const datos = await Imagen.find();
  res.json(datos);
};

export const viewImage = async (req, res) => {
  console.log("hola");
  const data = await Imagen.findOne({ _id: req.params.id });
  if (!data) return res.status(400).json({ message: "No se encontro imagen" });
  res.json(data);
};

export const uploadImages = async (req, res) => {
  try {
    const { imagen, titulo, usuario } = req.body;
    const userFound = await User.findOne({ username: usuario });
    if (!userFound) {
      return res.status(400).json(["El usuario no se encuentra registrado"]);
    }

    const mensajeCola = { imagen, titulo, usuario };
    const cola = "cola-de-espera";
    const mensajeJson = JSON.stringify(mensajeCola);
    const rabbitMQ = new RabbitMQConfig();
    await rabbitMQ.connect();
    await rabbitMQ.createQueue(cola);
    await rabbitMQ.publishToQueue(cola, mensajeJson);
    await rabbitMQ.close();

    res
      .status(200)
      .json({ status: "Ok!", message: "Imagen agregada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
