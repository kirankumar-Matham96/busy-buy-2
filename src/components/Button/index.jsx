import styled from "styled-components";

/**
 * `Button` is a customizable button component using styled-components.
 *
 * This component allows for a highly customizable button through props. The styling is applied using styled-components, enabling dynamic styling based on the props passed to the `Button` component.
 *
 * Props that can be customized include:
 * - `color`: Sets the text color of the button.
 * - `bgColor`: Sets the background color of the button.
 * - `fontSize`: Sets the font size of the button text.
 * - `radius`: Sets the border-radius for rounded corners.
 * - `padding`: Sets the padding inside the button.
 * - `width`: Sets the width of the button.
 * - `height`: Sets the height of the button.
 *
 * The button will default to certain styles if the corresponding props are not provided:
 * - `color`: Defaults to "black".
 * - `bgColor`: Defaults to "none".
 * - `fontSize`: Defaults to "1rem".
 * - `radius`: Defaults to "10px".
 * - `padding`: Defaults to "1rem".
 * - `width`: Defaults to "auto".
 * - `height`: Defaults to "auto".
 *
 * The button has no border and uses a pointer cursor on hover.
 *
 * @param {Object} props - The properties used to customize the button.
 * @param {string} [props.color] - The text color of the button.
 * @param {string} [props.bgColor] - The background color of the button.
 * @param {string} [props.fontSize] - The font size of the button text.
 * @param {string} [props.radius] - The border-radius of the button.
 * @param {string} [props.padding] - The padding inside the button.
 * @param {string} [props.width] - The width of the button.
 * @param {string} [props.height] - The height of the button.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the button.
 *
 * @returns {JSX.Element} The rendered button component.
 */
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
