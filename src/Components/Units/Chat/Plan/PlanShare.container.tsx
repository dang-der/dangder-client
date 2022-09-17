import * as S from "./PlanShare.styles";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  Calendar,
  DayValue,
} from "@amir04lm26/react-modern-calendar-date-picker";
import { TimePicker } from "antd";
import moment, { Moment } from "moment";
import "moment/locale/ko";
import LargeButton from "../../../Commons/Button/LargeButton";
import { useState } from "react";

const today = {
  year: moment().year(),
  month: moment().month() + 1,
  day: moment().date(),
};

interface PlanShareContainerProps {
  handleEmitSend: (payload: { type: string; data: any }) => void;
  toggleModal: () => void;
}

export default function PlanShareContainer({
  handleEmitSend,
  toggleModal,
}: PlanShareContainerProps) {
  const [selectedDay, setSelectedDay] = useState<DayValue>(today);
  const [selectedTime, setSelectedTime] = useState<string>(
    moment().format("hh:mm a")
  );

  const onChangeTime = (time: Moment | null, timeString: string) => {
    setSelectedTime(timeString);
  };

  const onClickPlanShare = () => {
    const dateTime =
      selectedDay?.year +
      String(selectedDay?.month).padStart(2, "0") +
      String(selectedDay?.day).padStart(2, "0") +
      " " +
      moment(selectedTime, "hh:mm a").format("hh:mm a");

    handleEmitSend({
      type: "plan",
      data: {
        meetAt: moment(dateTime, "YYYYMMDD hh:mm a").format("YYYYMMDD hh:mm a"),
      },
    });
    toggleModal();
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
              format={"hh:mm a"}
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
