import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Alert, Row, Col, message } from "antd";

const { Title } = Typography;

const TestComponent = ({ data }) => {
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (Array.isArray(data)) {
      setAnswers(Array(data.length).fill(""));
    }
  }, [data]);

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const results = data.map((item, index) => item["뜻"] === answers[index]);
    setResults(results);
    const correctAnswers = results.filter((result) => result).length;
    if (correctAnswers < 10) {
      message.info(`총 ${correctAnswers}개 맞았습니다.`);
    } else {
      message.info(`총 ${correctAnswers}개 맞았습니다.`);
    }
  };

  if (!Array.isArray(data)) {
    return <Alert message="데이터가 없습니다." type="warning" />;
  }

  const half = Math.ceil(data.length / 2);
  const leftColumn = data.slice(0, half);
  const rightColumn = data.slice(half);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={4} style={{ textAlign: "center", margin: "20px 0" }}>
        풀어봐
      </Title>
      <Row gutter={[16, 16]}>
        <Col
          span={24}
          lg={{ span: 12, offset: 0 }}
          style={{ marginBottom: "20px" }}
        >
          {leftColumn.map((word, index) => (
            <div
              key={word.단어}
              style={{
                display: "flex",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}
            >
              <span style={{ marginRight: "10px" }}>{word.단어}</span>
              <Input
                value={answers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                style={{
                  width: "calc((100% / 2) - (((2 - 1) / 2) * 4rem))", // 동적 너비 설정
                  borderColor: results
                    ? results[index]
                      ? "green"
                      : "red"
                    : undefined,
                }}
              />
            </div>
          ))}
        </Col>
        <Col
          span={24}
          lg={{ span: 12, offset: 0 }}
          style={{ marginBottom: "20px" }}
        >
          {rightColumn.map((word, index) => (
            <div
              key={word.단어}
              style={{
                display: "flex",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}
            >
              <span style={{ marginRight: "10px" }}>{word.단어}</span>
              <Input
                value={answers[index + half]}
                onChange={(e) =>
                  handleInputChange(index + half, e.target.value)
                }
                style={{
                  width: "calc((100% / 2) - (((2 - 1) / 2) * 4rem))", // 동적 너비 설정
                  borderColor: results
                    ? results[index + half]
                      ? "green"
                      : "red"
                    : undefined,
                }}
              />
            </div>
          ))}
        </Col>
      </Row>
      <Button
        type="primary"
        onClick={checkAnswers}
        style={{ marginTop: "20px" }}
      >
        정답 확인
      </Button>
    </div>
  );
};

export default TestComponent;
