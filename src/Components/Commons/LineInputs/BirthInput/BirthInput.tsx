import LineInput from "../LineInput";
import styled from "@emotion/styled";
import { ChangeEvent } from "react";

const Wrapper = styled.div`
  width: 100%;
  max-width: 576px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 1rem;
  margin-top: 2rem;

  input {
    font-size: 1rem;
    flex-grow: 1;
    font-weight: 400;
  }
  span {
    font-size: 1.563rem;
    font-weight: 400;
    gap: 0 5px;
  }
`;

interface BirthInputProps {
  register: any;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
  onChangeDay: (day: number) => void;
}
export default function BirthInput({
  register,
  onChangeYear,
  onChangeMonth,
  onChangeDay,
}: BirthInputProps) {
  const onChangeY = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 4) {
      document.getElementById("birthMonth")?.focus();
      e.target.value = value.substring(0, 4);
      return;
    }

    onChangeYear(Number(value));
  };

  const onChangeM = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      document.getElementById("birthDay")?.focus();
      e.target.value = e.target.value.substring(0, 2);
      return;
    }
    onChangeMonth(Number(e.target.value));
  };

  const onChangeD = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.substring(0, 2);
      return;
    }
    onChangeDay(Number(e.target.value));
  };

  return (
    <Wrapper>
      <LineInput
        register={register}
        registerOption={{ onChange: onChangeY }}
        type="number"
        name="birthYear"
        id="birthYear"
        placeholder="1995"
        style={{ textAlign: "center" }}
      />
      <span>년</span>

      <LineInput
        register={register}
        registerOption={{ onChange: onChangeM }}
        type="number"
        name="birthMonth"
        id="birthMonth"
        placeholder="06"
        style={{ textAlign: "center" }}
      />
      <span>월</span>

      <LineInput
        register={register}
        registerOption={{ onChange: onChangeD }}
        type="number"
        name="birthDay"
        id="birthDay"
        placeholder="06"
        style={{ textAlign: "center" }}
      />
      <span>일</span>
    </Wrapper>
  );
}
