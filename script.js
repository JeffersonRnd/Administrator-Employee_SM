// Datos iniciales por categoría
const categories = {
    abarrotes: [
        { img: "", desc: "Producto 1 - Abarrotes", id: 1 },
        { img: "", desc: "Producto 2 - Abarrotes", id: 2 },
        { img: "", desc: "Producto 3 - Abarrotes", id: 3 },
    ],
    licores: [
        { img: "", desc: "Producto 1 - Licores", id: 4 },
        { img: "", desc: "Producto 2 - Licores", id: 5 },
        { img: "", desc: "Producto 3 - Licores", id: 6 },
    ],
    limpieza: [
        { img: "", desc: "Producto 1 - Limpieza", id: 7 },
        { img: "", desc: "Producto 2 - Limpieza", id: 8 },
        { img: "", desc: "Producto 3 - Limpieza", id: 9 },
    ],
    carnes: [
        { img: "", desc: "Producto 1 - Carnes", id: 10 },
        { img: "", desc: "Producto 2 - Carnes", id: 11 },
        { img: "", desc: "Producto 3 - Carnes", id: 12 },
    ],
    bebidas: [
        { img: "", desc: "Producto 1 - Bebidas", id: 13 },
        { img: "", desc: "Producto 2 - Bebidas", id: 14 },
        { img: "", desc: "Producto 3 - Bebidas", id: 15 },
    ],
    panaderia: [
        { img: "", desc: "Producto 1 - Panadería", id: 16 },
        { img: "", desc: "Producto 2 - Panadería", id: 17 },
        { img: "", desc: "Producto 3 - Panadería", id: 18 },
    ],
};

// Renderiza los productos de la categoría seleccionada
function filterCategory(category) {
    const container = document.getElementById("category-items");
    container.innerHTML = ""; // Limpia el contenido previo

    const items = categories[category];
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "image-item";
        div.innerHTML = `
            <img id="img-${item.id}" src="${item.img}" alt="${item.desc}" class="image">
            <input type="file" id="file-${item.id}" class="file-input" accept="image/*" onchange="previewImage(${item.id})">
            <textarea id="desc-${item.id}" class="description" placeholder="Descripción">${item.desc}</textarea>
            <button class="update-btn" onclick="updateItem(${item.id}, '${category}')">Actualizar Datos</button>
        `;
        container.appendChild(div);
    });
}

// Previsualiza la imagen seleccionada
function previewImage(id) {
    const fileInput = document.getElementById(`file-${id}`);
    const img = document.getElementById(`img-${id}`);

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Actualiza los datos del producto
function updateItem(id, category) {
    const imgSrc = document.getElementById(`img-${id}`).src;
    const description = document.getElementById(`desc-${id}`).value;

    const item = categories[category].find(item => item.id === id);
    if (item) {
        item.img = imgSrc;
        item.desc = description;
        alert("Datos actualizados correctamente!");
    }
}

// Función para abrir un modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
}

// Función para cerrar un modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Oculta el modal
        modal.style.display = "none"; 
    }
}

// Función para guardar los cambios 
function saveChanges() {
    alert("Cambios guardados correctamente.");
}

// Función para manejar el clic en el botón "Generar Reporte"
document.getElementById('generateReportBtn').addEventListener('click', function() {
    generateSalesReport();
});

function generateSalesReport() {
    const { jsPDF } = window.jspdf; 

    // Crear una instancia de jsPDF
    const doc = new jsPDF();

    // Obtener la fecha de hoy
    const today = new Date();
    const dateString = today.toLocaleDateString(); // Fecha en formato local (día/mes/año)

    // Posición inicial en Y
    let yPosition = 10;  

    // Título del reporte
    doc.setFontSize(18);
    doc.text(`REPORTE DE VENTAS DE HOY: ${dateString}`, 10, yPosition);
    yPosition += 10; 

    // Encabezados
    doc.setFontSize(12);
    doc.text('CATEGORIA-----------------------CANTIDAD COMPRADA--------------CANTIDAD PAGADA', 10, yPosition);
    yPosition += 10; 

    // Total de ventas acumuladas
    let totalVentas = 0; 

    for (let category in categories) {
        // Nombre de la categoría
        doc.setFontSize(12);
        doc.text(`\n${category.toUpperCase()}`, 10, yPosition);
        yPosition += 10;

        // Recorre los productos de cada categoría
        categories[category].forEach(item => {
            const cantidadComprada = Math.floor(Math.random() * 10) + 1; // Simula cantidad comprada (1-10)
            const cantidadPagada = cantidadComprada * (Math.random() * 50 + 1); // Simula la cantidad pagada

            // Agrega los datos del producto
            doc.setFontSize(10);
            doc.text(`${item.desc}-----------------------${cantidadComprada}-----------------------S/. ${cantidadPagada.toFixed(2)}`, 10, yPosition);
            yPosition += 6; // Espacio entre productos

            totalVentas += cantidadPagada; // Acumula el total de ventas
        });
    }

    // Total de ventas
    yPosition += 10;
    doc.setFontSize(12);
    doc.text(`TOTAL EN SOLES DE LAS VENTAS DE HOY (${dateString}) ES: S/. ${totalVentas.toFixed(2)}`, 10, yPosition);

    // Guarda el archivo PDF 
    doc.save('Reporte_ventas_RESAK.pdf');
}


// Cart state
let cartItems = [];

// Loading screen
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainContent').classList.remove('d-none');
    }, 2000);

    renderProducts();
    setupEventListeners();
});

// script.js
function setupEventListeners() {
    // ÍICONO DE CASA
    document.querySelector('.home-icon').addEventListener('click', () => {
        window.location.reload();
    });

    // ÍCONO DE USUARIO
    document.querySelector('.user-icon').addEventListener('click', () => {
        window.open('https://jeffersonrnd.github.io/LOG_SM/', '_blank');
    });
}

// Asegurarse de que el DOM esté listo antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {
    setupEventListeners();
});


// NOTIFICACIÓN
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function renderProducts(category) {
    const productsGrid = document.getElementById('productsGrid');
    
    // Filtrar productos según la categoría seleccionada
    const filteredProducts = products.filter(product => product.category === category);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h5>${product.name}</h5>
            <p>S/. ${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-outline-light btn-sm">
                <i class="bi bi-cart-plus"></i> Agregar al carrito
            </button>
        </div>
    `).join('');
}

function updateImage(imgId, fileId, descId) {
    const fileInput = document.getElementById(fileId);
    const imageElement = document.getElementById(imgId);
    const description = document.getElementById(descId);

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Establece la imagen cargada como fuente
            imageElement.src = e.target.result; 
        };
        reader.readAsDataURL(file);
    }

    // Actualiza la descripción
    description.value = description.value || "Descripción sin contenido";
}
