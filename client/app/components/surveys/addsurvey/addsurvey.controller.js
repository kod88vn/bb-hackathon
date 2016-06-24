class AddsurveyController {
  constructor() {
    this.name = 'addsurvey';

    this.candidates = [
      {name: 'Candidate A', id: '1234'},
      {name: 'Candidate B', id: '1235'},
      {name: 'Candidate C', id: '1236'}
    ];

    this.questions = [
      'Is [0] more xxx then [1]',
      'Is [0] more yyy then [1]',
      'Is [0] more zzz then [1]'
    ];
  }

  constructQuestion(question) {
    let canA = this._findCandidate(this.candidateA);
    let canB = this._findCandidate(this.candidateB);

    if (canA && canB) {
      return question.replace('[0]', canA.name).replace('[1]', canB.name);
    }
  }

  _findCandidate(id) {
    return this.candidates.find(candidate => candidate.id === id);
  }
}

export default AddsurveyController;
