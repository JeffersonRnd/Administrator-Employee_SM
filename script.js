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


function filterCategory(category) {
    const container = document.getElementById("category-items");
    container.innerHTML = "";

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

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

function saveChanges() {
    alert("Cambios guardados correctamente.");
}

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

    document.querySelector('.user-icon').addEventListener('click', () => {
        window.open('https://jeffersonrnd.github.io/LOG_SM/', '_blank');
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setupEventListeners();
});


function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}


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
            imageElement.src = e.target.result; 
        };
        reader.readAsDataURL(file);
    }

    description.value = description.value || "Descripción sin contenido";
}

