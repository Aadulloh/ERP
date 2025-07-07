import { useState } from "react";
import { Button, Input, Card, Typography, message } from "antd";
import { authService } from "@services";
import { useNavigate } from "react-router-dom";
import { setItem } from "@helpers";

const { Title } = Typography;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!role) {
      message.warning("Iltimos, rol tanlang!");
      return;
    }

    const payload = { email, password };
    try {
      const res = await authService.signIn(payload, role);
      if (res.status === 201) {
        setItem("access_token", res.data.access_token);
        setItem("role", role);
        navigate(`/${role}`);
      }
    } catch (error) {
      message.error("Login muvaffaqiyatsiz! Email yoki parol noto'g'ri.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card
        className="w-full max-w-sm p-5 shadow-lg rounded-xl"
        style={{ border: "none", background: "#ffffff" }}
      >
        <div className="text-center mb-5">
          <Title level={4} className="text-gray-800">
            Sign In
          </Title>
        </div>

        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Email"
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input.Password
            placeholder="Password"
            size="large"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Rolni tanlang</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="lid">Lid</option>
          </select>

          <Button
            type="primary"
            size="large"
            onClick={submit}
            block
            className="bg-gradient-to-r blue-600 rounded-md text-white"
            style={{ height: "40px", fontSize: "14px" }}
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
