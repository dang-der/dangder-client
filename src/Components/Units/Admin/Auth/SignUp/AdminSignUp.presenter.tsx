import "antd/dist/antd.css";
import { Form, Modal } from "antd";
import Link from "next/link";
import * as S from "./AdminSignUp.styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRecoilState } from "recoil";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateAdminUserArgs,
} from "../../../../../Commons/Types/Generated/types";
import { CREATE_ADMIN_USER } from "./AdminSignUp.quries";
import { useRouter } from "next/router";
import { snackBarState } from "../../../../../Commons/Store/Modal/SnackBarState";

const schema = yup.object({
  account: yup
    .string()
    .email("이메일 형식이 적합하지 않습니다.")
    .required("이메일을 입력해주세요."),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{3,10}$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함하여 10자리 이내로 입력해주세요."
    )
    .required("비밀번호를 입력해주세요."),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 한번 더 입력해주세요."),
});

interface ISignUpInputType {
  account: string;
  password: string;
  repassword: string;
}

export default function AdminSignUpUI() {
  const router = useRouter();
  const [, setSnackBar] = useRecoilState(snackBarState);

  const [createAdminUser] = useMutation<
    Pick<IMutation, "adminLogin">,
    IMutationCreateAdminUserArgs
  >(CREATE_ADMIN_USER);

  const { formState, register, handleSubmit } = useForm<ISignUpInputType>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickAdminSignUp = async (inputs: any) => {
    try {
      const result = await createAdminUser({
        variables: { ...inputs },
      });
      console.log(result);
      setSnackBar({
        visible: true,
        message: "회원가입이 완료되었습니다.",
      });
      router.push("/admin");
    } catch (e) {
      if (e instanceof Error) {
        Modal.error({ content: e.message });
      }
    }
  };

  return (
    <S.Wrapper>
      <S.LogoImage src="/logo.svg" />
      <S.FormTitle>Sign up</S.FormTitle>
      <S.FormWrapper>
        <Form onSubmitCapture={handleSubmit(onClickAdminSignUp)}>
          <Form.Item>
            <S.FormLabel>Email :</S.FormLabel>
            <S.FormInput
              type="text"
              placeholder="admin@gmail.com"
              {...register("account")}
            />
          </Form.Item>
          <S.ErrorInputMsg>{formState.errors.account?.message}</S.ErrorInputMsg>

          <Form.Item>
            <S.FormLabel>Password: </S.FormLabel>
            <S.FormInput
              type="password"
              placeholder="password"
              {...register("password")}
            />
          </Form.Item>
          <S.ErrorInputMsg>
            {formState.errors.password?.message}
          </S.ErrorInputMsg>

          <Form.Item>
            <S.FormLabel>Confirm Password :</S.FormLabel>
            <S.FormInput
              type="password"
              placeholder="confirm password"
              {...register("repassword")}
            />
          </Form.Item>
          <S.ErrorInputMsg>
            {formState.errors.repassword?.message}
          </S.ErrorInputMsg>

          <S.ButtonWrapper>
            <S.SignupButton htmlType="submit">회원가입</S.SignupButton>
          </S.ButtonWrapper>
        </Form>

        <S.LoginFooter>
          <S.FooterSpan>이미 관리자 계정이 있으신가요?</S.FooterSpan>
          <Link href="/admin">
            <a>
              <S.MovetoJoinSpan>로그인</S.MovetoJoinSpan>
            </a>
          </Link>
        </S.LoginFooter>
      </S.FormWrapper>
    </S.Wrapper>
  );
}
