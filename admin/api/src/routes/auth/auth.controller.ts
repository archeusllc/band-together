import { authService } from './auth.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: {
    adminUserId: string;
    email: string;
    displayName?: string;
  };
}

export class AuthError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authController = {
  async login(body: LoginRequest): Promise<LoginResponse> {
    const { email, password } = body;

    if (!email || !password) {
      throw new AuthError(422, 'Email and password are required');
    }

    const admin = await authService.findByEmail(email);

    if (!admin) {
      throw new AuthError(401, 'Invalid email or password');
    }

    if (!admin.isActive) {
      throw new AuthError(401, 'Account is disabled');
    }

    const passwordValid = await authService.verifyPassword(
      password,
      admin.passwordHash
    );

    if (!passwordValid) {
      throw new AuthError(401, 'Invalid email or password');
    }

    // Return admin info and token (token generation happens in routes)
    return {
      token: '', // Will be set by route handler
      admin: {
        adminUserId: admin.adminUserId,
        email: admin.email,
        displayName: admin.displayName || undefined,
      },
    };
  },

  async getMe(adminUserId: string) {
    const admin = await authService.getById(adminUserId);

    if (!admin) {
      throw new AuthError(404, 'Admin user not found');
    }

    return admin;
  },
};
