export function isOneOf(element, array) {
  return array.includes(element);
}

String.prototype.isOneOf = function(elements) {
  return elements.includes(this[0]);
};
