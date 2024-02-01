// // Código funcional ok*****

// import express from "express";
// import cors from "cors";


// // SDK de Mercado Pago
// import { MercadoPagoConfig, Preference } from 'mercadopago';
// // Agrega credenciales
// const client = new MercadoPagoConfig({ accessToken: "APP_USR-8589750939107695-010908-1aed014ce26e3ebb2681bfd5a11fd255-310170092"});


// // Actualizar en relación al puerto para que cargue en un servidor real ********

// const app = express();
// const port =3000;


// app.use(cors());
// app.use(express.json());


// app.get("/", (req,res)=> {
//    res.send("Servidor Activo :)");
// });


// app.post("/create_preference", async (req, res)=> {
//    try{
//        const body = {
//            items: [
//                {
//                title: req.body.title,
//                quantity: Number(req.body.quantity),
//                unit_price: Number(req.body.price),
//                currency_id: "ARS",
//                },
//            ],
//            back_urls: {
//                // Corregir las URL para cuando esté actualizado
//                success: "https://rcarlosbd.github.io/MascotasPlus/client/page/resumen.html",
//                failure: "",
//                pending: "",
//            },
//            auto_return: "approved",
//        };


//        const preference = new Preference(client);
//        const result = await preference.create({body});
//        res.json({
//            id:result.id,
//        });
//    } catch (error) {
//        console.log(error)
//        res.status(500).json({
//            error: "Error al crear la preferencia :("
//        })
//    }
// });


// app.listen(port, ()=> {
//    console.log("El servidor está corriendo exitosamente")
// })










// Código de prueba con reedirección y almacenamiento de la info del sitio

import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Activo :)");
});

app.post("/create_preference", async (req, res) => {
  try {
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
        success: "https://rcarlosbd.github.io/MascotasPlus/client/page/resumen.html",
        failure: "https://rcarlosbd.github.io/MascotasPlus/client/page/failure.html",
        pending: "https://rcarlosbd.github.io/MascotasPlus/client/page/pending.html",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
      init_point: result.init_point,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia :(",
    });
  }
});

app.get("/success", (req, res) => {
  // Recupera la información almacenada después de la redirección
  const informacionRecuperada = JSON.parse(localStorage.getItem("informacion"));

  // Puedes hacer lo que necesites con la información recuperada
  console.log("Información recuperada:", informacionRecuperada);

  // Limpia la información almacenada después de usarla
  localStorage.removeItem("informacion");

  // Redirige al usuario al sitio anterior con la información recuperada
  res.redirect("https://rcarlosbd.github.io/MascotasPlus/client/page/resumen.html");
});

app.listen(port, () => {
  console.log("El servidor está corriendo exitosamente");
});

