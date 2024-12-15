// Variables globales
let cart = [];
let users = [];
let comments = [];
let orders = [];

// Función para agregar un producto al carrito
function addToCart(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name: productName, quantity: 1 });
    }
    updateCart();
}

// Función para actualizar el carrito de compras
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartPreview = document.getElementById("cart-preview");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = cart.length
        ? cart.map(item => `
            <li>
                ${item.name} - Cantidad: ${item.quantity}
                <button onclick="increaseQuantity('${item.name}')">➕</button>
                <button onclick="decreaseQuantity('${item.name}')">➖</button>
                <button onclick="removeFromCart('${item.name}')">❌ Eliminar</button>
            </li>
        `).join("")
        : "<li>Tu carrito está vacío. ☑¡Comienza a comprar!</li>";

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * 10, 0); // Asume Bs 20 por producto

    cartPreview.textContent = `Total de artículos: ${totalItems}`;
    cartTotal.textContent = `Total: Bs ${totalPrice.toFixed(2)}`;
}

// Función para aumentar la cantidad de un producto en el carrito
function increaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity++;
        updateCart();
    }
}

// Función para disminuir la cantidad de un producto en el carrito
function decreaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    if (product && product.quantity > 1) {
        product.quantity--;
        updateCart();
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

// Función para finalizar la compra
function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar.");
        return;
    }

    orders.push({ items: [...cart], date: new Date().toLocaleString() });
    cart = [];
    updateCart();
    updateOrders();
    alert("¡Compra realizada con éxito!");
}

// Actualizar historial de compras
function updateOrders() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = orders.length
        ? orders.map(
              order =>
                  `<li>${order.date} - Productos: ${order.items
                      .map(item => `${item.name} (x${item.quantity})`)
                      .join(", ")}</li>`
          )
          .join("")
        : "<li>No hay compras realizadas aún.</li>";
}

// Registro de usuarios
document.getElementById("register-form").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const newUser = { name, email, password, phone, address };
    users.push(newUser);
    updateUserList();
});

// Actualizar lista de usuarios
function updateUserList() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = users.length
        ? users.map(user => `<li>${user.name} - ${user.email}</li>`).join("")
        : "<li>No hay usuarios registrados.</li>";
}

// Agregar un comentario
document.getElementById("comment-form").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("comment-name").value;
    const text = document.getElementById("comment-text").value;

    const newComment = { name, text };
    comments.push(newComment);
    updateCommentList();
});

// Actualizar lista de comentarios
function updateCommentList() {
    const commentList = document.getElementById("comment-list");
    commentList.innerHTML = comments.length
        ? comments.map(comment => `<li><strong>${comment.name}</strong>: ${comment.text}</li>`).join("")
        : "<li>No hay comentarios aún.</li>";
}

// Función para filtrar productos por tipo
function filterProductsByType() {
    const type = document.getElementById("product-type").value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const productType = product.dataset.name.toLowerCase();
        if (type === "" || productType.includes(type)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Mostrar todos los productos al inicio
function showAllProducts() {
    const products = document.querySelectorAll(".product-card");
    products.forEach(product => {
        product.style.display = "block";
    });
}

// Mostrar productos al cargar la página
window.onload = showAllProducts;
