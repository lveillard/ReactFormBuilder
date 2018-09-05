var steps = {
  Steps: [
    {
      ID: "0",
      name: "Información general",
      content: [
        {
          box: [
            "TT-001:Identificación de la empresa",
            "IS-002:NIF (CIF)",
            "IT-003:Nombre fiscal"
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
