import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  BookOutlined,
  ForkOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { clearStorage } from "../../helpers";
const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [
  {
    key: "1",
    icon: React.createElement(UserOutlined),
    label: <Link to="/admin/group">Group</Link>,
  },
  {
    key: "2",
    icon: React.createElement(TeamOutlined),
    label: <Link to="/admin/student">Students</Link>,
  },
  {
    key: "3",
    icon: React.createElement(BookOutlined),
    label: <Link to="/admin/courses">Courses</Link>,
  },
  {
    key: "4",
    icon: React.createElement(ForkOutlined),
    label: <Link to="/admin/branches">Branch</Link>,
  },
  {
    key: "5",
    icon: React.createElement(UserOutlined),
    label: <Link to="/admin/teacher">Teacher</Link>,
  },
  {
    key: "6",
    icon: React.createElement(HomeOutlined),
    label: <Link to="/admin/room">Room</Link>,
  },
];

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    clearStorage();
  navigate("/");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h1 style={{ margin: "0 16px" }}>Admin Panel</h1>
          <Button
            type="primary"
            style={{ margin: "16px" }}
            onClick={() => logout()}
          >
            Log out
            <LogoutOutlined />
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 134px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
