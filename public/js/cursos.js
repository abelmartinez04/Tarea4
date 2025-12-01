document.addEventListener("DOMContentLoaded", () => {
  cargarCursos();

  document.getElementById("btn-nuevo").addEventListener("click", () => {
    abrirFormulario();
  });
});

function cargarCursos() {
  fetch("/cursos/listar")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#tabla-cursos tbody");
      tbody.innerHTML = "";

      data.data.forEach(curso => {
        tbody.innerHTML += `
          <tr>
            <td>${curso.id}</td>
            <td>${curso.nombre}</td>
            <td>${curso.duracion}</td>
            <td>${curso.instructor}</td>
            <td>$${curso.precio}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editar(${curso.id})">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="eliminar(${curso.id})">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        `;
      });
    });
}

function abrirFormulario(id = null) {

  let popup = alertify.alert(); // Guardamos instancia para cerrarla después

  popup.set({
    title: id ? "Editar Curso" : "Nuevo Curso",
    message: `
      <form id="form-curso">
        <div class="mb-2">
          <label class="form-label">Nombre</label>
          <input name="nombre" class="form-control" required>
        </div>

        <div class="mb-2">
          <label class="form-label">Duración (hrs)</label>
          <input name="duracion" type="number" class="form-control" required>
        </div>

        <div class="mb-2">
          <label class="form-label">Instructor</label>
          <input name="instructor" class="form-control" required>
        </div>

        <div class="mb-2">
          <label class="form-label">Precio</label>
          <input name="precio" type="number" step="0.01" class="form-control" required>
        </div>

        <button type="button" id="btn-guardar-curso" class="btn btn-success w-100 mt-2">
          ${id ? "Guardar cambios" : "Crear Curso"}
        </button>
      </form>
    `,
    onshow: async function () {

      // Si es EDITAR → cargamos los datos
      if (id) {
        const res = await fetch(`/cursos/buscar/${id}`);
        const { data } = await res.json();

        document.querySelector("input[name=nombre]").value = data.nombre;
        document.querySelector("input[name=duracion]").value = data.duracion;
        document.querySelector("input[name=instructor]").value = data.instructor;
        document.querySelector("input[name=precio]").value = data.precio;
      }

      // Guardar o editar
      document.getElementById("btn-guardar-curso").onclick = async function () {

        const form = document.getElementById("form-curso");
        const datos = Object.fromEntries(new FormData(form));

        const url = id ? `/cursos/editar/${id}` : "/cursos/crear";
        const method = id ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos)
        });

        const json = await res.json();

        if (json.success) {
          alertify.success(json.message);

          cargarCursos(); // Actualizar tabla

          popup.close(); // 🔥 Cierra el Alertify correctamente
        } else {
          alertify.error("Error al guardar");
        }
      };
    }
  }).show();
}


function editar(id) {
  abrirFormulario(id);
}


function eliminar(id) {
  alertify.confirm(
    "Eliminar Curso",
    "¿Seguro que deseas eliminar este curso?",
    async function () {
      const res = await fetch(`/cursos/eliminar/${id}`, {
        method: "DELETE"
      });

      const json = await res.json();

      if (json.success) {
        alertify.success("Curso eliminado");
        cargarCursos();
      } else {
        alertify.error("Error al eliminar");
      }
    },
    function () {
      alertify.error("Cancelado");
    }
  );
}
