import { useState, useEffect, cloneElement, useMemo } from "react";
export default ({ children, onSubmit }) => {
  const [testData, setTestData] = useState({});
  const change = (name, value) => {
    setTestData({ ...testData, [name]: value });
  };
  useEffect(() => {
    console.log(testData);
  }, [testData]);
  const target = useMemo(
    () =>
      children.map((item) => {
        const { name } = item.props;
        return cloneElement(item, {
          value: testData[name] || "",
          key: name,
          onChange: (e) => {
            change(name, e.target.value);
          },
        });
      }),
    [testData]
  );
  return (
    <>
      {target}
      <a
        onClick={() => {
          onSubmit(testData);
        }}
      >
        提交
      </a>
    </>
  );
};
