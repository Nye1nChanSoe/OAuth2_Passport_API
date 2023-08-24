export interface User {
    id: string,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
}

/**
 * {
 *  data: {
 *    data: {
 *      user: {},
 *      access_token: '',
 *    }
 *  }
 * }
 */
export interface AuthResponse {
  data: {
    data: {
      user: User;
      access_token: string;
    };
  }
}

export interface RegisterPayload {
  name: string | undefined,
  email: string | undefined,
  password?: string | undefined,
  password_confirmation?: string | undefined,
}