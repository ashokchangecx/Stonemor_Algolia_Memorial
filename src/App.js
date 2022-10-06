import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import "./App.css";
builder.init("7a00fb9fbc3e46c0bb66716decd3f14f");

const App = () => {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [builderContentJson, setBuilderContentJson] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const content = await builder
        .get("page", { url: window.location.pathname })
        .promise();
      setBuilderContentJson(content);
      setNotFound(!content);
    };
    fetchContent();
  }, [window?.location?.pathname]);
  console.log("isPreviewingInBuilder : ", isPreviewingInBuilder);
  if (notFound && !isPreviewingInBuilder) {
    return <p>Content not found</p>;
  }
  return <BuilderComponent model="page" content={builderContentJson} />;
};

export default App;
