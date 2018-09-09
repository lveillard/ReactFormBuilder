export const steps = {
  Steps: [
    {
      ID: "0",
      name: "Información general",
      icon: "fa fa-globe",
      content: [
        {
          box: [
            "TT:Identificación de la empresa",
            "IT-nombreFiscal:Nombre fiscal"
          ]
        },
        {
          box: [
            "TT:Representante Legal",
            { H: ["IS-nombreRL:Nombre", "IS-ApellidosRL:Apellidos"] }
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
            "TT:Centro de trabajo",
            "IT-nombreCentro:Nombre del centro de trabajo",
            "SN-becarios:El centro tiene becarios?:becarios",
            "ST-CoCo:Convenio colectivo:Y/N"
          ]
        }
      ]
    },
    {
      ID: "2",
      name: "Empleados",
      icon: "fa fa-users",
      content: [
        {
          box: ["TT:Empleados", "M-datosEmpleados:Datos de empleados"]
        }
      ]
    }
  ]
};

export const ops = {
  becarios: ["Centro con becarios", "Centro sin becarios"],
  "Y/N": ["Sí", "No"]
};
