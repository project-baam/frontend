export type SignUpStackParamList = {
  LoginPage: undefined;
  KakaoLoginPage: undefined;
  KakaoLoginRedirect: {
    token: string;
  };
  SelectSchool: undefined;
  SchoolInfoForm: {
    schoolInfo: {
      id: number | null;
      name: string | null;
      roadNameAddress: string | null;
    };
  };
};
