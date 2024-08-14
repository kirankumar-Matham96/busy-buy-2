import styled from "styled-components";

export const Button = (props) => {
  const ButtonComponent = styled.button`
    color: ${(props) => (props.color ? props.color : "black")};
    background-color: ${(props) => (props.bgColor ? props.bgColor : "green")};
    font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
    border-radius: 10px;
    padding: 1rem;
    border: none;
    cursor: pointer;
  `;

  return (
    <>
      <ButtonComponent {...props}>{props.children}</ButtonComponent>
    </>
  );
};
