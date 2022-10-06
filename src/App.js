import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import "./App.css";
builder.init("c530ff1f2ed64c0aa8bd509c45469b6b");

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
