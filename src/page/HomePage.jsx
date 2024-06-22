import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const HomePage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px 0",
        backgroundColor: "white",
      }}
    >
      <Title level={1}>너가 공부를 한다고???ㅋㅋㅋㅋ 풀어봐 그러면</Title>
      <Button type="primary" size="large" style={{ margin: "10px" }}>
        <Link to="/japan">Japan Test</Link>
      </Button>
      <Button type="primary" size="large" style={{ margin: "10px" }}>
        <Link to="/eng">Eng Test</Link>
      </Button>
    </div>
  );
};

export default HomePage;
