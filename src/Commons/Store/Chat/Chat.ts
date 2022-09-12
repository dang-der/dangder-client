import { DayValue } from "react-modern-calendar-datepicker";
import { atom } from "recoil";

export interface PlaceMessageStateProps {
  lat: number;
  lng: number;
}

export const placeMessageState = atom<PlaceMessageStateProps>({
  key: "placeMessageState",
  default: { lat: 0, lng: 0 },
});

export interface PlanMessageStateProps {
  data: DayValue;
  time: string;
}
export const planMessageState = atom<PlanMessageStateProps>({
  key: "placeMessageState",
  default: { data: null, time: "" },
});
