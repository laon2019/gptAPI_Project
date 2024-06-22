import React, { useEffect, useState } from "react";
import { Layout, Typography, Button, Spin } from "antd";
import TestComponent from "../component/TestComponent";
import { getChatGPTResponse } from "../api/gpt";

const { Title } = Typography;
const { Content } = Layout;

const JapanPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    const prompt = `
      일본어 단어 시험을 볼 수 있도록 일본어와 뜻을 다양하고 랜덤하게 보내줘.
      일본어 단어가 매번 안곂치도록 다양한 카테고리로 보내줘
      일본어 난이도는 중급에서 상급으로 보내줘 어려운거 보내줘
      JSON 형식으로 key에는 일본어, value에는 뜻을 넣어서
      [{"단어": "こんにちは", "뜻": "안녕하세요"}...] 형식으로 20개를 보내줘.
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Content
      style={{ padding: "0 50px", marginTop: 64, backgroundColor: "white" }}
    >
      <div className="site-layout-content">
        <Title level={2} style={{ textAlign: "center", margin: "20px 0" }}>
          일본어 단어 시험
        </Title>
        <Button type="primary" onClick={handleClick}>
          일본어 단어 가져오기
        </Button>
        {loading ? (
          <Spin size="large" style={{ marginLeft: "10px" }} />
        ) : (
          data && <TestComponent data={data} />
        )}
      </div>
    </Content>
  );
};

export default JapanPage;
