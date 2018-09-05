var steps = {
  Steps: [
    {
      ID: "0",
      name: "Información general",
      content: [
        {
          box: [
            "TT:Identificación de la empresa",
            "IS:NIF (CIF)",
            "IT:nombre_fiscal"
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
    { ID: "1", name: "Centro de trabajo", content: ["title"] }
  ]
};
export default steps;
