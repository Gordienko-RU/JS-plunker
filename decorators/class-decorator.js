function protectFromWrite(target) {
  target.elements.forEach(({ descriptor }) => descriptor.writable = false);
}

module.exports = {
  protectFromWrite,
}
