//Funcion constructora que crea objetos Paciente
function Paciente(nombre, edad, rut, diagnostico) {
  // variables privadas para las propiedades
  let _nombre = nombre;
  let _edad = edad;
  let _rut = rut;
  let _diagnostico = diagnostico;

  // Definir múltiples propiedades con getters y setters
  Object.defineProperties(this, {
    nombre: {
      get: function() {
        return _nombre;
      },
      set: function(nuevoNombre) {
        _nombre = nuevoNombre;
      }
    },
    edad: {
      get: function() {
        return _edad;
      },
      set: function(nuevaEdad) {
        _edad = nuevaEdad;
      }
    },
    rut: {
      get: function() {
        return _rut;
      },
      set: function(nuevoRut) {
        _rut = nuevoRut;
      }
    },
    diagnostico: {
      get: function() {
        return _diagnostico;
      },
      set: function(nuevoDiagnostico) {
        _diagnostico = nuevoDiagnostico;
      }
    }
  });
}

Paciente.prototype.getDatosPaciente = function() {
  return {
    nombre: this.nombre,
    edad: this.edad,
    rut: this.rut,
    diagnostico: this.diagnostico
  };
}

Paciente.prototype.setDatosPaciente = function(nombre, edad, rut, diagnostico) {
  this.nombre = nombre;
  this.edad = edad;
  this.rut = rut;
  this.diagnostico = diagnostico;
}

//-----------------

//Funcion constructora que crea objetos Consultorio
function Consultorio(nombre, paciente) {
  //variables privadas
  let _nombre = nombre
  let _pacientes = [paciente] //lista de pacientes

  // Getter y Setter para nombre
  Object.defineProperty(this, "nombre", {
    get: function() {
      return _nombre;
    },
    set: function(nuevoNombre) {
      _nombre = nuevoNombre;
    }
  });

  // Getter y Setter para pacientes
  Object.defineProperty(this, "pacientes", {
    get: function() {
      return _pacientes;
    },
    set: function(nuevoPaciente) {
      _pacientes.push(nuevoPaciente) //agrega nuevos pacientes a _pacientes
    }
  });
}

Consultorio.prototype.getDatosConsultorio = function() {
  return {
    nombre: this.nombre,
    pacientes: this.pacientes //lista de pacientes
  };
}

Consultorio.prototype.setDatosConsultorio = function(nombre, paciente) {
  this.nombre = nombre;
  this.pacientes = paciente;
}

//----- Creando Paciente ------
let paciente1 = new Paciente("Victoria", 27, "987654321", "Estresada")

//------ Creando Consultorio ------
let consultorio = new Consultorio("Playa Ancha", paciente1);

//---- Agregando nuevos pacientes a consultorio ----
let paciente2 = new Paciente("César", 28, "9911223344", "Aburrido")
let paciente3 = new Paciente("Marcela", 55, "123456789", "Cansada")
consultorio.pacientes = paciente2;
consultorio.pacientes = paciente3;

//----- Verificar datos del consultorio -------
console.log(consultorio.getDatosConsultorio());

// Función para mostrar la lista de pacientes en el HTML
function mostrarPacientes(pacientes) {
  let listaPacientes = document.getElementById("listaPacientes");
  listaPacientes.innerHTML = ""; // Limpiar la lista antes de mostrar

  //itera sobre la lista consultorio.pacientes
  pacientes.forEach(element => {
    listaPacientes.innerHTML += `
    <li>${element.nombre} | ${element.edad} | ${element.rut} | ${element.diagnostico}</li>
    `
  });
}

// Mostrar todos los pacientes al cargar la página
mostrarPacientes(consultorio.pacientes);

// Función para filtrar la lista de pacientes por nombre
function filtrarPacientes() {
  //valor ingresado por el usuario
  let filtroNombre = document.getElementById("filtroNombre").value.toLowerCase();
  
  //Filtra los pacientes que tienen el texto ingresado en el input
  let pacientesFiltrados = consultorio.pacientes.filter(paciente => 
    paciente.nombre.toLowerCase().includes(filtroNombre)
  );
  
  //llama la funcion mostrarpacientes y le pasa la lista filtrada
  mostrarPacientes(pacientesFiltrados);
}