interface ColumnDef {
  prop: string;
  displayName: string;
  width?: number;
}

interface Todo {
  id: string;
  name: string;
  tag: string;
  priority: string;
  status: string;
  duedate: string;
}

interface TodoRequest {
  name: string;
  priority: string;
  status: string;
  tag: string;
  duedate: Date;
}

interface SignInRequest {
  userNameOrEmail: string;
  password: string;
}

interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

interface JwtAuthenticationResponse  {
  accessToken: string;
  tokenType: string;
}

interface UserDetailResponse {
  username: string;
}

export {
  Todo,
  ColumnDef,
  TodoRequest,
  SignInRequest,
  SignUpRequest,
  JwtAuthenticationResponse,
  UserDetailResponse
};
