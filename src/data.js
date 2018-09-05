var steps = {
  Steps: [
    {
      ID: "0",
      name: "Información general",
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
            { H: ["IS:Nombre", "IS:Apellidos"] },
            "WR"
          ]
        }
      ]
    },
    {
      ID: "1",
      name: "Centro de trabajo",
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
            { H: ["IS:Nombre", "IS:Apellidos"] },
            "WR"
          ]
        }
      ]
    }
  ]
};
export default steps;
