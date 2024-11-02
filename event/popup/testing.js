const MBTITest = () => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [scores, setScores] = React.useState({
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    });
    const [showResult, setShowResult] = React.useState(false);
  
    const questions = [
      {
        text: "在社交場合中，你通常是：",
        answers: [
          { text: "主動與他人交談", type: "E" },
          { text: "等待他人來找你聊天", type: "I" }
        ]
      },
      {
        text: "你比較喜歡：",
        answers: [
          { text: "關注現實和具體的細節", type: "S" },
          { text: "思考抽象的可能性和理論", type: "N" }
        ]
      },
      {
        text: "做決定時，你通常：",
        answers: [
          { text: "依據邏輯和事實分析", type: "T" },
          { text: "考慮他人感受和價值觀", type: "F" }
        ]
      },
      {
        text: "你的生活方式傾向：",
        answers: [
          { text: "計劃和安排明確", type: "J" },
          { text: "靈活隨性，順其自然", type: "P" }
        ]
      },
      {
        text: "你更喜歡：",
        answers: [
          { text: "與多人一起工作", type: "E" },
          { text: "獨自專注完成工作", type: "I" }
        ]
      }
    ];
  
    const handleAnswer = (type) => {
      setScores(prev => ({
        ...prev,
        [type]: prev[type] + 1
      }));
  
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        localStorage.setItem('mbtiResult', calculateType( false ));
        setShowResult(true);
      }
    };
  
    const calculateType = ( loadFrom ) => {
      if( loadFrom ){
        return localStorage.getItem( 'mbtiResult' );
      }
      return [
        scores.E > scores.I ? 'E' : 'I',
        scores.S > scores.N ? 'S' : 'N',
        scores.T > scores.F ? 'T' : 'F',
        scores.J > scores.P ? 'J' : 'P'
      ].join('');
    };
  
    const getTypeDescription = (type) => {
      const descriptions = {
        'ISTJ': '盡責的檢查者 - 安靜、務實、注重細節和責任感',
        'ISFJ': '守護者 - 安靜、友善、負責任和謹慎',
        'INFJ': '智者 - 有洞察力、有同理心、理想主義者',
        'INTJ': '建築師 - 獨立、創新、策略思考者',
        'ISTP': '鑑定者 - 靈活、冷靜、分析型的問題解決者',
        'ISFP': '藝術家 - 靈活、友善、敏感和善良',
        'INFP': '治癒者 - 理想主義者、忠於價值觀',
        'INTP': '思想家 - 創新、獨特、重邏輯的思考者',
        'ESTP': '企業家 - 靈活、精力充沛的問題解決者',
        'ESFP': '表演者 - 外向、友善和自發性強',
        'ENFP': '冒險家 - 熱情、創意和社交能力強',
        'ENTP': '辯論家 - 聰明、好奇心強、思維敏捷',
        'ESTJ': '總監 - 高效、有組織、注重實效',
        'ESFJ': '執行者 - 友善、合作、重視和諧',
        'ENFJ': '教導者 - 富同情心、善解人意的領導者',
        'ENTJ': '指揮官 - 大膽、有想像力的領導者'
      };
      return descriptions[type] || '未知類型';
    };
  
    const progress = ((currentQuestion + 1) / questions.length) * 100;
  
    if (showResult) {
      const type = calculateType( true );
      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title text-center mb-4">
                    您的 MBTI 類型是：{type}
                  </h1>
                  <p className="lead mb-4">
                    {getTypeDescription(type)}
                  </p>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => {
                      localStorage.setItem('mbtiResult', '');
                      setCurrentQuestion(0);
                      setScores({E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0});
                      setShowResult(false);
                    }}
                  >
                    重新測試
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if( localStorage.getItem('mbtiResult') ){
        setShowResult( true )
    }
  
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">
                  MBTI 人格測試
                </h1>
                
                <div className="progress mb-4" style={{height: "10px"}}>
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{width: `${progress}%`}}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
  
                <h5 className="mb-4">
                  {questions[currentQuestion].text}
                </h5>
                
                <div className="d-grid gap-3">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <button
                      key={index}
                      className="btn btn-outline-primary text-start"
                      onClick={() => handleAnswer(answer.type)}
                    >
                      {answer.text}
                    </button>
                  ))}
                </div>
  
                <div className="mt-4 text-center text-muted">
                  問題 {currentQuestion + 1} / {questions.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };