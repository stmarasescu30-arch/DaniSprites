// =====================================
// DaniSprites - Fondos
// =====================================

const gallery = document.getElementById("gallery");


// =====================================
// FILTRAR FONDOS
// =====================================

const fondosMostrar = fondos;

let temporadaActual = "todos";


// =====================================
// CREAR GALERÍA
// =====================================

function crearGaleria(lista = fondosMostrar) {

    gallery.innerHTML = "";

    if (lista.length === 0) {

        gallery.innerHTML = `

            <div class="no-favorites">

                <h2>🖼️ No hay fondos todavía</h2>

                <p>Próximamente añadiremos nuevos fondos.</p>

            </div>

        `;

        return;
    }

    lista.forEach(sprite => {

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
                            🤍
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

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos = favoritos.map(id => Number(id));

    document.querySelectorAll(".fav-btn").forEach(boton => {

        const id = Number(boton.dataset.id);

        if (favoritos.includes(id)) {
            boton.textContent = "❤️";
        }

        boton.addEventListener("click", () => {

            if (favoritos.includes(id)) {

                favoritos =
                    favoritos.filter(f => f !== id);

                boton.textContent = "🤍";

            } else {

                favoritos.push(id);

                boton.textContent = "❤️";

            }

            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );

        });

    });

}


// =====================================
// VISTA PREVIA
// =====================================

function iniciarVistaPrevia() {

    const preview =
        document.getElementById("preview");

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


    preview.addEventListener("click", e => {

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

            const enlace =
                document.createElement("a");

            enlace.href = boton.dataset.img;

            enlace.download = "";

            enlace.click();

        });

    });

}

// =====================================
// FILTROS DE TEMPORADA
// =====================================

function iniciarFiltros(){

    document.querySelectorAll(".filter-btn").forEach(boton => {

        boton.addEventListener("click", () => {

            temporadaActual = boton.dataset.season;

            document.querySelectorAll(".filter-btn").forEach(btn => {
                btn.classList.remove("active");
            });

            boton.classList.add("active");

            let resultados = fondosMostrar;

            if(temporadaActual !== "todos"){

                resultados = fondosMostrar.filter(sprite =>
                    sprite.temporada === temporadaActual
                );

            }

            crearGaleria(resultados);

            iniciarFavoritos();
            iniciarVistaPrevia();
            iniciarDescargas();

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

iniciarFiltros();