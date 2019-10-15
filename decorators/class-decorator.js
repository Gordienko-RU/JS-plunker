function callLogger(constructorF) {
  return function(...args) {
    console.log(`instance of ${constructorF.name} created`);
    return constructorF(...args);
  }
}

@callLogger
class Box {}
