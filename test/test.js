const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const { impact, align, purpose, grow, growResult } = require('../app/constants/test');

describe('main', () => {
  let authToken;
  const user = {
    password: null,
    email: 'test@gmail.com',
    firstName: 'test',
    lastName: 'test',
    advCode: null,
  };
  describe('SuperAdmin', () => {
    it('login', (done) => {
      request(app)
        .post('/api/auth/login/')
        .send({
          email: 'test@gmail.com',
          password: 'qwer1234'
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          authToken = body.payload.user.tokens.pop().token;
          done();
        });
    });
  });
  describe('Profile', () => {
    let profiles = [];
    it('Get profiles', (done) => {
      request(app)
        .get('/api/superadmin/profile/all')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(Array.isArray(body.payload.items));
          profiles = body.payload.items;
          assert(profiles.length);
          done();
        });
    });
    it('Get profile by id', (done) => {
      request(app)
        .get(`/api/superadmin/profile/${profiles[0]._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
  });
  describe('Code', () => {
    it('Get registration code', (done) => {
      request(app)
        .get('/api/code/generate')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.code);
          user.advCode = body.payload.code;
          done();
        });
    });
    it('Confirm registration code', (done) => {
      request(app)
        .get(`/api/code/check?code=${user.advCode}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.unique);
          done();
        });
    });
    it('Generate password', (done) => {
      request(app)
        .get('/api/auth/generate-password/')
        .send({
          email: 'testuser@gmail.com',
          password: 'qwer1234'
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.password);
          user.password = body.payload.password;
          done();
        });
    });
  });

  describe('Impact', () => {
    const lifePurposeValue = 'London';
    const promiseStatementsValue = 'test';
    const impactCompleted = true;
    const impactUrl = '/api/impact';

    it('Create impact', (done) => {
      request(app)
        .post(impactUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send(impact)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get impact', (done) => {
      request(app)
        .get(impactUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get impact life purpose', (done) => {
      request(app)
        .get(`${impactUrl}/life-purpose`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get impact promise statements', (done) => {
      request(app)
        .get(`${impactUrl}/promise-statements`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Change impact life purse', (done) => {
      request(app)
        .put(impactUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          step: 'lifePurpose',
          field: 'city',
          value: lifePurposeValue,
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Change impact promise statements', (done) => {
      request(app)
        .put(impactUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          step: 'promiseStatements',
          field: 'promiseVerb',
          value: promiseStatementsValue,
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Change impact completed', (done) => {
      request(app)
        .put(impactUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          step: 'completed',
          field: 'completed',
          value: impactCompleted,
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get impact after update', (done) => {
      request(app)
        .get(impactUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.lifePurpose.city === lifePurposeValue);
          assert(body.payload.promiseStatements.promiseVerb === promiseStatementsValue);
          assert(body.payload.completed === impactCompleted);
          done();
        });
    });
  });
  describe('Align', () => {
    const alignUrl = '/api/align';
    const alignCompleted = true;
    const alignValue = ['string', 'string1'];

    it('Create align', (done) => {
      request(app)
        .post(alignUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send(align)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get Align', (done) => {
      request(app)
        .get(alignUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Change align trials', (done) => {
      request(app)
        .put(alignUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          field: 'trials',
          value: alignValue,
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Change align completed', (done) => {
      request(app)
        .put(alignUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          field: 'completed',
          value: alignCompleted,
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get impact after update', (done) => {
      request(app)
        .get(alignUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.completed === alignCompleted);
          assert(body.payload.trials.length === 2);
          assert(body.payload.trials[0] === alignValue[0]);
          assert(body.payload.trials[1] === alignValue[1]);
          done();
        });
    });
  });

  describe('Purpose', () => {
    const purposeScoreValue = 5;
    const purposeDNAValue = ['string', 'string']
    const purposeCompleted = true;
    const purposeUrl = '/api/purpose'

    it('Create purpose', (done) => {
      request(app)
        .post(purposeUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send(purpose)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get Purpose', (done) => {
      request(app)
        .get(purposeUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get purpose score', (done) => {
      request(app)
        .get(`${purposeUrl}/score`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.score.name === purpose.score.name)
          assert(body.payload.score.legacy === purpose.score.legacy)
          done();
        });
    });
    it('Get purpose dna', (done) => {
      request(app)
        .get(`${purposeUrl}/dna`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.DNA.impacts.length === purpose.DNA.impacts.length)
          assert(body.payload.DNA.impacts[3].verb === purpose.DNA.impacts[3].verb)
          assert(body.payload.DNA.impacts[3].rank === purpose.DNA.impacts[3].rank)
          assert(body.payload.DNA.impacts[3].identity === purpose.DNA.impacts[3].identity)
          done();
        });
    });
    it('Change purpose score', (done) => {
      request(app)
        .put(purposeUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          step: 'score',
          field: 'goals',
          value: purposeScoreValue
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Change purpose DNA', (done) => {
      request(app)
        .put(purposeUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          step: 'DNA',
          field: 'identities',
          value: purposeDNAValue,
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Change purpose completed', (done) => {
      request(app)
        .put(purposeUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          step: 'completed',
          field: 'completed',
          value: purposeCompleted,
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get purpose result', (done) => {
      request(app)
        .get(`${purposeUrl}/result`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.completed = true);
          done();
        });
    });
  });

  describe('Grow', () => {
    const growUrl = '/api/grow';
    const growCompleted = true;
    const growValue = grow.situations.comfort1;
    growValue[1].value = 3;

    it('Create grow', (done) => {
      request(app)
        .post(growUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send(grow)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get grow', (done) => {
      request(app)
        .get(growUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.completed === grow.completed);
          done();
        });
    });
    it('Change grow situation', (done) => {
      request(app)
        .put(growUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          field: 'comfort1',
          value: growValue,
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Change grow completed', (done) => {
      request(app)
        .put(growUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          field: 'completed',
          value: growCompleted,
        })
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          done();
        });
    });
    it('Get grow after update', (done) => {
      request(app)
        .get(growUrl)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.completed === growCompleted);
          assert(JSON.stringify(body.payload.situations.comfort1) === JSON.stringify(growValue));
          done();
        });
    });
    it('Get grow result', (done) => {
      request(app)
        .get(`${growUrl}/result`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          assert(!body.error);
          assert(body.payload.completed === true);
          assert(body.payload.situations.comfort.length === growResult.comfort.length);
          assert(JSON.stringify(body.payload.situations.comfort) === JSON.stringify(growResult.comfort));
          done();
        });
    });
  });
  describe('Profiles results', () => {
    let profiles = [];
    const errorProfiles = [];
    const errorSurvey = [];
    it('get Profiles', (done) => {
      request(app)
        .get('/api/superadmin/profile/all?limit=100')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then(({ body }) => {
          profiles = body.payload.items;
          profiles.forEach((profile) => {
            if (!profile.surveyProgress.hasOwnProperty('completed')) {
              errorSurvey.push(profile);
            }
            if (!profile.surveyProgress.score.hasOwnProperty('completed')) {
              errorSurvey.push(profile);
            }
            if (!profile.surveyProgress.impact.hasOwnProperty('completed')) {
              errorSurvey.push(profile);
            }
            if (!profile.surveyProgress.align.hasOwnProperty('completed')) {
              errorSurvey.push(profile);
            }
            if (!profile.surveyProgress.grow.hasOwnProperty('completed')) {
              errorSurvey.push(profile);
            }
          })
          assert(errorSurvey.length === 0);
          console.log(errorSurvey.map((profile) => ({ id: profile._id, user_type: profile.user_type })));
          done();
        });
    }, 10000);
    it('get Profile', async (done) => {
      for (const profile of profiles) {
        await request(app)
          .get(`/api/superadmin/profile/${profile._id}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200)
          .then(({ body }) => {
            if (body.payload.surveyProgress.completed !== profile.surveyProgress.completed) {
              console.log(body.payload.surveyProgress.completed);
              console.log(body.payload.surveyProgress);
              console.log(profile.surveyProgress);
              errorProfiles.push(profile);
            }
          });
      }
      assert(errorProfiles.length === 0);
      console.log(errorProfiles.map((profile) => ({ id: profile._id, user_type: profile.user_type })));
      done();
    }, 20000);
  });

});

