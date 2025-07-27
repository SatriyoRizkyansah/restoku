// import { ERole, UserPayload } from 'src/api/generated'
// import { jwt_parse } from 'src/utils/util-general';
import { jwt_parse } from "@/utils/util-general";
import { signal } from "@preact/signals-react";
import Cookies from "js-cookie";

export type AuthSignalType = {
  token?: string;
  data?: AuthResponseType;
};

export type AuthResponseType = {
  username?: string;
  nama?: string;
  // role?: string;
  // id_tipe_user?: string;
  // id_prodi?: string;
  // nama_prodi?: string;
};

function auth_signal_initial_value(): AuthSignalType {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    token,
    data: jwt_parse(token),
  };
}

export const auth_signal = signal<AuthSignalType>(auth_signal_initial_value());

// untuk cek role
// export const they_are = (roles: string) => roles.includes(auth_signal.value.data?.role || "");
