export function isOneOf(element, array) {
  return array.includes(element);
}

String.prototype.isOneOf = function(elements) {
  return elements.includes(this[0]);
};

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
