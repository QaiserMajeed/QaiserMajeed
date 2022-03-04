const axios = require("axios");
const hook = "https://hooks.zapier.com/hooks/catch/4559853/b6u91yw/";

/**
 *
 * @param { object } data
 * @return { bool }
 */
const sendPulseToZapier = (d) => {
  if (!d) return null;
  console.log(d);
  const webhookData = {
    first_name: d.first_name,
    last_name: d.last_name,
    email: d.email,
    createdAt: d.createdAt,
    //Stress
    stresswe:
      5 * (d.SW1P + Math.abs(d.SW2N - 7) + d.SW3P + Math.abs(d.SW4N - 7) - 4),
    stressrel:
      5 * (d.SR1P + Math.abs(d.SR2N - 7) + d.SR4P + Math.abs(d.SR3N - 7) - 4),
    stressfs:
      5 * (d.SF2P + Math.abs(d.SF1N - 7) + d.SF3P + Math.abs(d.SF4N - 7) - 4),
    stressmw:
      5 * (d.SM1P + Math.abs(d.SM2N - 7) + d.SM4P + Math.abs(d.SM3N - 7) - 4),
    //Energy
    energym:
      5 * (d.EM1P + Math.abs(d.EM2N - 7) + d.EM3P + Math.abs(d.EM4N - 7) - 4),
    energyem:
      5 * (d.EE1P + Math.abs(d.EE2N - 7) + d.EE3P + Math.abs(d.EE4N - 7) - 4),
    energyre:
      5 * (d.ER1P + Math.abs(d.ER2N - 7) + d.ER3P + Math.abs(d.ER4N - 7) - 4),
    energyph:
      5 * (d.EP1P + Math.abs(d.EP2N - 7) + d.EP3P + Math.abs(d.EP4N - 7) - 4),
    //Work Alignment
    workstr:
      5 * (d.WS1P + Math.abs(d.WS2N - 7) + d.WS3P + Math.abs(d.WS4N - 7) - 4),
    workpa:
      5 * (d.WP1P + Math.abs(d.WP2N - 7) + d.WP3P + Math.abs(d.WP4N - 7) - 4),
    workval:
      5 * (d.WV1P + Math.abs(d.WV2N - 7) + d.WV3P + Math.abs(d.WV4N - 7) - 4),
    workgo:
      5 * (d.WG1P + Math.abs(d.WG2N - 7) + d.WG3P + Math.abs(d.WG4N - 7) - 4),
    //Life Alignment
    lifestr:
      5 * (d.LS1P + Math.abs(d.LS2N - 7) + d.LS3P + Math.abs(d.LS4N - 7) - 4),
    lifepa:
      5 * (d.LP1P + Math.abs(d.LP2N - 7) + d.LP3P + Math.abs(d.LP4N - 7) - 4),
    lifeval:
      5 * (d.LV1P + Math.abs(d.LV2N - 7) + d.LV3P + Math.abs(d.LV4N - 7) - 4),
    lifego:
      5 * (d.LG1P + Math.abs(d.LG2N - 7) + d.LG3P + Math.abs(d.LG4N - 7) - 4),
    //Fulfillment
    fulfillmentrel:
      5 * (d.FS1P + Math.abs(d.FS2N - 7) + d.FS3P + Math.abs(d.FS4N - 7) - 4),
    fulfillmentmi:
      5 * (d.FI1P + Math.abs(d.FI2N - 7) + d.FI3P + Math.abs(d.FI4N - 7) - 4),
    fulfillmentmo:
      5 * (d.FO1P + Math.abs(d.FO2N - 7) + d.FO3P + Math.abs(d.FO4N - 7) - 4),
    fulfillmentrw:
      5 * (d.FW1P + Math.abs(d.FW2N - 7) + d.FW3P + Math.abs(d.FW4N - 7) - 4),
    //Impact
    impactfam:
      5 * (d.IA1P + Math.abs(d.IA2N - 7) + d.IA3P + Math.abs(d.IA4N - 7) - 4),
    impactfr:
      5 * (d.IR1P + Math.abs(d.IR2N - 7) + d.IR3P + Math.abs(d.IR4N - 7) - 4),
    impactc:
      5 * (d.IJ1P + Math.abs(d.IJ2N - 7) + d.IJ3P + Math.abs(d.IJ4N - 7) - 4),
    impactcc:
      5 * (d.IC1P + Math.abs(d.IC2N - 7) + d.IC3P + Math.abs(d.IC4N - 7) - 4),
  };

  const hook = "https://hooks.zapier.com/hooks/catch/4559853/b1vpgda/";
  axios
    .post(hook, {
      data: webhookData,
    })
    .then((res) => {
      console.log(res.status);
    })
    .catch((error) => {
      console.error(error);
    });
  return true;
};

module.exports = {
  sendPulseToZapier,
};
