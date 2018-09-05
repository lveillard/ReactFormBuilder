var steps = {
  Steps: [
    {
      ID: "0",
      name: "Información general",
      icon: "fa fa-globe",
      content: [
        {
          box: [
            "TT:Identificación de la empresa",
            "IS-nif:NIF (CIF)",
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
            "IN-CCC:C.C.C. Principal",
            "ST-CoCo:Convenio colectivo"
          ]
        }
      ]
    }
  ]
};
export default steps;
