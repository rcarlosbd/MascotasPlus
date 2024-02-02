// Código funcional ok*****

import express from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: "APP_USR-8589750939107695-010908-1aed014ce26e3ebb2681bfd5a11fd255-310170092"});


// Actualizar en relación al puerto para que cargue en un servidor real ********

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));


app.use(cors());
app.use(express.json());


app.get("/", (req,res)=> {
   res.send("Servidor Activo :)");
});


app.post("/create_preference", async (req, res)=> {
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
       const result = await preference.create({body});
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


// app.listen(port, ()=> {
//    console.log("El servidor está corriendo exitosamente")
// })


// Exportar la aplicación para que Netlify pueda manejarla
export { app };





//******** */ Estos son los cambios realizados:

// Manejar el Puerto Dinámico:

// Se usa process.env.PORT para obtener el puerto proporcionado por Netlify o el puerto 3000 como predeterminado cuando estás desarrollando localmente.
// Eliminación de app.listen:

// En Netlify, no necesitas usar app.listen ya que Netlify gestionará el servidor por ti.
// Exportar la Aplicación:

// Al final, se exporta la aplicación para que Netlify pueda detectarla y manejarla adecuadamente.