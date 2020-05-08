var LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

var languageTranslator = new LanguageTranslatorV3({
  authenticator: new IamAuthenticator({ apikey: '1sMM7BlsxJWg97Kul_dqfrCBaers94VMDqT6iOLmkl93' }),
  url: 'https://api.eu-de.language-translator.watson.cloud.ibm.com/instances/6a308450-9ad5-4156-ab9f-997b5bd64895',
  version: '2018-05-01',
});

languageTranslator.translate(
  {
    text: 'A sentence must have a verb',
    source: 'en',
    target: 'es'
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error: ', err);
  });