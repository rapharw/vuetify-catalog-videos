const jsonValidator = {
  validateSchema(schema, value) {
    var Ajv = require("ajv");
    var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

    var validate = ajv.compile(schema);
    return validate(value);
  }
};

export default jsonValidator;
