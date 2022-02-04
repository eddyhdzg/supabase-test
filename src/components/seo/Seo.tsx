import { Helmet } from "react-helmet";

interface ISeoProps {
  title: string;
  description: string;
}

export default function Seo({ title, description }: ISeoProps) {
  return (
    <Helmet
      title={`unapizca - ${title}`}
      meta={[
        {
          name: "description",
          content: description,
        },
      ]}
    />
  );
}
