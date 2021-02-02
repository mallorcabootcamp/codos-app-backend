export const switchDataToGet = (user: string, dataToGet: string) => {
  switch (dataToGet) {
    case "co2":
      return user === "@Andreas_IBZ" ? "CO2[ppm]" : "eCO2[ppm]";
    case "temperature":
      return user === "@Andreas_IBZ" ? "T_BME[°C]" : "T[°C]";
    case "humidity":
      return "rH[o/o]";
    default:
      return "eCO2[ppm]";
  }
};
