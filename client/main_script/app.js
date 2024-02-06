// // ****** INTEGRACIÓN CN MERCADO PAGO ****

const mp = new MercadoPago("APP_USR-5fc25b7d-4077-4442-ab1f-c26381f537ff", {
  locale: "es-AR"
});

// Variable para rastrear si ya se ha creado el botón
let isButtonCreated = false;

document.getElementById("checkout-btn").addEventListener("click", async () => {
  try {
    const orderData = {
      title: "Pago de confirmación de turno",
      quantity: 1,
      price: window.importeTotal 
    };
    // http://localhost:3000/create_preference
    // https://mascotasplus.netlify.app
    // https://main--mascotasplus.netlify.app/create_preference
   
    const response = await fetch("https://mascotasplus.netlify.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const preference = await response.json();

    // Verificar si ya se creó el botón antes de crear uno nuevo
    if (!isButtonCreated) {
      createCheckoutButton(preference.id);
      isButtonCreated = true;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error: Algo está saliendo mal con el create_preference");
  }
});

const createCheckoutButton = (preferenceId) => {
  const bricksBuilder = mp.bricks();

  const renderComponent = async () => {
    // Desmontar el botón existente si ya fue creado
    const checkoutButton = window.checkoutButton;
    if (checkoutButton) {
      checkoutButton.unmount();
    }

    await bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
    });
  };

  renderComponent();
};
