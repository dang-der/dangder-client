import LineInput from "../LineInput";
import styled from "@emotion/styled";
import { ChangeEvent, useEffect } from "react";
import moment from "moment";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 1rem;

  input {
    font-size: 1rem;
    flex-grow: 1;
    font-weight: 400;
  }
  span {
    font-size: 1.563rem;
    color: #5f5f5f;
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
  useEffect(() => {
    const inputs = [document.getElementById("birthYear"),];
  }, []);


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
        style={{ textAlign: "center", width: "4.5rem" }}
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
