import { useRouter } from "next/router";
import { useEffect } from "react";

const test = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    console.log(code);
  });

  return <h1>test</h1>;
};

export default test;
