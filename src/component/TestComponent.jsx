import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Typography,
  Alert,
  Row,
  Col,
  message,
  Space,
  Spin,
} from "antd";
import { getChatGPTResponse } from "../api/gpt";
import { useSpeechSynthesis } from "react-speech-kit";

const { Title } = Typography;

const TestComponent = ({ data, voice }) => {
  const { speak } = useSpeechSynthesis();
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    if (Array.isArray(data)) {
      setAnswers(data.map((word) => [word.단어, ""]));
    }
  }, [data]);

  const handleInputChange = (index, value) => {
    if (answers[index]) {
      const newAnswers = [...answers];
      newAnswers[index][1] = value;
      setAnswers(newAnswers);
    }
  };

  const checkAnswers = async () => {
    setLoading(true);
    const result = JSON.stringify(answers).replace(/"/g, "");
    const prompt = `
    주어진 2차원 배열은 [단어, 뜻] 형식으로 구성되어 있습니다. 
      예를 들어 [["apple", "사과"], ["banana", "바나나"]] 입니다.
      0번째 요소는 단어, 1번째 요소는 사용자가 입력한 뜻입니다.
      아래 배열을 확인하고, 단어와 뜻이 일치하는지 확인해 주세요:
      ${result}
      결과를 true와 false로만 구성된 1차원 배열로 반환해 주세요. 
      예를 들어 [true, false, true]처럼 반환해 주세요. 
      true는 사용자가 입력한 뜻이 정답임을, false는 오답임을 의미합니다.
      사용자가 입력하지 않은 빈 칸은 무조건 false로 처리해 주세요.
    `;
    try {
      let chatResponse = await getChatGPTResponse(prompt);

      const parsedResponse = JSON.parse(chatResponse.replace(/"/g, ""));

      setResults(parsedResponse);

      const correctAnswers = parsedResponse.filter((result) => result).length;
      message.info(`총 ${correctAnswers}개 맞았습니다.`);
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!Array.isArray(data)) {
    return <Alert message="데이터가 없습니다." type="warning" />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={4} style={{ textAlign: "center", margin: "20px 0" }}>
        {testStarted
          ? "아직은 AI가 정확하지 않습니다. 정답 확인 후 답지를 확인해 주세요"
          : "단어와 뜻을 확인하세요"}
      </Title>
      {!testStarted ? (
        <>
          <Row gutter={[16, 16]} justify="center">
            <Col>
              {data.map((word) => (
                <div
                  key={word.단어}
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    justifyContent: "center",
                  }}
                >
                  <Space size="large">
                    <Button onClick={() => speak({ text: word.단어, voice })}>
                      <i className="ri-volume-up-fill"></i>
                    </Button>
                    <span>{word.단어}</span>
                    <span>{word.뜻}</span>
                  </Space>
                </div>
              ))}
            </Col>
          </Row>
          <Button
            type="primary"
            onClick={() => setTestStarted(true)}
            style={{ marginTop: "20px" }}
          >
            시험 보기
          </Button>
        </>
      ) : (
        <>
          <Row gutter={[16, 16]} justify="center">
            <Col>
              {data.map((word, index) => (
                <div
                  key={word.단어}
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    justifyContent: "center",
                  }}
                >
                  <Space size="large">
                    <span>{word.단어}</span>
                    <Input
                      value={answers[index]?.[1] || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      style={{
                        width: "200px",
                        borderColor: results
                          ? results[index]
                            ? "green"
                            : "red"
                          : undefined,
                      }}
                    />
                  </Space>
                </div>
              ))}
            </Col>
          </Row>
          <div style={{ textAlign: "center" }}>
            {loading && <Spin size="large" style={{ margin: "10px" }} />}
            <Button
              type="primary"
              onClick={checkAnswers}
              style={{ marginTop: "20px" }}
              disabled={loading}
            >
              정답 확인
            </Button>
            <Button
              onClick={() => setShowOriginal((pre) => !pre)}
              style={{ marginTop: "20px", marginLeft: "10px" }}
            >
              답지 확인
            </Button>
          </div>
          {showOriginal && (
            <div style={{ marginTop: "20px" }}>
              <Row gutter={[16, 16]} justify="center">
                <Col>
                  {data.map((word) => (
                    <div
                      key={word.단어}
                      style={{
                        display: "flex",
                        marginBottom: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <Space size="large">
                        <span>{word.단어}</span>
                        <span>{word.뜻}</span>
                      </Space>
                    </div>
                  ))}
                </Col>
              </Row>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestComponent;
