const isPercent = (value: string) => /((-)?\d+\.?\d*)%/g.exec(value);

const matchPercent = (value: string) => {
  const match = isPercent(value);

  if (match) {
    const value = parseFloat(match[1]);
    const percent = value / 100;

    return {
      value,
      percent,
      absValue: Math.abs(value),
      absPercent: Math.abs(percent)
    };
  }

  return null;
};

export default matchPercent;
