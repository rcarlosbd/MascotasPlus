import express from "express";
import cors from "cors";


// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: "APP_USR-8589750939107695-010908-1aed014ce26e3ebb2681bfd5a11fd255-310170092"});


// Actualizar en relación al puerto para que cargue en un servidor real ********

const app = express();
const port =3000;


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
               success: "https://rcarlosbd.github.io/MascotasPlus/client/page/resumen.html",
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


app.listen(port, ()=> {
   console.log("El servidor está corriendo exitosamente")
})
