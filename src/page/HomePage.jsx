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
      <Title level={1}>열심히 공부를 해봅시다!!!!</Title>
      <Button type="primary" size="large" style={{ margin: "10px" }}>
        <Link to="/words">words Test</Link>
      </Button>
    </div>
  );
};

export default HomePage;
