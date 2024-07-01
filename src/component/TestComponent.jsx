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

const { Title } = Typography;

const TestComponent = ({ data }) => {
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
    ${result}
    위에있는 2차원 배열에서 0번째는 단어이고 1번째는 뜻이야 맞았는지 틀렸는지 확인해줘
    맞았는지 틀렸는지를 true false로 1차원 배열로 보내줘
    예를 들어 [true, false, false, true] 이런식으로 보내줘 그리고 바로 내가 데이터를 사용할 수 있게 보내줘
    `;
    try {
      let chatResponse = await getChatGPTResponse(prompt);

      // Parse the response to remove the surrounding quotes and convert to an array
      const parsedResponse = JSON.parse(chatResponse.replace(/"/g, ""));

      // Set the results state with the parsed response
      setResults(parsedResponse);

      // Calculate and show the number of correct answers
      const correctAnswers = parsedResponse.filter((result) => result).length;
      message.info(`총 ${correctAnswers}개 맞았습니다.`);
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false regardless of success or failure
    }
  };
  if (!Array.isArray(data)) {
    return <Alert message="데이터가 없습니다." type="warning" />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={4} style={{ textAlign: "center", margin: "20px 0" }}>
        {testStarted
          ? "정답 확인 후 AI가 틀렸을 수도 있으니 답지를 확인해 주세요"
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
              disabled={loading} // Disable button while loading
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
