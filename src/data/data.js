/*const checker = function() {
  if (Object.keys(steps).map(x => x.indexOf("-") < 3)) {
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
            "IT-nombreEmpresa:Nombre de la empresa",
            "IT-nombreFiscal:Nombre fiscal",
            {
              C: {
                condition: "1",
                type: "Input",
                mode: "Text",
                code: "test",
                name: "tetfuij"
              }
            },
            "IT-condicionante:h fiscal"
          ]
        },
        {
          titledBox: [
            "Representante Legal",
            { H: ["IT-nombreRL:Nombre", "IT-ApellidosRL:Apellidos"] }
          ]
        },
        {
          titledBox: [
            "Centros de trabajo",
            "NXG:Los centros de trabajo estan definidos por: \n• Un código de cuenta de cotización (C.C.C.) \n• Un convenio colectivo",
            "IN-numeroCentros:Número de centros de trabajo",
            "DE-tabla1:Centros de trabajo"
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
            "TC:Centro de trabajo",
            "IT-nombreCentro:Nombre del centro de trabajo",
            "SXY-becarios:El centro tiene becarios?:becarios",
            "SXD-CoCo:Convenio colectivo:Y/N"
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
            "NXG:• lorem ipsum balbla\n • holi",
            "UCY-ITA:Fichero ITA"
          ]
        },
        {
          titledBox: [
            "ITA",
            "NXI:• lorem ipsum balbla\n • holi",
            { H: ["UCY-ITA:Fichero ITA", "UCD-ITA:Fichero ITA"] },
            { H: ["UXG-ITA:Fichero ITA", "UXK-ITA:Fichero ITA"] }
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
            "TC:Empleados",
            "EX-datosEmpleados:Datos de empleados",
            {
              H: [
                "IN-numEmpleadosTest:Número de empleados",
                "BL-crearTabla:Crear Tabla"
              ]
            },
            {
              H: [
                "IN-numEmpleados:Número de empleados",
                {
                  C: {
                    condition: "@numEmpleados",
                    type: "Button",
                    mode: "Label",
                    name: "tetfuij",
                    code: "botoncito"
                  }
                },
                {
                  C: {
                    condition: "1",
                    type: "Button",
                    mode: "Label",
                    name: "tetfuij",
                    code: "botoncito"
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

export const ops = {
  becarios: ["Centro con becarios", "Centro sin becarios"],
  "Y/N": ["Sí", "No"]
};
