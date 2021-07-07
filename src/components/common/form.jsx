import { useState, useEffect, cloneElement } from "react";
export default ({ children, onSubmit }) => {
  const [testData, setTestData] = useState({});
  const change = (name, value) => {
    setTestData((prev) => {
      prev[name] = value;
      return prev;
    });
  };
  useEffect(
    (testData) => {
      console.log(testData);
    },
    [testData]
  );
  children = children.map((item, index) => {
    const { name } = item.props;
    return cloneElement(item, {
      value: testData[name],
      key: name,
      onChange: (e) => {
        change(name, e.target.value);
      },
    });
  });
  return (
    <>
      {children}
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
