// Código funcional ok*****

import express from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: "APP_USR-8589750939107695-010908-1aed014ce26e3ebb2681bfd5a11fd255-310170092"});


// Actualizar en relación al puerto para que cargue en un servidor real ********

const app = express();

// const port = process.env.PORT || 3000;
const port = 3001;

const whitelist = [
"http://localhost:3001",
"http://127.0.0.1:5500",
"https://mascotasplus.netlify.app",
"https://main--mascotasplus.netlify.app",
"https://rcarlosbd.github.io/MascotasPlus/"

]

const corsOptions = {
    origin: function (origin, callback) {
        console.log("Solicitud de origen:", origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Solicitud permitida por CORS");
            callback(null, true);
        } else {
            console.log("Solicitud bloqueada por CORS");
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",  // Agrega OPTIONS si es necesario
};

app.options("*", cors(corsOptions));


app.use(cors(corsOptions));



// app.use(cors());
app.use(express.json());


app.get("/", (req,res)=> {
   res.send("Soy el server :)");
});


app.post("/create_preference", async (req, res)=> {
    console.log("Solicitud recibida en /create_preference");
    console.log("Cuerpo de la solicitud:", req.body);
   try{
       const body = {
           items: [
               {
               title: req.body.title,
               quantity: Number(req.body.quantity),
               unit_price: Number(req.body.price),
               currency_id: "ARS",
               },
           ],
           back_urls: {
               // Corregir las URL para cuando esté actualizado
               success: "https://mascotasplus.netlify.app",
               failure: "",
               pending: "",
           },
           auto_return: "approved",
       };

       const preference = new Preference(client);
       const result = await preference.create({ body });
       res.json({
           id:result.id,
       });
   } catch (error) {
       console.log(error)
       res.status(500).json({
           error: "Error al crear la preferencia :("
       })
   }
});


app.listen(port, ()=> {
   console.log(`El servidor está corriendo exitosamente en ${port}`)
})

// Exportar la aplicación para que Netlify pueda manejarla
export { app };