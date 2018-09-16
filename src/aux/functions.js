export function isOneOf(element, array) {
  return array.includes(element);
}

String.prototype.isOneOf = function(elements) {
  return elements.includes(this[0]);
};

export var mySandbox = new Components.utils.Sandbox("http://www.example.com/");
mySandbox.y = 5; // insert property 'y' with value 5 into global scope.
mySandbox.double = double;
var result = Components.utils.evalInSandbox(
  "x = y + 2; double(x) + 3",
  mySandbox
);

console.log(result); // 17
console.log(mySandbox.x); //  7

//dangerously doing some eval that can contain user input ⚠
export function checkCondition(condition) {
  if (condition != undefined) {
    //console.log(componente["condition"]);
    var conditionReady = condition.replace(
      /(\@)(\w*)/g,
      "this.props.varsMap.$2"
    );
    var conditionResult = eval(conditionReady);
    //console.log(conditionResult + " que viene de " + conditionReady);
    return conditionResult;
  } else {
    return "holi";
  }
}
