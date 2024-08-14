import styled from "styled-components";

export const Button = (props) => {
  const ButtonComponent = styled.button`
    color: ${(props) => (props.color ? props.color : "black")};
    background: ${(props) => (props.bgColor ? props.bgColor : "none")};
    font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
    border-radius: ${(props) => (props.radius ? props.radius : "10px")};
    padding: ${(props) => (props.padding ? props.padding : "1rem")};
    width: ${(props) => (props.width ? props.width : "auto")};
    height: ${(props) => (props.height ? props.height : "auto")};
    border: none;
    cursor: pointer;
  `;

  return (
    <>
      <ButtonComponent {...props}>{props.children}</ButtonComponent>
    </>
  );
};
