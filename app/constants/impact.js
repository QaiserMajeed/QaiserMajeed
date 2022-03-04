const completed = 'completed';

const lifePurpose = {
  completed,
  year: 'year',
  city: 'city',
  familyClass: 'familyClass',
  familyRelations: 'familyRelations',
  immediateFamily: 'immediateFamily',
  college: 'college',
  major: 'major',
  industry: 'industry',
  position: 'position',
  childLove: 'childLove',
  career: 'career',
  momInspired: 'momInspired',
  momTaught: 'momTaught',
  dadInspired: 'dadInspired',
  dadTaught: 'dadTaught',
  parentsLesson: 'parentsLesson',
  adultDecision: 'adultDecision',
  adversity: 'adversity',
  talent1: 'talent1',
  talent2: 'talent2',
  talent3: 'talent3',
  teachAbout: 'teachAbout',
  improveArea: 'improveArea',
  mainPassion: 'mainPassion',
  passion1: 'passion1',
  passion2: 'passion2',
  passion3: 'passion3',
  peopleHelp: 'peopleHelp',
  helpReason: 'helpReason',
  purposeVerb: 'purposeVerb',
  purposeComponent: 'purposeComponent',
  purposeStatement: 'purposeStatement',
  purposeOutcome: 'purposeOutcome',
  purposeFinal: 'purposeFinal',
  feedbackRate: 'feedbackRate',
  teamFeedback: 'teamFeedback',
};

const promiseStatements = {
  promiseVerb: 'promiseVerb',
  promiseComponent: 'promiseComponent',
  finalPromise: 'finalPromise',
  completed,
};

module.exports = {
  fields: {
    ...lifePurpose,
    ...promiseStatements,
    completed,
  },
  lifePurpose,
  promiseStatements,
  completed,
  steps: {
    lifePurpose: 'lifePurpose',
    promiseStatements: 'promiseStatements',
    completed: 'completed',
  },
};
