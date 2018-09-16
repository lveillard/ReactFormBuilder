/*const checker = function() {
  if (Object.keys(steps).map(x => x.indexOf("@") < 3)) {
    alert("Bad constructed data.js");
  }
  if (Object.keys(steps).map(x => x.indexOf(":") < 3)) {
    alert("Bad constructed data.js");
  }
  alert("yay");
};
var a = checker;*/
import { tableFunctions } from "../aux/functions";

export const steps = {
  Steps: [
    {
      ID: "0",
      name: "Información general",
      icon: "fa fa-globe",
      content: [
        {
          titledBox: [
            "Identificación de la empresa",
            "ITX@nombreEmpresa··Nombre de la empresa··Winterfell Creations",

            {
              C: {
                condition: "1",
                type: "Input",
                mode: "Text",
                name: "holitas",
                code: "holi"
              }
            },
            "IT@nombreFiscal··Nombre fiscal",
            "IT@condicionante··h fiscal"
          ]
        },
        {
          titledBox: [
            "Representante Legal",
            { H: ["IT@nombreRL··Nombre", "IT@ApellidosRL··Apellidos"] }
          ]
        },
        {
          titledBox: [
            "Centros de trabajo",
            "NXG··Los centros de trabajo estan definidos por: \n• Un código de cuenta de cotización (C.C.C.) \n• Un convenio colectivo",
            "IN@numeroCentros··Número de centros de trabajo",
            "DE@tabla1··['holi','hola']··7",
            "DE@tabla2··['holi','hola']··7"
          ]
        }
      ]
    },
    {
      ID: "1",
      name: "Centro de trabajo",
      icon: "fa fa-building",
      content: [
        {
          box: [
            "TC··Centro de trabajo",
            "IT@nombreCentro··Nombre del centro de trabajo",
            "SXY@becarios··El centro tiene becarios?··becarios",
            "SXD@CoCo··Convenio colectivo··Y/N",
            "DE@tablita··['holi','hola']··7"
          ]
        }
      ]
    },
    {
      ID: "2",
      name: "Ficheros",
      icon: "fas fa-cloud-upload-alt",
      content: [
        {
          titledBox: [
            "ITA",
            "NXg·· lorem pistum balbla\n • holi",
            "UCY@ITA··Fichero ITA"
          ]
        },
        {
          titledBox: [
            "Otro tipo de ficheros",
            "NXI··lorem ipsum balbla\n • holi",
            { H: ["UCY@ITA··Fichero ITA", "UCD@ITA··Fichero ITA"] },
            { H: ["UXG@ITA··Fichero ITA", "UXK@ITA··Fichero ITA"] }
          ]
        }
      ]
    },
    {
      ID: "3",
      name: "Empleados",
      icon: "fa fa-users",
      content: [
        {
          box: [
            "TC··Empleados",
            "EX@datosEmpleados··Datos de empleados",

            {
              H: [
                {
                  C: {
                    condition: "1",
                    type: "Input",
                    props: { min: 0 },
                    name: "Número de empleados",
                    code: "numEmpleados",
                    mode: "number"
                  }
                },
                {
                  C: {
                    condition: "!@numEmpleados",
                    type: "Empty"
                  }
                },
                {
                  C: {
                    condition: "@numEmpleados",
                    type: "Button",
                    mode: "label",
                    name: "Crear tabla",
                    label: "debería cambiarse a sí mismo",
                    code: "modal",
                    function: "modal",
                    icon: "user-plus"
                  }
                }
              ]
            },
            {
              H: [
                "BL@crearTablaf··Este no tiene etiqueta··mentiras",
                "IN@numEmpleadostest··Número de empleados",

                {
                  C: {
                    condition: "1",
                    type: "Button",
                    mode: "label",
                    name: "Crear tabla",
                    label: "Esta tiene f test2",
                    code: "botoncito"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      ID: "4",
      name: "PlayGround",
      icon: "fa fa-building",
      content: [
        {
          box: [
            "TC··Centro de trabajo",
            "BLY@modalTest··Abrir modal··modalTest",

            {
              C: {
                condition: "1",
                type: "Button",
                mode: "label",
                name: "Abrir modal",
                label: "Esta tiene f test2",
                code: "pruebecita"
              }
            }
          ]
        }
      ]
    }
  ]
};

export const ops = {
  becarios: ["Centro con becarios", "Centro sin becarios"],
  "Y/N": ["Sí", "No"]
};

export const modals = {
  Modals: [
    {
      button: "modalTest",
      ID: 0,
      code: "modalTemp",
      width: "90%",
      title: "Centro de trabajo",
      content: [
        {
          noBox: [
            {
              H: [
                {
                  C: {
                    condition: "1",
                    type: "Button",
                    mode: "",
                    color: "warning",
                    name: "Añadir empleado",
                    code: "Badd",
                    icon: "user-plus",
                    function: "addColumn",
                    target: "employeeTable"
                  }
                },
                {
                  C: {
                    condition: "1",
                    type: "Printer",
                    mode: "button",
                    color: "gray",
                    expression: "@tabla1&&@tabla1[0].length + ' empleados'",
                    code: "Badd"
                  }
                },
                {
                  C: {
                    condition: "1",
                    type: "Button",
                    mode: "",
                    color: "danger",
                    name: "Eliminar ultimo empleado",
                    code: "Bremove",
                    icon: "user-minus"
                  }
                }
              ]
            },
            {
              C: {
                type: "Datasheet",
                rows: "5",
                code: "employeeTable",
                titles: [
                  "Nombre*",
                  "Apellidos*",
                  "Teléfono",
                  "Email personal*",
                  "Cuenta bancaria*",
                  "Saldo de vacaciones*",
                  "Fin de contrato temporal",
                  "¿No residente?",
                  "Fecha de nacimiento"
                ]
              }
            },
            {
              H: [
                {
                  C: {
                    type: "Message",
                    name: "¿Porqué usar el email personal eh?",
                    title: "Correo electrónico",
                    color: "",
                    mode: "bullets",
                    bullets: [
                      "El empleado recibirá las nóminas en este email",
                      "En caso de activación del espacio empleado, este será el email con el que el empleado pueda acceder"
                    ]
                  }
                },
                {
                  C: {
                    type: "Message",
                    name: "¿Porqué usar el email personal?",
                    title: "Correo electrónico",
                    color: "",
                    mode: "bullets",
                    bullets: [
                      "El empleado recibirá las nóminas en este email",
                      "En caso de activación del espacio empleado, este será el email con el que el empleado pueda acceder",
                      "De utilizar el email profesional, el empleado perderá el acceso a sus nóminas si finaliza la relación laboral"
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const funcs = {
  test: function(props) {
    console.log(props.line.name);
  },
  booleanState: props =>
    props.updateVarsMap(
      props.componente.code,
      !props.varsMap[props.componente.code]
    ),
  addColumn: function(a, b, c) {
    tableFunctions.addColumn(a, b, c);
  }
};
