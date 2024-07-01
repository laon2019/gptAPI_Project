import React, { useEffect, useState } from "react";
import { Layout, Typography, Button, Spin, Select } from "antd";
import TestComponent from "../component/TestComponent";
import { getChatGPTResponse } from "../api/gpt";

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const WordsPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [language, setLanguage] = useState("영어");

  const handleClick = async () => {
    setLoading(true);
    const prompt = `
      ${language} 단어 시험을 볼 수 있도록 ${language}와 뜻을 다양하고 랜덤하게 보내
      ${language} 단어가 매번 안곂치도록 다양한 카테고리로 보내
      ${language} 난이도는 중급에서 상급으로 보내줘 어려운거 보내
      JSON 형식으로 key에는 ${language}, value에는 뜻을 넣어서
      [{"단어": "hello", "뜻": "안녕하세요"}...] 형식으로 10개를 보내 그외에는 다른거 아무것도 붙히지마
      다시한번 말하지만 {"단어": "해당언어단어", "뜻": "해당언어뜻"}... } 이런식으로 보내
      뜻은 무조건 한국어로 보내
    `;

    try {
      let chatResponse = await getChatGPTResponse(prompt);

      // Check if chatResponse is a string and parse it
      if (typeof chatResponse === "string") {
        chatResponse = JSON.parse(chatResponse);
      }

      // Validate that chatResponse is an array
      if (
        Array.isArray(chatResponse) &&
        chatResponse.every((item) => item.단어 && item.뜻)
      ) {
        setData(chatResponse);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
      setData([]); // Set data to an empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Content
      style={{ padding: "0 50px", marginTop: 64, backgroundColor: "white" }}
    >
      <div className="site-layout-content">
        <Title level={2} style={{ textAlign: "center", margin: "20px 0" }}>
          단어 시험
        </Title>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <Select
            defaultValue={language}
            style={{ width: 200 }}
            onChange={handleLanguageChange}
          >
            <Option value="영어">영어</Option>
            <Option value="스페인어">스페인어</Option>
            <Option value="일본어">일본어</Option>
            <Option value="프랑스어">프랑스어</Option>
            <Option value="베트남어">베트남어</Option>
          </Select>
          <Button type="primary" onClick={handleClick} style={{ marginLeft: "10px" }}>
            단어 가져오기
          </Button>
        </div>
        {loading ? (
          <Spin size="large" style={{ marginLeft: "10px" }} />
        ) : (
          data && <TestComponent data={data} />
        )}
      </div>
    </Content>
  );
};

export default WordsPage;
