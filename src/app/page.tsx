import { RootLayout } from "@/components/RootLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export const Home: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/notes")
  }, [navigate])

  return <RootLayout>{children}</RootLayout>;
};
