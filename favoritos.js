// =====================================
// DaniSprites - Favoritos
// =====================================

const gallery = document.getElementById("gallery");

// Leer favoritos
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Convertir los IDs a números
favoritos = favoritos.map(id => Number(id));

// Guardar favoritos normalizados
localStorage.setItem("favoritos", JSON.stringify(favoritos));


// =====================================
// CREAR GALERÍA
// =====================================

function crearGaleria() {

    gallery.innerHTML = "";

    // Buscar los espíritus favoritos
    const favoritosSprites = sprites.filter(sprite =>
        favoritos.includes(Number(sprite.id))
    );


    // Si no hay favoritos
    if (favoritosSprites.length === 0) {

        gallery.innerHTML = `

            <div class="no-favorites">

                <h2>❤️ No tienes favoritos todavía</h2>

                <p>Ve a Inicio y marca algunos espíritus.</p>

            </div>

        `;

        return;
    }


    // Crear tarjetas
    favoritosSprites.forEach(sprite => {

        gallery.innerHTML += `

            <div class="card">

                <img src="${sprite.imagen}" alt="${sprite.nombre}">

                <div class="card-info">

                    <h3>${sprite.nombre}</h3>

                    <p>${sprite.categoria}</p>

                    <div class="card-actions">

                        <button
                            class="fav-btn"
                            data-id="${sprite.id}">
                            ❤️
                        </button>

                        <button
                            class="preview-btn"
                            data-img="${sprite.imagen}">
                            👁️
                        </button>

                    </div>

                    <button
                        class="download-btn"
                        data-img="${sprite.imagen}">
                        ⬇ Descargar
                    </button>

                </div>

            </div>

        `;

    });

}


// =====================================
// FAVORITOS
// =====================================

function iniciarFavoritos() {

    document.querySelectorAll(".fav-btn").forEach(boton => {

        boton.addEventListener("click", () => {

            const id = Number(boton.dataset.id);

            favoritos = favoritos.filter(f => f !== id);

            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );

            crearGaleria();

            iniciarFavoritos();
            iniciarVistaPrevia();
            iniciarDescargas();

        });

    });

}


// =====================================
// VISTA PREVIA
// =====================================

function iniciarVistaPrevia() {

    const preview = document.getElementById("preview");

    const previewImage =
        document.getElementById("previewImage");

    const cerrar =
        document.getElementById("closePreview");


    document.querySelectorAll(".preview-btn").forEach(boton => {

        boton.addEventListener("click", () => {

            previewImage.src = boton.dataset.img;

            preview.style.display = "flex";

        });

    });


    cerrar.addEventListener("click", () => {

        preview.style.display = "none";

    });


    preview.addEventListener("click", (e) => {

        if (e.target === preview) {

            preview.style.display = "none";

        }

    });

}


// =====================================
// DESCARGAS
// =====================================

function iniciarDescargas() {

    document.querySelectorAll(".download-btn").forEach(boton => {

        boton.addEventListener("click", () => {

            const enlace = document.createElement("a");

            enlace.href = boton.dataset.img;

            enlace.download = "";

            enlace.click();

        });

    });

}


// =====================================
// INICIAR
// =====================================

crearGaleria();

iniciarFavoritos();

iniciarVistaPrevia();

iniciarDescargas();