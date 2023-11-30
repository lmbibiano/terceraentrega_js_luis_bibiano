const shopcontent = document.getElementById("shopcontent");
const verCarrito = document.getElementById("vercarrito");
const modalContainer = document.getElementById("modal-container");

let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Para recuperar lo que se añade al local storage
// crea la card por prodcto
productos.forEach((product) => { // recorremos el array de objetos
    let content = document.createElement("div");// se crea la card  
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="descrp">${product.descripcion}</p>
        <p class="price">${product.precio} $</p>
    `;

    shopcontent.append(content);// se agrega el contenido de la card
// crear botones de comprar y comprar
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar); // se agrega el boton de comprar
    
    comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatproduct) => repeatproduct.id === product.id); // Busca el id del producto en el carrito que está repetido

        if (repeat) { // Si el ID está exactamente, recorremos si hay otro igual, se suma la cantidad
            carrito.map((prod) => { // Recorremos el carrito
                if (prod.id === product.id) {
                    prod.stock = prod.stock += 1;
                }
            });
        } else { // Si el ID no coincide, se agrega
            carrito.push({// Se agrega al carrito
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio,
                stock: product.stock,
            });
        }
        console.log(carrito);// Se imprime el carrito
        saveLocal();// Se guardan los cambios en el local storage
    });
});

// Modal que crea el carrito de compras
const crearCarrito = () => { // Se crea el modal    
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");// Se crea el encabezado
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Compras....</h1>
    `;
    modalContainer.append(modalHeader);// Se agrega el encabezado

    const modalbutton = document.createElement("h1");
    modalbutton.innerHTML = "x";
    modalbutton.className = "modal-header-button";

    modalHeader.append(modalbutton);

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
// Agregamos productos al carrito 
    carrito.forEach((product, index) => { // Recorremos el carrito por productos
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.setAttribute('data-id', index)
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p class="price">${product.precio} cpl</p>
            <p>Cant.:${product.stock}</p>
        `;

        modalContainer.append(carritoContent);// Se agrega el contenido al carrito

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "boton-borrar";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProduct);
    });

    const envio = 1200;
    const iva = 0.20;
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    const totalElement = document.createElement("div");
    totalElement.className = "total";
    totalElement.innerHTML = `Total: ${total} cpl`;
    modalContainer.append(totalElement);

    const totalCompraIva = document.createElement("div");
    totalCompraIva.className = "total-comp-iva";
    totalCompraIva.innerHTML = `Total IVA a pagar: ${total * iva} cpl`;
    modalContainer.append(totalCompraIva);

    const totalEnvio = document.createElement("div");
    totalEnvio.className = "total-envio";
    totalEnvio.innerHTML = `Total envío: ${envio} cpl`;
    modalContainer.append(totalEnvio);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-comp";
    totalCompra.innerHTML = `Total a pagar: ${envio + total * iva + total} cpl`;
    modalContainer.append(totalCompra);

    let pagar = document.createElement("button");
    pagar.innerText = "pagar";
    pagar.className = "Pagar";
    modalContainer.append(pagar);
};

verCarrito.addEventListener("click", crearCarrito);
const eliminarProduct = (event) => {
    const productId = event.target.parentNode.getAttribute('data-id');
    carrito.splice(productId, 1);


    saveLocal();
    crearCarrito();
};


const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"));
