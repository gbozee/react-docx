const parseValue = (value: string) => {
  const match = /^(-?\d*\.?\d+)(in|mm|cm|pt)?$/g.exec(value);

  if (match) {
    return { value: parseFloat(match[1]), unit: match[2] || 'pt' };
  } else {
    return { value, unit: undefined };
  }
};

const parseScalar = (value: string) => {
  let result = {};
  const scalar = parseValue(value);

  switch (scalar.unit) {
    case 'in':
      result = scalar.value * 72;
      break;
    case 'mm':
      result = scalar.value * (1 / 25.4) * 72;
      break;
    case 'cm':
      result = scalar.value * (1 / 2.54) * 72;
      break;
    default:
      result = scalar.value;
  }

  return result;
};

export default parseScalar;
