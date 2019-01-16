import mockjs from 'mockjs';

/**
 * 生成章节数据
 * @param parentId
 * @returns {any[]}
 */
function fakeChapterList() {
  return mockjs.mock({
    'list|50': [{ label: '@ctitle', 'parentId|1-2': 1, 'value|+1': 3 }],
  });
}

/**
 * 生成试题
 * @param count 试题数量
 */
function fakeQuestions() {
  return mockjs.mock({
    'list|100': [{
      id: '@integer(0,100)',
      description: '@ctitle(40)',
      'options': ['@ctitle(10)', '@ctitle(20)', '@ctitle(13)', '@ctitle(18)'],
      'answers': ['@pick(0,1,2,3)'],
      'chapterID|1-2': 1,
      'sectionID|+1': 3,
    }],
  });
}

function getFakeChapterList(req, res) {
  const params = req.query;
  const parentId = params.pid || 1;
  const result = fakeChapterList();
  return res.json(result.list.filter(x => x.parentId === parentId));
}

function getQuestions(req, res) {
  // const params = req.query;
  // const chapterID = params.chapterID || 1;
  // const sectionID = params.sectionID || 3;
  const questions = fakeQuestions();
  // const chapterQuestions = questions.list.filter(x => x.chapterID === chapterID);
  // const data = chapterQuestions.filter(x => x.sectionID === sectionID);
  return res.json(questions.list);
}

function getTestPaper(req, res) {
  const questions = fakeQuestions();
  const paper = {
    ...mockjs.mock({
      id: '@integer(1,100)',
    }),
    questionTotal: questions.list.length || 0,
  };
  return res.json({
    paper,
    questions: questions.list,
  });
}

function postTestResult(req, res) {
  const result = mockjs.mock({
    'result': {
      'paperId': '@integer(1,100)',
      'score': '@integer(1,100)',
      'wrongTotal': '@integer(0,80)',
      'time': '9:28',
      'isPass': '@pick(true,false)',
    },
  });
  return res.json(result);
}

export default {
  'GET /api/chapter': getFakeChapterList,
  'GET /api/questions': getQuestions,
  'GET /api/test/paper': getTestPaper,
  'POST /api/test/result': postTestResult,
};
