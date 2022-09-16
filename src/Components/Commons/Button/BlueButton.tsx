import styled from "@emotion/styled";
import { GrayD9, MainColor } from "../../../../styles/GlobalStyles";

interface BlueButtonStyleProps {
  isActive?: boolean;
}
export const Wrapper = styled.button`
  cursor: pointer;
  width: 100%;
  border-radius: 6.25rem;
  height: 3.125rem;
  background-color: ${(props: BlueButtonStyleProps) =>
    props.isActive ? MainColor : GrayD9};
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  border: none;

  @media (min-width: 576px) {
    width: calc(576px - (576px / 2));
  }
`;

interface LargeButtonProps {
  title: string;
  onClick: any;
  isActive?: boolean;
  style?: any;
}

export default function BlueButton({
  title,
  onClick,
  style,
  isActive,
}: LargeButtonProps) {
  console.log(onClick);

  const onClickButton = () => {
    console.log("onClickButton");
    // onClick();
  };
  return (
    <Wrapper
      isActive={isActive !== undefined ? isActive : true}
      type="button"
      onClick={onClickButton}
      style={{ ...style }}
      disabled={isActive !== undefined ? !isActive : true}
    >
      {title}
    </Wrapper>
  );
}
