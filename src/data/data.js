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
            "IT@nombreEmpresa··Nombre de la empresa",
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
            "DE@tabla1··Centros de trabajo"
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
            "SXD@CoCo··Convenio colectivo··Y/N"
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
                "IN@numEmpleados··Número de empleados",
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
                    mode: "Label",
                    name: "Crear tabla",
                    label: "debería cambiarse a sí mismo",
                    code: "modal",
                    function: "modal"
                  }
                }
              ]
            },
            {
              H: [
                "BL@crearTablaf··Este no tiene etiqueta",
                "IN@numEmpleadostest··Número de empleados",

                {
                  C: {
                    condition: "1",
                    type: "Button",
                    mode: "Label",
                    name: "Crear tabla",
                    label: "Esta tiene f test2",
                    code: "botoncito",
                    props: { min: "7" }
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
                mode: "Label",
                name: "Abrir modal",
                label: "Esta tiene f test2",
                code: "pruebecita",
                props: { min: "7" }
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
      width: "50%",
      title: "Centro de trabajo",
      content: [
        {
          noBox: [
            "IT@nombreCentro··Nombre del centro de trabajo",
            "SXY@becarios··El centro tiene becarios?··becarios",
            "SXD@CoCo··Convenio colectivo··Y/N"
          ]
        }
      ]
    }
  ]
};

export const funcs = {
  booleanState: props =>
    props.updateVarsMap(
      props.componente.code,
      !props.varsMap[props.componente.code]
    )
};
