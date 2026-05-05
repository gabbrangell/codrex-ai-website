import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/client-access", { replace: true });
  }, [navigate]);
  return null;
}
