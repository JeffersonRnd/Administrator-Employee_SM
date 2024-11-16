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


function setupEventListeners() {
    // Home icon - reload page
    document.querySelector('.home-icon').addEventListener('click', () => {
        window.location.reload();
    });

    // User icon
    document.querySelector('.user-icon').addEventListener('click', () => {
        window.open('https://jeffersonrnd.github.io/LOG_SM/', '_blank');
    });
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

// Renderiza una categoría inicial por defecto
//filterCategory("abarrotes");

// Función para abrir un modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex"; // Muestra el modal como flexbox
    }
}

// Función para cerrar un modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none"; // Oculta el modal
    }
}

// Función para guardar los cambios (puedes personalizarla según las necesidades)
function saveChanges() {
    alert("Cambios guardados correctamente.");
}
// Función para manejar el clic en el botón "Generar Reporte"
document.getElementById('generateReportBtn').addEventListener('click', function() {
    alert('Se ha generado correctamente el reporte.');
});

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

function setupEventListeners() {
    // Home icon - reload page
    document.querySelector('.home-icon').addEventListener('click', () => {
        window.location.reload();
    });

    // User icon - go to YouTube
    document.querySelector('.user-icon').addEventListener('click', () => {
        window.open('https://www.youtube.com', '_blank');
    });

    // Category buttons
    document.querySelectorAll('.category-buttons .btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-buttons .btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            const category = button.textContent.trim(); // Obtener el nombre de la categoría
            renderProducts(category); // Llamar a la función con la categoría seleccionada
        });
    });
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({...product, quantity: 1});
    }
    
    showToast('Producto agregado correctamente');
    updateCartModal();
}

function processPay() {
    cartItems = [];
    updateCartModal();
    showToast('¡Pago realizado con éxito!');
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    modal.hide();
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
            imageElement.src = e.target.result; // Establece la imagen cargada como fuente
        };
        reader.readAsDataURL(file);
    }

    // Actualiza la descripción
    description.value = description.value || "Descripción sin contenido";
}

