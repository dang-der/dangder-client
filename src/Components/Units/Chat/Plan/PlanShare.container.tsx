import * as S from "./PlanShare.styles";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  Calendar,
  DayValue,
} from "@amir04lm26/react-modern-calendar-date-picker";
import { TimePicker } from "antd";
import moment, { Moment } from "moment";
import LargeButton from "../../../Commons/Button/LargeButton";
import { useState } from "react";
import { useRouter } from "next/router";

const today = {
  year: moment().year(),
  month: moment().month() + 1,
  day: moment().date(),
};

export default function PlanShareContainer() {
  const router = useRouter();

  const [selectedDay, setSelectedDay] = useState<DayValue>(today);
  const [selectedTime, setSelectedTime] = useState<Moment | null>(null);

  const onChangeTime = (time: Moment | null, timeString: string) => {
    setSelectedTime(time);
  };

  const onClickPlanShare = () => {
    router.back();
  };

  return (
    <S.Wrapper>
      <div style={{ flex: "1 1 0" }}>
        <S.ContentsWrapper>
          <S.SubTitleWrapper>날짜를 선택해주세요.</S.SubTitleWrapper>
          <S.CalendarWrapper>
            <Calendar
              value={selectedDay}
              onChange={setSelectedDay}
              shouldHighlightWeekends
              colorPrimary="#F04D23"
            />
          </S.CalendarWrapper>
        </S.ContentsWrapper>

        <S.ContentsWrapper>
          <S.SubTitleWrapper>시간을 선택해주세요.</S.SubTitleWrapper>

          <S.TimePickerWrapper>
            <TimePicker
              use12Hours
              defaultValue={moment()}
              onChange={onChangeTime}
              format={"h:mm a"}
              bordered={false}
            />
          </S.TimePickerWrapper>
        </S.ContentsWrapper>
      </div>
      <S.ButtonWrapper>
        <LargeButton title="약속 설정하기" onClick={onClickPlanShare} />
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
