const ListaDeTareas = document.querySelector("#lista");
const tareaInput = document.querySelector("#caja-agregar");
const btnAgregarTarea = document.querySelector("#boton-agregar");
const cuentaTotal = document.querySelector("#total");
const cuentaRealizadas = document.querySelector("#realizadas");

/*console.log(ListaDeTareas);
console.log(tareaInput);
console.log(btnAgregarTarea);*/

const lista = [
  { id: "1", item: "1", tarea: "Lavar la ropa" },
  { id: "2", item: "2", tarea: "Hacer Mercado" },
  { id: "3", item: "3", tarea: "Estudiar para Examen" },
];

render();

btnAgregarTarea.addEventListener("click", () => {
  const nuevaTarea = {
    id: Date.now(),
    item: lista.length + 1,
    tarea: tareaInput.value,
    estatus: false,
  };
  lista.push(nuevaTarea); //hacer push de lo que se agregue en input//
  tareaInput.value = ""; //reinicia input//

  render();
});

function render() {
  let html = ""; //declarar el html como cadena vacia//

  let totalTareas = lista.length;
  let tareasRealizadas = lista.filter((tarea) => tarea.realizada).length;

  for (const iterator of lista) {
    html += `
    <tr>
    <td>${iterator.item}</td>
    <td>${iterator.tarea}</td>
    <td><input type="checkbox" onclick="marcar(${iterator.id}, this.checked)" ${
      iterator.realizada ? "checked" : ""
    }></td>
    <td><button onclick="borrar (${iterator.id})"> </button></td>
    </tr>`;
  }

  ListaDeTareas.innerHTML = html;
  cuentaTotal.textContent = totalTareas;
  cuentaRealizadas.textContent = tareasRealizadas;

  const botones = document.querySelectorAll("#lista button");
  botones.forEach((boton) => {
    const icono = document.createElement("i");
    icono.classList.add("fa-solid", "fa-trash-can");
    boton.appendChild(icono);
  });
}

function marcar(id, realizada) {
  const tarea = lista.find((e) => e.id == id);
  tarea.realizada = realizada;

  render();
}

function borrar(id) {
  const index = lista.findIndex((e) => e.id == id);
  let borrado = lista.splice(index, 1);

  render();
}
