import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  GroupOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider, Header, Content } = Layout;

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} theme="dark">
          <Menu
            mode="inline"
            defaultSelectedKeys={["groups"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={({ key }) => {
              navigate(key);
            }}
          >
            <Menu.Item key="groups" icon={<GroupOutlined />}>
              Groups
            </Menu.Item>
            <Menu.Item key="courses" icon={<UserOutlined />}>
              Courses
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Header
            style={{
              background: "#fff",
              padding: "0 24px",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Admin Panel
          </Header>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;
