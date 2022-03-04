const IndividualEpa = require('../../models/IndividualEpa');

exports.getResult = (formResponse) => {
  const { answers } = formResponse;
  const results = new IndividualEpa();

  results.name = answers['0'].text;
  results.email = answers['1'].email;
  results.company = answers['3'].text;
  results.role = answers['4'].text;
  results.team = answers['5'].text;
  results.registration_code = formResponse.hidden.registrationcode;
  // stress
  results.stresswe = answers['93'].number
    + Math.abs(answers['97'].number - 7)
    + answers['79'].number
    + Math.abs(answers['53'].number - 7);
  results.stressrel = answers['18'].number
    + Math.abs(answers['11'].number - 7)
    + answers['42'].number
    + Math.abs(answers['80'].number - 7);
  results.stressfs = answers['72'].number
    + Math.abs(answers['89'].number - 7)
    + answers['40'].number
    + Math.abs(answers['44'].number - 7);
  results.stressmw = answers['82'].number
    + Math.abs(answers['23'].number - 7)
    + answers['90'].number
    + Math.abs(answers['55'].number - 7);
  results.stress = results.stresswe + results.stressrel + results.stressfs + results.stressmw;
  // Energy Efficiency
  results.energym = answers['71'].number
    + Math.abs(answers['14'].number - 7)
    + answers['46'].number
    + Math.abs(answers['6'].number - 7);
  results.energyem = answers['13'].number
    + Math.abs(answers['83'].number - 7)
    + answers['56'].number
    + Math.abs(answers['76'].number - 7);
  results.energyre = answers['58'].number
    + Math.abs(answers['98'].number - 7)
    + answers['75'].number
    + Math.abs(answers['91'].number - 7);
  results.energyph = answers['30'].number
    + Math.abs(answers['26'].number - 7)
    + answers['31'].number
    + Math.abs(answers['73'].number - 7);
  results.energy = results.energym + results.energyem + results.energyre + results.energyph;
  // Work Alignment
  results.workstr = answers['99'].number
    + Math.abs(answers['50'].number - 7)
    + answers['74'].number
    + Math.abs(answers['86'].number - 7);
  results.workval = answers['38'].number
    + Math.abs(answers['67'].number - 7)
    + answers['33'].number
    + Math.abs(answers['43'].number - 7);
  results.workpa = answers['61'].number
    + Math.abs(answers['63'].number - 7)
    + answers['59'].number
    + Math.abs(answers['9'].number - 7);
  results.workgo = answers['28'].number
    + Math.abs(answers['57'].number - 7)
    + answers['21'].number
    + Math.abs(answers['7'].number - 7);
  results.work = results.workstr + results.workval + results.workpa + results.workgo;
  // Life Alignment
  results.lifestr = answers['24'].number
    + Math.abs(answers['101'].number - 7)
    + answers['52'].number
    + Math.abs(answers['78'].number - 7);
  results.lifeval = answers['19'].number
    + Math.abs(answers['39'].number - 7)
    + answers['34'].number
    + Math.abs(answers['92'].number - 7);
  results.lifepa = answers['36'].number
    + Math.abs(answers['88'].number - 7)
    + answers['10'].number
    + Math.abs(answers['60'].number - 7);
  results.lifego = answers['85'].number
    + Math.abs(answers['20'].number - 7)
    + answers['8'].number
    + Math.abs(answers['100'].number - 7);
  results.life = results.lifestr + results.lifeval + results.lifepa + results.lifego;
  // Personal Fulfillment
  results.fulfillmentrel = answers['87'].number
    + Math.abs(answers['84'].number - 7)
    + answers['64'].number
    + Math.abs(answers['37'].number - 7);
  results.fulfillmentmi = answers['22'].number
    + Math.abs(answers['29'].number - 7)
    + answers['12'].number
    + Math.abs(answers['35'].number - 7);
  results.fulfillmentmo = answers['49'].number
    + Math.abs(answers['51'].number - 7)
    + answers['15'].number
    + Math.abs(answers['41'].number - 7);
  results.fulfillmentrw = answers['16'].number
    + Math.abs(answers['94'].number - 7)
    + answers['27'].number
    + Math.abs(answers['81'].number - 7);
  results.fulfillment = results.fulfillmentrel
    + results.fulfillmentmi
    + results.fulfillmentmo
    + results.fulfillmentrw;
  // Lasting Impact
  results.impactfam = answers['45'].number
    + Math.abs(answers['65'].number - 7)
    + answers['25'].number
    + Math.abs(answers['32'].number - 7);
  results.impactfr = answers['96'].number
    + Math.abs(answers['48'].number - 7)
    + answers['66'].number
    + Math.abs(answers['70'].number - 7);
  results.impactc = answers['62'].number
    + Math.abs(answers['68'].number - 7)
    + answers['77'].number
    + Math.abs(answers['95'].number - 7);
  results.impactcc = answers['69'].number
    + Math.abs(answers['17'].number - 7)
    + answers['54'].number
    + Math.abs(answers['47'].number - 7);
  results.impact = results.impactfam + results.impactfr + results.impactc + results.impactcc;

  return results;
};
